/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const AWS = require('aws-sdk')
const config = require('./config.json')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const request = require('request-promise')
const util = require("util")

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

/* Given the settings in the config file, create a JWT */
async function generateJWT () {
  var keyFileName = config.identity.private_key_file
  const readFile = util.promisify(fs.readFile)
  const data = await readFile(keyFileName)
  let privateKey = data.toString()
  let claims = {}
  claims[config.identity.claim] = true
  return jwt.sign(claims, privateKey, {
    algorithm: 'RS256',
    issuer: config.identity.issuer,
    subject: config.identity.subject,
    audience: config.identity.audience,
    expiresIn: 60 * 60 * 24 // 24 hours in seconds
  })
}

/* Use the JWT to reguest a service access token from Adobe IMS */
async function requestServiceToken (jwt) {
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
  return request(options)
}

/* Use the AWS SDK to generate a presigned GET url for our sample file in S3 */
async function obtainS3PresignedGetUrl (bucket, prefix) {
  const options = {
    Bucket: bucket,
    Key: prefix
  }
  return S3.getSignedUrl('getObject', options)
}

/*
  Call the Photoshop API to retrieve the manifest for the sample file
  The Photoshop API service will read the file from S3
*/
async function getDocumentManifest (token, presignedGetUrl) {
  const body = {
    inputs: [
      {
        href: presignedGetUrl,
        storage: 'external'
      }
    ]
  }

  return callPsdService(token, documentManifestUrl, body)
}

/* Use the AWS SDK to generate a presigned PUT url for our rendition */
async function obtainS3PresignedPutUrl (bucket, prefix) {
  const options = {
    Bucket: bucket,
    Key: prefix
  }
  return S3.getSignedUrl('putObject', options)
}

/*
  Call the Photoshop API to generate one rendition of the sample file
  The Photoshop API service will read the file from S3, and,
  write the rendition back to S3
*/
function getDocumentRendition(token, presignedGetUrl, presignedPutUrl, rendition_type, rendition_width) {
  const body = {
    inputs: [
      {
        href: presignedGetUrl,
        storage: 'external'
      }
    ],
    outputs: [
      {
        href: presignedPutUrl,
        storage: 'external',
        type: rendition_type,
        width: parseInt(rendition_width, 10)
      }
    ]
  }
  return callPsdService(token, renditionCreateUrl, body)
}

/*
  Call the Photoshop API to add a layer to the sample file, and,
  write the new file back to S3
*/
async function addLayerToDocument(token, presignedGetUrl, addLayerPutUrl, layers) {
  /* Add an adjustment layer as first element in layers */
  let modifiedLayers = layers.slice()
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
        href: presignedGetUrl,
        storage: 'external'
      }
    ],
    options: {
      layers: modifiedLayers
    },
    outputs: [
      {
        href: addLayerPutUrl,
        storage: 'external',
        type: 'vnd.adobe.photoshop'
      }
    ]
  }
  return callPsdService(token, documentOperationsUrl, body)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/* Helper function to call the psdService */
