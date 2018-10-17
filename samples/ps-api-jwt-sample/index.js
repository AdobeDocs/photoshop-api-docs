/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const async = require('async')
const AWS = require('aws-sdk')
const config = require('./config.json')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const request = require('request-promise')

/* turn off eslint warnings about console.log */
/* eslint no-console: 0 */

/* Declare service endpoints */
const adobeImsEndpoint = config.services.adobeIms
const documentManifestUrl = `${config.services.psdService}/documentManifest`
const renditionCreateUrl = `${config.services.psdService}/renditionCreate`
const documentOperationsUrl = `${config.services.psdService}/documentOperations`

/* Initialize S3 object -- we must use signatureVersion: 'v4' for presigned PUT urls */
const S3 = new AWS.S3({ apiVersion: '2006-03-01', signatureVersion: 'v4' })

/* Check job status every x milliseconds for up to y times */
const statusRetryMillis = 200
const statusRetries = 20

writeStatus('1. STARTING')

/* Given the settings in the config file, create a JWT */
function generateJWT (cb) {
  writeStatus('2. Generate JWT')
  var keyFileName = config.identity.private_key_file
  fs.readFile(keyFileName, function (err, data) {
    if (err) {
      return cb(null, 'Unable to read private key file')
    }
    let privateKey = data.toString()
    let claims = {}
    claims[config.identity.claim] = true
    return cb(null, jwt.sign(claims, privateKey, {
      algorithm: 'RS256',
      issuer: config.identity.issuer,
      subject: config.identity.subject,
      audience: config.identity.audience,
      expiresIn: 60 * 60 * 24 // 24 hours in seconds
    }))
  })
}

/* Use the JWT to reguest a service access token from Adobe IMS */
function requestServiceToken (jwt, cb) {
  writeStatus('3. Request service token')
  const options = {
    method: 'POST',
    url: `${adobeImsEndpoint}/ims/exchange/jwt/`,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data'
    },
    formData: {
      client_id: config.identity.client_id,
      client_secret: config.identity.client_secret,
      jwt_token: jwt
    }
  }
  request(options)
    .then(body => cb(null, {
      access_token: JSON.parse(body).access_token
    }))
    .catch(err =>
      cb(err))
}

/* Use the AWS SDK to generate a presigned GET url for our sample file in S3 */
function obtainS3PresignedGetUrl (params, cb) {
  writeStatus(`4. Obtain S3 presigned GET url for sample file: ${config.sample_file.s3_bucket}/${config.sample_file.s3_prefix}`)
  const options = {
    Bucket: config.sample_file.s3_bucket,
    Key: config.sample_file.s3_prefix
  }
  /* Ensure the object exists and is accessible
    as S3.getSignedUrl fails quietly */
  S3.headObject(options, (err) => {
    if (err) {
      return cb(new Error(`unable to access S3 object: ${err}`))
    }
    params.presignedGetUrl = S3.getSignedUrl('getObject', options)
    return cb(null, params)
  })
}

/*
  Call the Photoshop API to retrieve the manifest for the sample file
  The Photoshop API service will read the file from S3
*/
function getDocumentManifest (params, cb) {
  /* display S3 url without query params */
  writeStatus(`5. Get documentManifest with url ${params.presignedGetUrl.split('?')[0]}`)
  const body = {
    inputs: [
      {
        href: params.presignedGetUrl,
        storage: 'external'
      }
    ]
  }

  callPsdService(params, documentManifestUrl, body, (err, result) => {
    if (err) {
      return cb(err)
    }
    /* Capture the response 'layers' for the later operation of adding a layer */
    params.layers = result.response.outputs[0].layers
    return cb(null, params)
  })
}

/* Use the AWS SDK to generate a presigned PUT url for our rendition */
function obtainS3PresignedPutUrl (params, cb) {
  writeStatus(`6. Obtain S3 presigned PUT url for rendition: ${config.sample_file.s3_bucket}/${config.sample_file.s3_rendition_prefix}`)
  const options = {
    Bucket: config.sample_file.s3_bucket,
    Key: config.sample_file.s3_rendition_prefix
  }
  S3.getSignedUrl('putObject', options, (err, url) => {
    if (err) {
      return cb(err)
    }
    params.presignedPutUrl = url
    return cb(null, params)
  })
}

/*
  Call the Photoshop API to generate one rendition of the sample file
  The Photoshop API service will read the file from S3, and,
  write the rendition back to S3
*/
function getDocumentRendition (params, cb) {
  writeStatus(`7. Create rendition with url ${params.presignedGetUrl} and write to ${params.presignedPutUrl}`)
  const body = {
    inputs: [
      {
        href: params.presignedGetUrl,
        storage: 'external'
      }
    ],
    outputs: [
      {
        href: params.presignedPutUrl,
        storage: 'external',
        type: config.sample_file.rendition_type,
        width: parseInt(config.sample_file.rendition_width, 10)
      }
    ]
  }
  callPsdService(params, renditionCreateUrl, body, cb)
}

