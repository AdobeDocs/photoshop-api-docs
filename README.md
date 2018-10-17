

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Welcome to Photoshop API's!](#welcome-to-photoshop-apis)
- [Setup](#setup)
  - [Authentication](#authentication)
    - [Individual users](#individual-users)
    - [Service-to-service clients](#service-to-service-clients)
      - [Assets stored on Adobe's Creative Cloud](#assets-stored-on-adobes-creative-cloud)
      - [Assets stored externally to Adobe](#assets-stored-externally-to-adobe)
  - [API Keys](#api-keys)
  - [Retries](#retries)
  - [Rate Limiting](#rate-limiting)
- [General Workflow](#general-workflow)
  - [Fonts](#fonts)
  - [Tracking document changes](#tracking-document-changes)
- [Supported Features](#supported-features)
  - [Layer level edits](#layer-level-edits)
  - [Document level edits](#document-level-edits)
  - [Rendering](#rendering)
- [How to use the API's](#how-to-use-the-apis)
  - [/documentManifest (Retrieving a PSD manifest)](#documentmanifest-retrieving-a-psd-manifest)
    - [Example 1: Initiate a job to retrieve a PSD's JSON manifest](#example-1-initiate-a-job-to-retrieve-a-psds-json-manifest)
    - [Example 2: Poll for status and results](#example-2-poll-for-status-and-results)
    - [Example 3: The returned manifest](#example-3-the-returned-manifest)
  - [/documentOperations (Making PSD edits and renders)](#documentoperations-making-psd-edits-and-renders)
    - [The operations object](#the-operations-object)
    - [Example 1: Making a simple edit (to a text layer)](#example-1-making-a-simple-edit-to-a-text-layer)
    - [Example 2: Poll for status and results](#example-2-poll-for-status-and-results-1)
    - [Example 3: Adding a new adjustment layer](#example-3-adding-a-new-adjustment-layer)
    - [Example 4: Editing the image in a pixel layer](#example-4-editing-the-image-in-a-pixel-layer)
    - [Example 5: Creating new Renditions](#example-5-creating-new-renditions)
  - [/renditionCreate (Generating New Renditions)](#renditioncreate-generating-new-renditions)
      - [Example 1: A single file input](#example-1-a-single-file-input)
    - [Example 2: Poll for status and results](#example-2-poll-for-status-and-results-2)
    - [Example 3: A folder input (multiple files)](#example-3-a-folder-input-multiple-files)
- [Sample Apps](#sample-apps)
- [Release Notes](#release-notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Welcome to Photoshop API's!

The Adobe Photoshop API's will allow you to make both layer and document level edits to Photoshop PSD files.  This page is meant to help you onboard with the service and get you started with some basic usage examples.

# Setup

## Authentication

You must pass in an OAuth 2.0 access token with every request. The Photoshop API's does not provide any API methods for authentication or authorization. Access tokens are granted by Adobe's IMS service. The Photo API needs an access token in the scope="system,openid,AdobeID,creative_sdk" and hence it is required that you pass in this parameter to the IMS Login Authorization API.

The access token must never be transmitted as a URI parameter. Doing so would expose it to being captured in-the-clear by intermediaries such as proxy server logs. The API does not allow you to send an access token anywhere except the Authorization header field.

There are two scenarios that require different authentication methods:

### Individual users

Individual users will create their OAuth access token using Adobe IMS endpoints. You will be emailed your Client ID and Client Secret required for the IMS endpoint after you've been accepted to the PreRelease program.  Once you've received your email...
- Do a quick test:
	- Browse to [https://ps-prerelease-us-east-1.cloud.adobe.io/](https://ps-prerelease-us-east-1.cloud.adobe.io/)
	- Add your Client ID and Client Secret sent in email
	- Enter your Adobe credentials when prompted
	- Use the access token to try the example calls further down this README

Additional instructions regarding the Adobe IMS endpoints can be found at [Generating Access Tokens](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md#generatingaccesstokens)
Additional instructions can be found at [Setting up OAuth authentication](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md)
Complete examples for OAuth endpoints can be found at [OAuth endpoint examples](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md#completeexamplesforoauthendpoints)


### Service-to-service clients

For service-to-service clients you'll need to set up an Adobe I/O Console Integration and create a JSON Web Token (JWT) to retrieve your access token for Photoshop API's. It is assumed your organization already has an Adobe IMS Org ID and you have added the required users to it.


#### Assets stored on Adobe's Creative Cloud

The Adobe Photoshop API's currently have a limitation that Service clients must store their assets externally to Adobe's Creative Cloud...

#### Assets stored externally to Adobe
This applies to assets stored outside of Adobe's Creative Cloud and accessed via preSigned URL's

- Browse to https://console.adobe.io/integrations
- Select New Integration
- Select `Access an API`
- Select `Photoshop`
- Select `Service Account integration`
- Select `Create new integration`

To retrieve your access token see additional instructions at [Setting up JWT Authentication](https://www.adobe.io/authentication/auth-methods.html#!adobeio/adobeio-documentation/master/auth/JWTAuthenticationQuickStart.md)

## API Keys

Also known as the `client_id`. You must additionally pass in your Adobe API key in the `x-api-key` header field. You’ll automatically get a developer API key when you create your Adobe I/O Console Integration.  After you've created your integration you can find your API key in the `Overview` tab of your Integration

## Retries

- You should only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server.
- You should implement an exponential back-off retry strategy with 3 retry attempts.
- You should not retry requests for any other response code.

## Rate Limiting

We have not put a throttle limit on requests to the API at this time.


# General Workflow

The typical workflow involves retrieving a PSD document manifest file via `/documentManifest` (a JSON representation of the documents layer tree), followed by one or more calls to `/documentOperations` to optionally edit the PSD and/or create new image renditions. Both endpoints are asynchronous so the response will contain the `/status` endpoint to poll for job status and results

## Fonts

Font support is a work in progress. The API's all use the postscript name.

// this endpoint will change to a public page
[Currently Supported Fonts](SupportedFonts.md)

## Tracking document changes

If you are making multiple edits to a PSD during the course of a user session it is your decision on how you want to track and store changes from one version of a PSD to another. Some clients will choose to refresh the document's JSON manifest by calling `/documentManifest` again after each call to `/documentOperations`. Other clients may choose to cache the changes locally and then make one final call to `/documentOperations` with the original PSD and the accumulated changes requested by the user.

# Supported Features

This is a list of currently supported features

## Layer level edits

- General layer edits
  - edit the layer name
  - toggle the layer locked state
  - toggle layer visibility
  - Move or resize the layer via it's bounds
- Adjustment layers
  - Add or edit an adjustment layer. The following types of adjustment layers are currently supported:
  - Brightness and Contrast
  - Exposure
  - Hue and Saturation
  - Color Balance
- Image/Pixel layers
  - Add a new pixel layer
  - Swap the image in an existing pixel layer
- Shape layers
  - Resize a shape layer via it's bounds
- Text layers
  - Edit the text
  - Change the font (see this list for the currently supported fonts)
  - Edit the font size
  - Edit the text decoration (bold, italic, etc)
  - Edit the text orientation (horizontal/vertical)
  - Edit the paragraph alignment (centered, justified, etc)
  - Edit the font weight


## Document level edits

- Crop a PSD
- Resize a PSD

## Rendering

- Create a new PSD document
- Create a PEG or PNG rendition of various sizes

# How to use the API's

Several [sample PSD files](sample_files) are included in this repository if you'd like to experiment with these example calls on your own.

## /documentManifest (Retrieving a PSD manifest)

### Example 1: Initiate a job to retrieve a PSD's JSON manifest

The `/documentManifest` api can take one or more input PSD's to generate JSON manifest files from. The JSON manifest is the tree representation of all of the layer objects contained in the PSD document. Using [Example.psd](sample_files/Example.psd), with the use case of a document stored in Adobe's Creative Cloud, a typical curl call might look like this:

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentManifest \
  -H 'Authorization: Bearer eyJ4NXUiOiJjZXJ0X2ZpbGUuY2VyIiwiYWxnIjoiUlMyNTYifQ.eyJpZCI6Ijx5b3VyX2lkPiIsImNsaWVudF9pZCI6Ijx5b3VyX2NsaWVudF9pZD4iLCJ1c2VyX2lkIjoiPHVzZXJJRD5AQWRvYmVJRCIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJhcyI6Zm9vIiwiZmciOiJTV0tYS1hDRVg3Nzc3Nzc3TlhLTk9TSUFJWT09PT09PSIsInNpZCI6ImZvbyIsIm1vaSI6IjEwNTkwMmFlIiwiYyI6Im8xV2Y0UURoZDFBdG1jb3FwdGpqOVE9PSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiPHNjb3BlPiIsImNyZWF0ZWRfYXQiOiIxNTM0ODcyMzU3OTcxIn0=.amuZs0vsE6-scPjPJLEoYVPHJnY6tunspkRyfxC-1BzMAPqH9dnK64J7Ja6owLmB89tm_BTWMgj3iLZerystQBOmm7TTJER7qLzyzk2O1p0l9enulGzeOHqb995rRBkXUCduamWnfCRkFQBYDG7E1riWhzgzbQ0C_Hz8_XdAjNIGuhA9hEZXcqtBG3CTQHNWpdViKfIuSznBujBCSmok4sBPCT-WYlTjsTUyBVvv1kl1oOlKpKBZxUkYaCr6BB_BuoSJUBpePRdQPtTLsG26In5OYX4CO3ZHnBcO3u9csaiPbVTtImSsLOV7_aHDEHUKrSF9vfZU9vOb9ijZe1NqHw' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs": [
    {
      "href":"files/Example.psd",
      "storage":"adobe"
    }
  ]
}'
```

This initiates an asynchronous job and returns a request body containing the href to poll for job status and the JSON manifest.
```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/pie/psdService/status/63c6e812-6cb8-43de-8a60-3681a9ec6feb"
        }
    }
}
```

### Example 2: Poll for status and results

Using the job id returned from the previous call you can poll on the returned `/status` href to get the job status and, upon success, the JSON Manifest

```shell
curl -X GET \
  https://image.adobe.io/pie/psdService/status/63c6e812-6cb8-43de-8a60-3681a9ec6feb \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>'
```

### Example 3: The returned manifest

Once your job completes (and does not report any errors) the status response will contain your document's JSON manifest along with other metadata about the input document. The JSON Manifest is further described in the [api docs](https://git.corp.adobe.com/pages/dice/pie-in-the-sky/#api-Documents-document_manifest_status)

```json
{
  "jobId":"63c6e812-6cb8-43de-8a60-3681a9ec6feb",
  "outputs":[
    {
      "input":"files/Example.psd",
      "status":"succeeded",
      "created":"2018-08-24T23:07:36.8Z",
      "modified":"2018-08-24T23:07:37.688Z",
      "layers":[
        {
          "attributes":{
            "bounds":{
              "height":64,
              "left":12,
              "top":1,
              "width":39
            }
          },
          "id":549,
          "index":8,
          "locked":false,
          "name":"CompanyLogo",
          "type":"smartObject",
          "visible":true
        },
        {
          "attributes":{
            "bounds":{
              "height":153,
              "left":31,
              "top":334,
              "width":197
            }
          },
          "children":[
            {
              "attributes":{
                "bounds":{
                  "height":136,
                  "left":29,
                  "top":326,
                  "width":252
                },
                "paragraphStyle":{   
                  "alignment":"left"
                },
                "textStyle":{
                  "fontAvailable":true,
                  "fontName":"AdobeClean-Bold",
                  "fontSize":36,
                  "orientation":"horizontal",
                  "text":"Reset your customers’ expectations."
                }
              },
              "id":412,
              "index":6,
              "locked":false,
              "name":"Reset your customers’ expectations.",
              "type":"textLayer",
              "visible":true
            },
            {
              "attributes":{
                "bounds":{
                  "height":67,
                  "left":30,
                  "top":452,
                  "width":230
                },
                "paragraphStyle":{
                  "alignment":"left"
                },
                "textStyle":{
                  "fontAvailable":true,
                  "fontName":"AdobeClean-Regular",
                  "fontSize":15,
                  "orientation":"horizontal",
                  "text":"Get our retail experience article and infographic."
                }
              },
              "id":676,
              "index":5,
              "locked":false,
              "name":"Get our retail experience article and infographic.",
              "type":"textLayer",
              "visible":true
            }
          ],
          "id":453,
          "index":7,
          "locked":false,
          "name":"Headline",
          "type":"layerSection",
          "visible":true
        },
        {
          "attributes":{
            "bounds":{
              "height":34,
              "left":31,
              "top":508,
              "width":99
            }
          },
          "id":762,
          "index":3,
          "locked":false,
          "name":"CallToAction",
          "type":"smartObject",
          "visible":true
        },
        {
          "attributes":{
            "bounds":{
              "height":405,
              "left":0,
              "top":237,
              "width":300
            }
          },
          "id":751,
          "index":2,
          "locked":false,
          "name":"BackgroundGradient",
          "type":"layer",
          "visible":true
        },
        {
          "attributes":{
            "bounds":{
              "height":515,
              "left":-385,
              "top":-21,
              "width":929
            }
          },
          "id":750,
          "index":1,
          "locked":false,
          "name":"HeroImage",
          "type":"smartObject",
          "visible":true
        },
        {
          "attributes":{
            "bounds":{
              "height":600,
              "left":0,
              "top":0,
              "width":300
            }
          },
          "id":557,
          "index":0,
          "locked":false,
          "name":"Background",
          "type":"layer",
          "visible":true
        }
      ],
      "document":{
        "height":600,
        "name":"Example.psd",
        "width":300
      }
    }
  ],
  "_links":{
    "self":{
      "href":"https://image.adobe.io/pie/psdService/status/8ec6e4f5-b580-41ac-b693-a72f150fec59"
    }
  }
}
```

## /documentOperations (Making PSD edits and renders)

Once you have your PSD file's JSON manifest you can use it to make layer and/or document level edits to your PSD and then generate new renditions with the changes. Depending on the type of changes desired you will pass in either all or a subset of the JSON manifest to `/documentOperations` as represented in the request body's `options.layers` argument.

The layer id is used by the service to identify the correct layer to edit in your PSD. All operations except for adding a new layer require the layer ID to be present in the layer object. You can choose to pass `options.layers` as a flat array of only the layer objects to be edited or the entire JSON manifest tree.

### The operations object

The `operations` object is how you communicate that you'd like action taken on that particular layer object. All other layers passed into the API will be ignored.

### Example 1: Making a simple edit (to a text layer)

In this example we will be editing a single text layer from Example.psd. We are only including a single layer object in the `options.layers` array. We will be editing layer id 412 from the `/documentManfest` examples above and making the following requests:

- NEW KEYWORD TO INDICATE AN EDIT: The `operations.edit` key is included in layer id 412
- CHANGE LAYER POSITION: The layer's top and left will be set to 0,0
- CHANGE FONT SIZE: The font size will be reduced from 36 to 24 pixels
- CHANGE TEXT CONTENT: The text string will be changed to "Inspire your customers’ creativity."
- CHANGE LAYER NAME: The layer name will be changed to "Inspire your customers’ creativity."
- LOCK THE LAYER: The layer will be locked
- GENERATE RENDITION: We are requesting one new fullsize jpeg rendition

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H 'Authorization: Bearer eyJ4NXUiOiJjZXJ0X2ZpbGUuY2VyIiwiYWxnIjoiUlMyNTYifQ.eyJpZCI6Ijx5b3VyX2lkPiIsImNsaWVudF9pZCI6Ijx5b3VyX2NsaWVudF9pZD4iLCJ1c2VyX2lkIjoiPHVzZXJJRD5AQWRvYmVJRCIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJhcyI6Zm9vIiwiZmciOiJTV0tYS1hDRVg3Nzc3Nzc3TlhLTk9TSUFJWT09PT09PSIsInNpZCI6ImZvbyIsIm1vaSI6IjEwNTkwMmFlIiwiYyI6Im8xV2Y0UURoZDFBdG1jb3FwdGpqOVE9PSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiPHNjb3BlPiIsImNyZWF0ZWRfYXQiOiIxNTM0ODcyMzU3OTcxIn0=.amuZs0vsE6-scPjPJLEoYVPHJnY6tunspkRyfxC-1BzMAPqH9dnK64J7Ja6owLmB89tm_BTWMgj3iLZerystQBOmm7TTJER7qLzyzk2O1p0l9enulGzeOHqb995rRBkXUCduamWnfCRkFQBYDG7E1riWhzgzbQ0C_Hz8_XdAjNIGuhA9hEZXcqtBG3CTQHNWpdViKfIuSznBujBCSmok4sBPCT-WYlTjsTUyBVvv1kl1oOlKpKBZxUkYaCr6BB_BuoSJUBpePRdQPtTLsG26In5OYX4CO3ZHnBcO3u9csaiPbVTtImSsLOV7_aHDEHUKrSF9vfZU9vOb9ijZe1NqHw' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs":[
    {
      "href":"files/Example.psd",
      "storage":"adobe"
    }
  ],
  "options":{
    "layers":[
      {
        "operations":{                                      // <--- NEW KEYWORD TO INDICATE AN EDIT
          "edit":true
        },
        "attributes":{
          "bounds":{
            "height":136,
            "left":0,                                       // <--- CHANGE LAYER POSITION
            "top":0,  
            "width":252
          },
          "paragraphStyle":{
            "alignment":"left"
          },
          "textStyle":{
            "fontAvailable":true,
            "fontName":"AdobeClean-Bold",
            "fontSize":24,                                  // <--- CHANGE FONT SIZE
            "orientation":"horizontal",
            "text":"Inspire your customers’ creativity."    // <--- CHANGE TEXT CONTENT
          }
        },
        "id":412,
        "index":6,
        "locked":true,                                      // <--- LOCK THE LAYER
        "name":"Inspire your customers’ creativity.",       // <--- CHANGE LAYER NAME
        "type":"textLayer",
        "visible":true
      }
    ]
  },
  "outputs":[
    {
      "href":"files/Example.jpeg",                           // <--- GENERATE RENDITION
      "storage":"adobe",  
      "width":0,
      "type":"image/jpeg"
    }
  ]
}'
```

This initiates an asynchronous job and returns a request body containing the href to poll for job status and requested rendition information.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/pie/psdService/status/8ad955af-e511-4c6f-845b-193c7bbba9b9"
        }
    }
}
```

### Example 2: Poll for status and results

Using the job id returned from the previous call you can poll on the returned `/status` href to get the status for the edit job and each requested output

```shell
curl -X GET \
  https://image.adobe.io/pie/psdService/status/8ad955af-e511-4c6f-845b-193c7bbba9b9 \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>'
```

And this will return a request body containing the job status for each requested output and eventually either errors or the hrefs to the requested outputs

```json
{
  "jobId":"8ad955af-e511-4c6f-845b-193c7bbba9b9",
  "outputs":[
    {
      "input":"/files/Example.psd",
      "status":"succeeded",
      "created":"2018-01-04T12:57:15.12345:Z",
      "modified":"2018-01-04T12:58:36.12345:Z",
      "_links":{
        "renditions":[
          {
            "href":"/files/Example.jpeg",
            "storage":"adobe",
            "type":"vnd.adobe.photoshop",
          }
        ]
      }
    }
  ],
  "_links":{
    "self":{
      "href":"https://image.adobe.io/pie/psdService/status/8ad955af-e511-4c6f-845b-193c7bbba9b9"
    }
  }
}
```


### Example 3: Adding a new adjustment layer

Any API call that includes adding layers requires the entire JSON manifest to be passed in (details below) as the entire document tree is needed to indicate where new layers are to be inserted.

This example shows how you can add a new brightnessContrast adjustment layer to the top of your PSD.  Things to note:

- NEW KEYWORD TO INDICATE AN ADDITION: The `operations.add` key is included in the new layer object at the beginning of the `options.layers` array. This indicates exactly where you want the new layer placed in the overall Manifest tree.  Moving this layer object elsewhere in the tree would indicate a different desired location.
- LAYER TYPE IS REQUIRED: The type indicates you want a new layer of type adjustment layer.
- LAYER ID AND INDEX ARE NOT PRESENT: The layer index and id are not supported for add operations. The index is implied by the objects position in the manifest tree and the ID will be generated by the service and returned to you in subsequent calls to `/documentManifest`

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H 'Authorization: Bearer eyJ4NXUiOiJjZXJ0X2ZpbGUuY2VyIiwiYWxnIjoiUlMyNTYifQ.eyJpZCI6Ijx5b3VyX2lkPiIsImNsaWVudF9pZCI6Ijx5b3VyX2NsaWVudF9pZD4iLCJ1c2VyX2lkIjoiPHVzZXJJRD5AQWRvYmVJRCIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJhcyI6Zm9vIiwiZmciOiJTV0tYS1hDRVg3Nzc3Nzc3TlhLTk9TSUFJWT09PT09PSIsInNpZCI6ImZvbyIsIm1vaSI6IjEwNTkwMmFlIiwiYyI6Im8xV2Y0UURoZDFBdG1jb3FwdGpqOVE9PSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiPHNjb3BlPiIsImNyZWF0ZWRfYXQiOiIxNTM0ODcyMzU3OTcxIn0=.amuZs0vsE6-scPjPJLEoYVPHJnY6tunspkRyfxC-1BzMAPqH9dnK64J7Ja6owLmB89tm_BTWMgj3iLZerystQBOmm7TTJER7qLzyzk2O1p0l9enulGzeOHqb995rRBkXUCduamWnfCRkFQBYDG7E1riWhzgzbQ0C_Hz8_XdAjNIGuhA9hEZXcqtBG3CTQHNWpdViKfIuSznBujBCSmok4sBPCT-WYlTjsTUyBVvv1kl1oOlKpKBZxUkYaCr6BB_BuoSJUBpePRdQPtTLsG26In5OYX4CO3ZHnBcO3u9csaiPbVTtImSsLOV7_aHDEHUKrSF9vfZU9vOb9ijZe1NqHw' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs":[
    {
      "href":"files/Example.psd",
      "storage":"adobe"
    }
  ],
  "options":{
    "layers":[
      {                                        // <--- THE DESIRED NEW LAYER IS PLACED AT THE TOP OF THE LAYER TREE
        "operation":{                          //      INDICATING WHERE IN THE DOCUMENT WE WANT THE LAYER PLACED
          "add":true                           // <--- NEW KEYWORD TO INDICATE AN ADDITION
        },
        "attributes":{
          "brightnessContrast":{
            "brightness":25,
            "contrast":-40
          }
        },
        "name":"NewBrightnessContrast",
        "type":"adjustmentLayer"              // <--- LAYER TYPE IS REQUIRED
      },
      {
        "attributes":{
          "bounds":{
            "height":64,
            "left":12,
            "top":1,
            "width":39
          }
        },
        "id":549,
        "index":8,
        "locked":false,
        "name":"CompanyLogo",
        "type":"smartObject",
        "visible":true
      },
      {
        // THE REMAINDER OF THE JSON MANIFEST WOULD BE INCLUDED HERE....
      }
    ]
  },
  "outputs":[
    {
      "href":"files/Example_Out.jpeg",
      "storage":"adobe",
      "type":"image/jpeg"
    }
  ]
}'
```


### Example 4: Editing the image in a pixel layer

In this example we want to replace the image in an existing pixel layer, the Hero Image layer in Example.psd. We are requesting the following:

- NEW KEYWORD TO INDICATE AN EDIT: The `operations.edit` key is included to indicate we want to edit this layer
- NEW KEYWORD TO INDICATE IMAGE REPLACEMENT INFO: The `layers.input` object is included to indicate where the replacement image can be found

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H 'Authorization: Bearer eyJ4NXUiOiJjZXJ0X2ZpbGUuY2VyIiwiYWxnIjoiUlMyNTYifQ.eyJpZCI6Ijx5b3VyX2lkPiIsImNsaWVudF9pZCI6Ijx5b3VyX2NsaWVudF9pZD4iLCJ1c2VyX2lkIjoiPHVzZXJJRD5AQWRvYmVJRCIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJhcyI6Zm9vIiwiZmciOiJTV0tYS1hDRVg3Nzc3Nzc3TlhLTk9TSUFJWT09PT09PSIsInNpZCI6ImZvbyIsIm1vaSI6IjEwNTkwMmFlIiwiYyI6Im8xV2Y0UURoZDFBdG1jb3FwdGpqOVE9PSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiPHNjb3BlPiIsImNyZWF0ZWRfYXQiOiIxNTM0ODcyMzU3OTcxIn0=.amuZs0vsE6-scPjPJLEoYVPHJnY6tunspkRyfxC-1BzMAPqH9dnK64J7Ja6owLmB89tm_BTWMgj3iLZerystQBOmm7TTJER7qLzyzk2O1p0l9enulGzeOHqb995rRBkXUCduamWnfCRkFQBYDG7E1riWhzgzbQ0C_Hz8_XdAjNIGuhA9hEZXcqtBG3CTQHNWpdViKfIuSznBujBCSmok4sBPCT-WYlTjsTUyBVvv1kl1oOlKpKBZxUkYaCr6BB_BuoSJUBpePRdQPtTLsG26In5OYX4CO3ZHnBcO3u9csaiPbVTtImSsLOV7_aHDEHUKrSF9vfZU9vOb9ijZe1NqHw' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs":[
    {
      "href":"files/Example.psd",
      "storage":"adobe"
    }
  ],
  "options":{
    "layers":[
      {
        "operations":{
          "edit":true                                   // <--- NEW KEYWORD TO INDICATE AN ADDITION
        },
        "input":{                                       // <--- NEW KEYWORD TO INDICATE IMAGE REPLACEMENT INFO
          "href":"/files/newHeroImage.jpeg",
          "storage":"adobe"
        },
        "attributes":{
          "bounds":{
            "height":515,
            "left":-385,
            "top":-21,
            "width":929
          }
        },
        "id":750,
        "index":1,
        "locked":false,
        "name":"HeroImage",
        "type":"smartObject",
        "visible":true
      }
    ]
  },
  "outputs":[
    {
      "href":"files/Example_Out.psd",
      "storage":"adobe",
      "type":"vnd.adobe.photoshop",
      "overwrite":true
    }
  ]
}
'
```

### Example 5: Creating new Renditions

See the `/renditionCreate` examples below as the format for the `outputs` object in the request body is identical

## /renditionCreate (Generating New Renditions)

The `/renditionsCreate` endpoint can take a number of input PSD files and generate new image renditions or a new PSD

#### Example 1: A single file input

In this example we are requesting two different outputs from our Example.psd input:

- Example.jpeg is a new JPEG rendition that has a width of 512 pixels
- Example.png is a new fullsize PNG rendition


```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/renditionCreate \
  -H 'Authorization: Bearer eyJ4NXUiOiJjZXJ0X2ZpbGUuY2VyIiwiYWxnIjoiUlMyNTYifQ.eyJpZCI6Ijx5b3VyX2lkPiIsImNsaWVudF9pZCI6Ijx5b3VyX2NsaWVudF9pZD4iLCJ1c2VyX2lkIjoiPHVzZXJJRD5AQWRvYmVJRCIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJhcyI6Zm9vIiwiZmciOiJTV0tYS1hDRVg3Nzc3Nzc3TlhLTk9TSUFJWT09PT09PSIsInNpZCI6ImZvbyIsIm1vaSI6IjEwNTkwMmFlIiwiYyI6Im8xV2Y0UURoZDFBdG1jb3FwdGpqOVE9PSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiPHNjb3BlPiIsImNyZWF0ZWRfYXQiOiIxNTM0ODcyMzU3OTcxIn0=.amuZs0vsE6-scPjPJLEoYVPHJnY6tunspkRyfxC-1BzMAPqH9dnK64J7Ja6owLmB89tm_BTWMgj3iLZerystQBOmm7TTJER7qLzyzk2O1p0l9enulGzeOHqb995rRBkXUCduamWnfCRkFQBYDG7E1riWhzgzbQ0C_Hz8_XdAjNIGuhA9hEZXcqtBG3CTQHNWpdViKfIuSznBujBCSmok4sBPCT-WYlTjsTUyBVvv1kl1oOlKpKBZxUkYaCr6BB_BuoSJUBpePRdQPtTLsG26In5OYX4CO3ZHnBcO3u9csaiPbVTtImSsLOV7_aHDEHUKrSF9vfZU9vOb9ijZe1NqHw' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs":[
    {
      "href":"files/Example.psd",
      "storage":"adobe"
    }
  ],
  "outputs":[
    {
      "href":"files/Example.jpeg",          
      "width": 512
      "storage":"adobe",
      "type":"image/jpeg",      
    },
    {
      "href":"files/Example.png",
      "storage":"adobe",
      "type":"image/png",
    }
  ]
}
'
```

This initiates an asynchronous job and returns a request body containing the href to poll for job status and requested rendition information.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/pie/psdService/status/de2415fb-82c6-47fc-b102-04ad651c5ed4"
        }
    }
}
```

### Example 2: Poll for status and results

Using the job id returned from the previous call you can poll on the returned `/status` href to get the status for each requested output

```shell
curl -X GET \
  https://image.adobe.io/pie/psdService/status/de2415fb-82c6-47fc-b102-04ad651c5ed4 \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>'
```

This will return a request body containing the job status for each requested output

```json
{
  "jobId":"de2415fb-82c6-47fc-b102-04ad651c5ed4",
  "outputs":[
    {
      "input":"/files/Example.psd",
      "status":"succeeded",
      "created":"2018-01-04T12:57:15.12345:Z",
      "modified":"2018-01-04T12:58:36.12345:Z",
      "_links":{
        "renditions":[
          {
            "href":"files/Example.jpeg",          
            "width": 512,
            "storage":"adobe",
            "type":"image/jpeg",      
          },
          {
            "href":"files/Example.png",
            "storage":"adobe",
            "type":"image/png",
          }
        ]
      }
    }
  ],
  "_links":{
    "self":{
      "href":"https://image.adobe.io/pie/psdService/status/de2415fb-82c6-47fc-b102-04ad651c5ed4"
    }
  }
}
```

### Example 3: A folder input (multiple files)

In this example we are requesting new full size jpeg renditions from an input folder containing multiple PSD documents.

Note that the `outputs` object is using file tokens, $FileName, to create new files with the same names as the input files found

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/renditionCreate \
  -H 'Authorization: Bearer eyJ4NXUiOiJjZXJ0X2ZpbGUuY2VyIiwiYWxnIjoiUlMyNTYifQ.eyJpZCI6Ijx5b3VyX2lkPiIsImNsaWVudF9pZCI6Ijx5b3VyX2NsaWVudF9pZD4iLCJ1c2VyX2lkIjoiPHVzZXJJRD5AQWRvYmVJRCIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJhcyI6Zm9vIiwiZmciOiJTV0tYS1hDRVg3Nzc3Nzc3TlhLTk9TSUFJWT09PT09PSIsInNpZCI6ImZvbyIsIm1vaSI6IjEwNTkwMmFlIiwiYyI6Im8xV2Y0UURoZDFBdG1jb3FwdGpqOVE9PSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiPHNjb3BlPiIsImNyZWF0ZWRfYXQiOiIxNTM0ODcyMzU3OTcxIn0=.amuZs0vsE6-scPjPJLEoYVPHJnY6tunspkRyfxC-1BzMAPqH9dnK64J7Ja6owLmB89tm_BTWMgj3iLZerystQBOmm7TTJER7qLzyzk2O1p0l9enulGzeOHqb995rRBkXUCduamWnfCRkFQBYDG7E1riWhzgzbQ0C_Hz8_XdAjNIGuhA9hEZXcqtBG3CTQHNWpdViKfIuSznBujBCSmok4sBPCT-WYlTjsTUyBVvv1kl1oOlKpKBZxUkYaCr6BB_BuoSJUBpePRdQPtTLsG26In5OYX4CO3ZHnBcO3u9csaiPbVTtImSsLOV7_aHDEHUKrSF9vfZU9vOb9ijZe1NqHw' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
  "inputs":[
    {
      "href":"files/my_input_folder",
      "storage":"adobe"
    }
  ],
  "outputs":[
    {
      "href":"files/$FileName.jpeg",           // <--- THE $FileName TOKEN
      "storage":"adobe",
      "type":"image/jpeg",
    }
  ]
}
'
```

# Sample Code

The [samples](samples) folder in this repo contains sample code for authenticating with JWT. And, sample code for calling the Photoshop APIs. 

Note that the samples are covered by the MIT license. 

# Release Notes

Currently known issues:

- Multi-part uploads and downloads are not yet supported
- Clients can only use assets stored on EITHER Adobe's Creative Cloud or external storage (like AWS S3)
- The `/documentOperations` endpoint only supports a single PSD input
- Error handling is a work in progress. Sometimes you may not see the most helpful of messages
