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

const express = require('express')
const app = express()
const session = require('express-session')
const request = require('request-promise')
const https = require('https')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const config = require('../config.json')

/* turn off eslint warnings about console.log */
/* eslint no-console: 0 */

/* Obtain Adobe IO key & secret */
const adobeApiKey = process.env.PS_ADOBE_API_KEY
const adobeApiSecret = process.env.PS_ADOBE_API_SECRET

/* Sample file location in Creative Cloud storage */
const sampleFileLocation = config.sampleFile

/* Declare host name and port */
const hostname = 'localhost'
const port = 8000

/* Declare service endpoints */
const adobeImsEndpoint = config.services.adobeImsEndpoint
const imsRedirectUri = config.services.adobeImsRedirectUri
const psdService = config.services.psdService

/* Check job status every x milliseconds for up to y times */
const statusRetryMillis = 100
const statusRetries = 20

/* Middlewares */
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.use(session({
  /* Change this to your own secret value */
  secret: 'this-is-secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 6000000
  }
}))

/* Routes */
app.get('/', function (req, res) {
  res.render('index')
})

app.get('/login', function (req, res) {
  /* This will prompt user with the Adobe auth screen */
  res.redirect(`${adobeImsEndpoint}/ims/authorize?client_id=${adobeApiKey}&scope=openid,creative_sdk&response_type=code&redirect_uri=${imsRedirectUri}`)
})

app.get('/callback', function (req, res) {
  /* Retrieve authorization code from request */
  let code = req.query.code

  /* Set options with required paramters */
  let requestOptions = {
    uri: `${adobeImsEndpoint}/ims/token?grant_type=authorization_code&client_id=${adobeApiKey}&client_secret=${adobeApiSecret}&code=${code}`,
    method: 'POST',
    json: true
  }

  /* Send a POST request using the request library */
  request(requestOptions)
    .then(function (response) {
      /* Store the token in req.session.token */
      req.session.token = response.access_token
      res.render('index', { 'response': 'User logged in!' })
    })
    .catch(function () {
      res.render('index', { 'response': 'Log in failed!' })
    })
})

app.get('/profile', function (req, res) {
  if (req.session.token) {
    /* Grab the token stored in req.session
    and set options with required parameters */
    let requestOptions = {
      uri: `${adobeImsEndpoint}/ims/userinfo?client_id=${adobeApiKey}`,
      headers: {
        Authorization: `Bearer ${req.session.token}`
      },
      json: true
    }

    /* Send a GET request using the request library */
    request(requestOptions)
      .then(function (response) {
        /* Send the received response back to the client side */
        res.render('index', { 'response': JSON.stringify(response) })
      })
      .catch(function (error) {
        return console.log(error)
      })
  } else {
    res.render('index', { 'response': 'You need to log in first' })
  }
})

app.get('/manifest', function (req, res) {
  if (req.session.token) {
    /* 
      With the token stored in req.session
      set options for documentManifest request
    */
    let requestOptions = {
      method: 'post',
      uri: `${psdService}/documentManifest`,
      headers: {
        Authorization: `Bearer ${req.session.token}`,
        'x-api-key': adobeApiKey
      },
      body: {
        inputs: [
          {
            href: sampleFileLocation,
            storage: 'adobe'
          }
        ]
      },
      json: true
    }

    console.log('1. Request document manifest')
    /* Send a POST request using the request library */
    request(requestOptions)
      .then(function (response) {
        console.log('2. Response received for document manifest')
        /* Check that response is properly formatted */
        if (validJobResponse(response)) {
          console.log('3. Job response is valid')
          /* Check status of job via timeout */
          setTimeout(
            function () { checkStatus(req, res, response) },
            statusRetryMillis)
        } else {
          console.log('Failed - job response is not valid')
          return res.render('index', { 'response': JSON.stringify(response) })
        }
      })
      .catch(function (error) {
        console.log('Failed - error making request')
        console.log(error.message)
        if (error.statusCode === 400) {
          return res.render('index', { 'response': error.message })
        }
        return res.render('index', { 'response': 'See console for error message' })
      })
  } else {
    res.render('index', { 'response': 'You need to log in first' })
  }
})

function validJobResponse(response) {
  return !!(response._links && response._links.self && response._links.self.href)
}

function checkStatus(req, res, response) {
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

  if (validJobResponse(response)) {
    console.log('    Check job status')
    let requestOptions = {
      uri: response._links.self.href,
      headers: {
        Authorization: `Bearer ${req.session.token}`,
        'x-api-key': adobeApiKey
      },
      json: true
    }
    /* Send a GET request for the status */
    request(requestOptions)
      .then(function (response) {
        let status = []
        for (let output in response.outputs) {
          status.push(response.outputs[output].status)
        }
        console.log(`      ${status.join(', ')}`)
        if (isJobRunning(response.outputs)) {
          /* Check status of job via timeout */
          setTimeout(
            function () { checkStatus(req, res, response) },
            statusRetryMillis)
          return
        }
        console.log('4. Document manifest received')
        /* Send the received response back to the client side */
        res.render('index', { 'response': JSON.stringify(response) })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

/* Set up a HTTS server with the signed certification */
https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
}, app).listen(port, hostname, (err) => {
  if (err) {
    console.log(`Error: ${err}`)
  }
  console.log(`listening on port ${port}!`)
})