/* Use the AWS SDK to generate a presigned PUT url for saving file with added layer */
function obtainS3PresignedPutUrlForAddLayer (params, cb) {
  writeStatus(`8. Obtain S3 presigned PUT url for add layer: ${config.sample_file.s3_bucket}/${config.sample_file.s3_add_layer_prefix}`)
  const options = {
    Bucket: config.sample_file.s3_bucket,
    Key: config.sample_file.s3_add_layer_prefix
  }
  S3.getSignedUrl('putObject', options, (err, url) => {
    if (err) {
      return cb(err)
    }
    params.addLayerPutUrl = url
    return cb(null, params)
  })
}

/*
  Call the Photoshop API to add a layer to the sample file, and,
  write the new file back to S3
*/
function addLayerToDocument (params, cb) {
  writeStatus(`9. Add layer to document at url ${params.presignedGetUrl} and write to ${params.addLayerPutUrl}`)
  /* Add an adjustment layer as first element in layers */
  let modifiedLayers = params.layers.slice()
  modifiedLayers.unshift(
    {
      operations: {
        add: true
      },
      attributes: {
        brightnessContrast: {
          brightness: 25,
          contrast: -40
        }
      },
      name: 'NewBrightnessContrast',
      type: 'adjustmentLayer'
    }
  )
  const body = {
    inputs: [
      {
        href: params.presignedGetUrl,
        storage: 'external'
      }
    ],
    options: {
      layers: modifiedLayers
    },
    outputs: [
      {
        href: params.addLayerPutUrl,
        storage: 'external',
        type: 'vnd.adobe.photoshop'
      }
    ]
  }
  callPsdService(params, documentOperationsUrl, body, cb)
}

/* Helper function to call the psdService */
function callPsdService (params, commandUri, body, cb) {
  /* Inside this function we post a request, then poll for a response
     The success return for the callback is inside the checkStatus function
  */

  /* Check for a valid response body from POST */
  function validJobResponse (response) {
    return !!(response._links && response._links.self && response._links.self.href)
  }

  /* Function to check for result - called from async.retry below */
  function checkStatus (href, cb) {
    function isJobRunning (outputs) {
      /* If any output shows status of not done, then job is still running */
      for (let output in outputs) {
        if (outputs[output].status !== 'succeeded' &&
          outputs[output].status.status !== 'failed') {
          return true
        }
      }
      return false
    }

    let params = this

    /* Prepare the options for the HTTPS request call to get the status of our job */
    let options = {
      uri: href,
      headers: {
        Authorization: `Bearer ${params.access_token}`,
        'x-api-key': config.identity.client_id
      },
      json: true
    }
    /* Send a GET request for the status */
    request(options)
      .then(function (response) {
        /* Because we are only requesting one output, we only check the status
           of the first output. In general, there could be multiple status values.
        */
        if (isJobRunning(response.outputs)) {
          let status = []
          for (let output in response.outputs) {
            status.push(response.outputs[output].status)
          }
          console.log(status.join(', '))
          return cb(new Error('still-running'))
        }
        /* This is the success return */
        writeStatus(`result: ${JSON.stringify(response)}`)
        params.response = response
        return cb(null, params)
      })
      .catch(error =>
        cb(error)
      )
  }

  /* Prepare the options for the HTTPS POST call to the Photoshop API */
  let options = {
    method: 'post',
    uri: commandUri,
    headers: {
      Authorization: `Bearer ${params.access_token}`,
      'x-api-key': config.identity.client_id
    },
    body,
    json: true
  }

  /* Send POST request to the Photoshop API */
  writeStatus(`Call ${commandUri} API`)
  request(options)
    .then(function (response) {
      /* If the job was accepted, we need to 'poll' for the response */
      if (validJobResponse(response)) {
        async.retry({ times: statusRetries,
          interval: statusRetryMillis,
          errorFilter: (err) =>
            err.message === 'still-running' // retry if still running
        },
        checkStatus.bind(params, response._links.self.href), (err, result) => {
          cb(err, result)
        })
      } else {
        /* Error condition */
        return cb(JSON.stringify(response))
      }
    })
    .catch(function (error) {
      /* Special case for asset not found */
      if (error.statusCode === 400) {
        return cb(error.message)
      }
      return cb(error)
    })
}

/* Main logic is here, using async waterfall */
async.waterfall([
  generateJWT,
  requestServiceToken,
  obtainS3PresignedGetUrl,
  getDocumentManifest,
  obtainS3PresignedPutUrl,
  getDocumentRendition,
  obtainS3PresignedPutUrlForAddLayer,
  addLayerToDocument
],
(err) => {
  if (err) {
    // truncate error message, e.g., could be html response
    console.log(`error: ${err.toString().substr(0, 200)}`)
    return writeStatus('10. DONE FAILURE')
  }
  writeStatus('10. DONE SUCCESS')
}
)

function writeStatus (message) {
  console.log(message)
  console.log('********')
}