async function callPsdService (token, commandUri, body) {
  /* Inside this function we post a request, then poll for a response
     The success return for the callback is inside the checkStatus function
  */

  /* Check for a valid response body from POST */
  function validJobResponse (response) {
    return !!(response._links && response._links.self && response._links.self.href)
  }

  /* Log status for all requested outputs */
  function logOutputStatus(outputs) {
    let statuses = []
    for (let output in outputs) {
      statuses.push(outputs[output].status)
    }
    console.log(` status: ${statuses.join(', ')}`)
  }

  /* Check if all output entries are reporting status as done */
  function allOutputsDone(outputs) {
    /* If any output shows status of not done, then job is still running */
    for (let output in outputs) {
      if (outputs[output].status !== 'succeeded' &&
        outputs[output].status !== 'failed') {
        return false
      }
    }
    return true
  }

  /* Function to check for result - called from async.retry below */
  function checkJobStatus(statusUri) {
    /* Prepare the options for the HTTPS request call to get the status of our job */
    let options = {
      uri: statusUri,
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": config.identity.client_id
      },
      json: true
    }
    /* Send a GET request for the status */
    return request(options)
  }

  /* Prepare the options for the HTTPS POST call to the Photoshop API */
  let options = {
    method: 'post',
    uri: commandUri,
    headers: {
      Authorization: `Bearer ${token}`,
      'x-api-key': config.identity.client_id
    },
    body,
    json: true
  }

  /* Send POST request to the Photoshop API */
  writeStatus(`Call ${commandUri} API`)
  const result = await request(options)
  if (!validJobResponse(result)) {
    throw new (`Bad job response: ${result}`)
  }

  const statusUri = result._links.self.href
  let retries = statusRetries;
  let done = false;
  let showJobId = true;
  while (retries-- > 0 && !done) {
    await sleep(statusRetryMillis);
    try {
      const status = await checkJobStatus(statusUri);
      if (showJobId) {
        console.log(`jobId: ${status.jobId}`);
        showJobId = false;
      }
      logOutputStatus(status.outputs);
      done = allOutputsDone(status.outputs);
      if (done) {
        return status;
      }
    }
    catch (err) {
      if (err.statusCode && (err.statusCode >= 502 && err.statusCode <= 504)) {
        console.log(`gateway error ${err.statusCode}; will retry`)
        continue
      }
      else {
        console.log(`error while retrieving status ${err.message}`)
        throw err
      }
    }
  }
  return Promise.reject(new Error('exceeded number of retries'))
}

function removeSignature(presignedUrl) {
  return presignedUrl.split('?')[0]
}

/* Main logic is here, using async waterfall */
async function main () {
  writeStatus('1. START')
  writeStatus('2. Generate JWT')
  const jwt = await generateJWT()

  writeStatus('3. Request service token')
  const serviceTokenResponse = await requestServiceToken(jwt)
  const token = JSON.parse(serviceTokenResponse).access_token

  const bucket = config.sample_file.s3_bucket
  writeStatus(`4. Obtain S3 presigned GET url for sample file: ${bucket}/${config.sample_file.s3_prefix}`)
  const presignedGetUrl = await obtainS3PresignedGetUrl(bucket, config.sample_file.s3_prefix)

  writeStatus(`5. Get documentManifest with url ${removeSignature(presignedGetUrl)}`)
  const manifestResult = await getDocumentManifest(token, presignedGetUrl)
  const layers = manifestResult.outputs[0].layers;
  writeStatus(`  layers ${layers}`)

  writeStatus(`6. Obtain S3 presigned PUT url for rendition: ${bucket}/${config.sample_file.s3_rendition_prefix}`)
  const presignedPutUrl = await obtainS3PresignedPutUrl(config.sample_file.s3_prefix, config.sample_file.s3_rendition_prefix)

  writeStatus(
    `7. Create rendition with url ${
      presignedGetUrl.split("?")[0]
    } and write to ${presignedPutUrl.split("?")[0]}`
  );
  const renditionResult = await getDocumentRendition(token, presignedGetUrl, presignedPutUrl,
    config.sample_file.rendition_type, config.sample_file.rendition_width)
  writeStatus(`  rendition: ${renditionResult.outputs[0]._links.renditions[0].href.split("?")[0]}`)

  writeStatus(`8. Obtain S3 presigned PUT url for add layer: ${bucket}/${config.sample_file.s3_add_layer_prefix}`)
  const presignedPutUrlForAddLayer = await obtainS3PresignedPutUrl(
    config.sample_file.s3_prefix,
    config.sample_file.s3_add_layer_prefix
  )

  writeStatus(
    `9. Add layer to document at url ${
      presignedGetUrl.split("?")[0]
    } and write to ${presignedPutUrlForAddLayer.split("?")[0]}`
  )
  const addLayerResult = await addLayerToDocument( token, presignedGetUrl, presignedPutUrlForAddLayer, layers)
  writeStatus(
    `  addLayerResult: ${
      addLayerResult.outputs[0]._links.renditions[0].href.split("?")[0]
    }`
  )
  writeStatus('10. DONE SUCCESS')
}

main().catch(e => {
  console.log(e)
  writeStatus('DONE ERROR')
  process.exit(5)
})


function writeStatus (message) {
  console.log(message)
  console.log('********')
}
