/*
Copyright 2018-2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const auth = require('@adobe/jwt-auth')
const AWS = require('aws-sdk')
const config = require('./config.json')
const fs = require('fs')
const request = require('request-promise')
const util = require("util")

/* turn off eslint warnings about console.log */
/* eslint no-console: 0 */

/* Declare service endpoints */
const documentManifestUrl = `${config.services.psdService}/documentManifest`
const renditionCreateUrl = `${config.services.psdService}/renditionCreate`
const documentOperationsUrl = `${config.services.psdService}/documentOperations`

/* Initialize S3 object -- we must use signatureVersion: 'v4' for presigned PUT urls */
const S3 = new AWS.S3({ apiVersion: '2006-03-01', signatureVersion: 'v4' })

/* Check job status every x milliseconds for up to y times */
const statusRetryMillis = 200
const statusRetries = 20

/* Given the settings in the config file, create a config for @adobe/jwt-auth */
async function buildJWTConfig () {
  var keyFileName = config.identity.private_key_file
  const readFile = util.promisify(fs.readFile)
  const data = await readFile(keyFileName)
  let privateKey = data.toString()

  // get last element of claim to use as metaScope
  const claim = config.identity.claim
  const metaScope = claim.substr(claim.lastIndexOf('/')+ 1)

  return {
    clientId: config.identity.client_id,
    clientSecret: config.identity.client_secret,
    technicalAccountId: config.identity.subject,
    orgId: config.identity.issuer,
    metaScopes: [
      metaScope
    ],
    privateKey
  }
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
async function addLayerToDocument(token, presignedGetUrl, addLayerPutUrl) {
  /* Add an adjustment layer as first element in layers */
  const layerToAdd = {
    add: {
      insertTop: true
    },
    adjustments: {
      brightnessContrast: {
        brightness: 25,
        contrast: -40
      }
    },
    name: 'NewBrightnessContrast',
    type: 'adjustmentLayer'
  }

  const body = {
    inputs: [
      {
        href: presignedGetUrl,
        storage: "external"
      }
    ],
    options: {
      layers: [layerToAdd]
    },
    outputs: [
      {
        href: addLayerPutUrl,
        storage: "external",
        type: "vnd.adobe.photoshop"
      }
    ]
  };
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
  writeStatus('2. Build config for JWT')
  const jwt_config = await buildJWTConfig()

  writeStatus('3. Request service token')
  const authInfo = await auth(jwt_config)
  const token = authInfo.access_token

  const bucket = config.sample_file.s3_bucket
  writeStatus(`4. Obtain S3 presigned GET url for sample file: ${bucket}/${config.sample_file.s3_prefix}`)
  const presignedGetUrl = await obtainS3PresignedGetUrl(bucket, config.sample_file.s3_prefix)

  writeStatus(`5. Get documentManifest with url ${removeSignature(presignedGetUrl)}`)
  const manifestResult = await getDocumentManifest(token, presignedGetUrl)
  const layers = manifestResult.outputs[0].layers;
  writeStatus(`  layers ${JSON.stringify(layers)}`)

  writeStatus(`6. Obtain S3 presigned PUT url for rendition: ${bucket}/${config.sample_file.s3_rendition_prefix}`)
  const presignedPutUrl = await obtainS3PresignedPutUrl(bucket, config.sample_file.s3_rendition_prefix)

  writeStatus( `7. Create rendition with url ${ removeSignature(presignedGetUrl) } and write to ${removeSignature(presignedPutUrl)}`)
  const renditionResult = await getDocumentRendition(token, presignedGetUrl, presignedPutUrl,
    config.sample_file.rendition_type, config.sample_file.rendition_width)
  writeStatus(`  rendition: ${renditionResult.outputs[0]._links.renditions[0].href}`)

  writeStatus(`8. Obtain S3 presigned PUT url for add layer: ${bucket}/${config.sample_file.s3_add_layer_prefix}`)
  const presignedPutUrlForAddLayer = await obtainS3PresignedPutUrl(bucket, config.sample_file.s3_add_layer_prefix)

  writeStatus(
    `9. Add layer to document at url ${
    removeSignature(presignedGetUrl)
    } and write to ${removeSignature(presignedPutUrlForAddLayer)}`
  )
  const addLayerResult = await addLayerToDocument(token, presignedGetUrl, presignedPutUrlForAddLayer)
  writeStatus(
    `  addLayerResult: ${
      addLayerResult.outputs[0]._links.renditions[0].href
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
