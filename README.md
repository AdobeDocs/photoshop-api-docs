

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Welcome to Photoshop APIs!](#welcome-to-photoshop-apis)
- [General Setup and Onboarding](#general-setup-and-onboarding)
  - [Authentication](#authentication)
    - [Overview](#overview)
    - [Workflow and Use Cases](#workflow-and-use-cases)
    - [Individual users](#individual-users)
      - [Additional OAuth 2.0 and IMS Information](#additional-oauth-20-and-ims-information)
    - [Service Token Workflow (Adobe ETLA users)](#service-token-workflow-adobe-etla-users)
      - [Additional Service Token and JWT Information](#additional-service-token-and-jwt-information)
  - [API Keys](#api-keys)
  - [Retries](#retries)
  - [Rate Limiting](#rate-limiting)
- [Photoshop](#photoshop)
  - [General Workflow](#general-workflow)
    - [Input and Output file storage](#input-and-output-file-storage)
    - [Tracking document changes](#tracking-document-changes)
  - [Supported Features](#supported-features)
    - [Layer level edits](#layer-level-edits)
    - [Rendering / Conversions](#rendering--conversions)
    - [SmartObject](#smartobject)
    - [Compatibility with Photoshop versions](#compatibility-with-photoshop-versions)
  - [How to use the Photoshop APIs](#how-to-use-the-photoshop-apis)
    - [/documentManifest (Retrieving a PSD manifest)](#documentmanifest-retrieving-a-psd-manifest)
      - [Example 1: Initiate a job to retrieve a PSD's JSON manifest](#example-1-initiate-a-job-to-retrieve-a-psds-json-manifest)
      - [Example 2: Poll for status and results](#example-2-poll-for-status-and-results)
      - [Example 3: The returned manifest](#example-3-the-returned-manifest)
    - [/documentOperations (Making PSD edits and renders)](#documentoperations-making-psd-edits-and-renders)
      - [The add, edit and delete objects](#the-add-edit-and-delete-objects)
      - [Example 1: Making a simple edit](#example-1-making-a-simple-edit)
      - [Example 2: Creating new Renditions](#example-2-creating-new-renditions)
      - [Example 3: Swapping the image in a smart object layer](#example-3-swapping-the-image-in-a-smart-object-layer)
    - [/renditionCreate (Generating New Renditions)](#renditioncreate-generating-new-renditions)
        - [Example 1: A single file input](#example-1-a-single-file-input)
      - [Example 2: Poll for status and results](#example-2-poll-for-status-and-results-1)
      - [Example 3: A folder input (multiple files)](#example-3-a-folder-input-multiple-files)
    - [/smartObject (Replacing smartobject)](#smartobject-replacing-smartobject)
        - [Example 1: Replacing a SmartObject](#example-1-replacing-a-smartobject)
        - [Example 2: Creating a SmartObject](#example-2-creating-a-smartobject)
  - [Sample Code](#sample-code)
  - [Current Limitations](#current-limitations)
- [Lightroom APIs](#lightroom-apis)
  - [General Workflow](#general-workflow-1)
  - [How to use the Lightroom API's](#how-to-use-the-lightroom-apis)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Welcome to Photoshop APIs!

The Adobe Photoshop APIs enable you to make creative edits to your images and Ps files by providing access to core Adobe technologies.  This document  will help you onboard to the services, familiarize you with available features, and get you started with some basic usage examples.

The API documentation is published at

[Photoshop API Documentation](https://adobedocs.github.io/photoshop-api-docs/)

[Lightroom API Documentation](https://adobedocs.github.io/lightroom-api-docs/)



# General Setup and Onboarding

## Authentication
### Overview

The Photoshop API uses client id’s (also know as api keys) and authentication tokens to authenticate requests. There are two different kinds of authorization tokens available:  

1. Individual user access (OAuth 2.0 access token)
2. Adobe Enterprise ETLA (Service token using JSON Web Token/JWT)

If this is your first time using Adobe API’s we suggest trying out the OAuth workflow.

In order to use the Photoshop API's you’ll need to get a Client ID (also known as an API key) and a Client Secret. Once you have those you can use them to programmatically get an access token to authenticate your requests.  We’ll walk you through the steps below.


### Workflow and Use Cases

Here are the workflows we currently support.  You are…

- An individual user logged in who has an Adobe Creative Cloud Account
- An organization with an Adobe ETLA (an enterprise account)
- Running a job on a server
- Running in a browser

If your workflow falls outside of these please contact us at psdservices@adobe.com so we can help meet your needs.

### Individual users
1. Get your client id and client secret.
After you've been accepted to the PreRelease program you will be emailed your credentials (your client ID and client Secret) required for API authentication.

2. Test out your credentials.
This will allow you to verify that your credentials work and show you want an OAuth token looks like for when you eventually do this programmatically.
  - Browse to https://ps-prerelease-us-east-1.cloud.adobe.io
  - Enter the client id and secret
  - Follow through the login process
  - If your credentials work you should see an authorization token appear on your screen
This is the OAuth token that’s required to make calls to the Photoshop API’s and if you’d like you can jump ahead and immediately try them out now.  Eventually you will make this process programmatic (instructions below) but in the meantime the token expires in 24 hours and you can use this workflow during development for as long as you’d like.

3. Make an authenticated call to ensure you can round trip successfully with the API’s
```shell
curl --request GET \
  --url https://image.adobe.io/pie/psdService/hello  \
  --header 'Authorization: Bearer <YOUR_OAUTH_TOKEN>' \
  --header 'x-api-key: <YOUR_CLIENT_ID>' \
```
  Congrats! You just made your first request to the Photoshop API.

4. Automate token retrieval

  Eventually you will need to automate the OAuth token retrieval process. The Photoshop API does not provide any API methods for authentication or authorization.  Instead, access tokens are granted by Adobe's IMS service. When you call IMS to retrieve your token you will need to pass in a `scope`  parameter. The Photoshop API needs an access token with a scope="openid,creative_sdk" and hence it is required that you pass in this parameter to the IMS Login Authorization API.

  The access token must never be transmitted as a URI parameter. Doing so would expose it to being captured in-the-clear by intermediaries such as proxy server logs. The API does not allow you to send an access token anywhere except the Authorization header field.

  Your access token will expire typically in 24 hours.  You will receive a ‘refresh_token’ when you initially obtain the access token that you can use to get a new access token.  Be aware that refreshing your token might require a new login event.  Please reference the [OAuth documentation](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md) for additional instructions.

  Here’s an example call to IMS to retrieve your auth token.  Please refer to the [OAuth sample code](https://github.com/AdobeDocs/photoshop-api-docs/tree/sudipta/archydoc/sample_code/oauth-sample-app) for how you would do this in an actual production environment.

  Don’t forget to escape your username.  For example “`yoda@adobe.com`" becomes “`yoda%40adobe.com`".  

  ``` shell
  curl -X POST 'https://ims-na1-cc1.adobelogin.com/ims/token/v1?client_id=<INSERT_CLIENT_ID>&username=<INSERT_ADOBE_USERNAME>&password=<INSERT_PASSWORD>&scope=AdobeID%2Ccreative_sdk&grant_type=password&client_secret=<INSERT_SECRET>'
  ```
#### Additional OAuth 2.0 and IMS Information

You can find details on interacting with Adobe IMS API’s and authentication in general
1. [General Authentication Information](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/AuthenticationGuide.md)
2. [OAuth Authentication](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md)
3. [IMS API’s](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/Resources/IMS.md)
4. [OAuth Sample Code](https://github.com/AdobeDocs/photoshop-api-docs/tree/sudipta/archydoc/sample_code/oauth-sample-app)

### Service Token Workflow (Adobe ETLA users)
In order to be an enterprise user you must already have an ETLA.  To find out if you have an ETLA reach out to your system administrator or your Adobe Account Executive.  

Enterprise users will not have access to assets stored in the Creative Cloud so you must use an external storage source when making calls to the API.
1. Get a developer role in the Adobe Admin Console
You system admin will need to give you developer access in the [Adobe Admin Console](https://adminconsole.adobe.com/overview)
2. Go to https://console.adobe.io and create a service integration and follow the instructions at [Service Token Instructions](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/ServiceAccountIntegration.md)

  On Step 1 of the Service Integration docs, ‘Subscribe to an Adobe Service’ you will select the following
    1. Photoshop
    2. Lightroom / Camera Raw API
    3. Image Cutout

3. Create a JSON Web Token (JWT) and exchange it for an access token
Take the information from your integration, plus your private key that you created when you created your integration and follow the instructions at [JWT Instructions:](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md)

  You can refer to [JWT sample code](https://github.com/AdobeDocs/photoshop-api-docs/tree/sudipta/archydoc/sample_code/jwt-sample-app) for additional help

4. Make your first Photoshop API call
Make an authenticated call to ensure you can round trip successfully with the API’s

``` shell

curl --request GET \
  --url https://image.adobe.io/pie/psdService/hello \
  --header 'Authorization: Bearer <YOUR_SERVICE_TOKEN>' \
  --header 'x-api-key: <YOUR_CLIENT_ID>'
  ```
  Congrats! You just made your first request to the Photoshop API.

5. Automate your access token retrieval
Go back to step 3 to obtain a fresh service token

#### Additional Service Token and JWT Information

You can find details on interacting with Adobe IMS API’s and authentication in general
  1. [General Authentication Information](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/AuthenticationGuide.md)
  2. [JWT/Service Token Authentication](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/JWT/JWT.md)
  3. [IMS API’s](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/Resources/IMS.md)
  4. [JWT Sample Code](https://github.com/AdobeDocs/photoshop-api-docs/tree/sudipta/archydoc/sample_code/jwt-sample-app)

## API Keys

Also known as the `client_id`. You must additionally pass in your Adobe API key in the `x-api-key` header field. You’ll automatically get a developer API key when you create your Adobe I/O Console Integration.  After you've created your integration you can find your API key in the `Overview` tab of your Integration

## Retries

- The service will retry status codes of 429, 502, 503, 504 three times.
- You should only retry requests that have a 5xx response code. A 5xx error response indicates there was a problem processing the request on the server.
- You should implement an exponential back-off retry strategy with 3 retry attempts.
- You should not retry requests for any other response code.

## Rate Limiting

We have not put a throttle limit on requests to the API at this time.

# Photoshop

## General Workflow

The typical workflow involves retrieving a PSD document manifest file via `/documentManifest` (a JSON representation of the documents layer tree), followed by one or more calls to `/documentOperations` to optionally edit the PSD and/or create new image renditions. Both endpoints are asynchronous so the response will contain the `/status` endpoint to poll for job status and results

### Input and Output file storage

Clients can use assets stored on one of the following storage types:
1. Adobe: by referencing the path to the files on Creative Cloud
2. External: (like AWS S3) by using a presigned GET/PUT URL
3. Azure: By generating a SAS (Shared Access Signature) for upload/download
4. Dropbox: Generate temporary upload/download links using https://dropbox.github.io/dropbox-api-v2-explorer/


### Tracking document changes

If you are making multiple edits to a PSD during the course of a user session it is your decision on how you want to track and store changes from one version of a PSD to another. Some clients will choose to refresh the document's JSON manifest by calling `/documentManifest` again after each call to `/documentOperations`. Other clients may choose to cache the changes locally and then make one final call to `/documentOperations` with the original PSD and the accumulated changes requested by the user.

## Supported Features

This is a list of currently supported features.

### Layer level edits

- General layer edits
  - Edit the layer name/id
  - Toggle the layer locked state
  - Toggle layer visibility
  - Apply bounds
- Add or replace a Smart Object Layer in a document
- Add or edit a Fill layer in a document along with Blend modes  

### Rendering / Conversions

- Create a new PSD document
- Create a JPEG, TIFF or PNG rendition of various sizes
- Request thumbnail previews of all renderable layers
- Convert between any of the supported filetypes (PSD, JPEG, TIFF, PNG)

### SmartObject

The Photoshop APIs currently support creating and editing of Embedded Smart Objects.

- In order to update an embedded smart object that is referenced by multiple layers you only need to update one of those layers, the effect will be reflected in all layers referencing the same smart object.

- The replaced smart object takes the bounds of the new image by default. If your document contains transparent pixels (e.g some .png) , you may not get consistent bounds.

The API's are documented [here](https://adobedocs.github.io/photoshop-api-docs/#api-Photoshop-document_operations)

We also have an example of replacing a Smart Object within a layer.

[Smart Object Example Code](https://github.com/AdobeDocs/photoshop-api-docs#example-6-swapping-the-image-in-a-smart-object-layer)

### Compatibility with Photoshop versions

1. The API’s will open any PSD created with Photoshop 1.0 through the current release and this will always be true.
2.  When saving as PSD, the API’s will create PSD’s compatible with the current shipping Photoshop.
3.  In regards to “maximize compatibility” referenced in [https://helpx.adobe.com/photoshop/using/file-formats.html#maximize_compatibility_for_psd_and_psb_files](https://helpx.adobe.com/photoshop/using/file-formats.html#maximize_compatibility_for_psd_and_psb_files)  the API's default to “yes”


## How to use the Photoshop APIs

The API's are documented at https://adobedocs.github.io/photoshop-api-docs/

### /documentManifest (Retrieving a PSD manifest)

#### Example 1: Initiate a job to retrieve a PSD's JSON manifest

The `/documentManifest` api can take one or more input PSD's to generate JSON manifest files from. The JSON manifest is the tree representation of all of the layer objects contained in the PSD document. Using Example.psd, with the use case of a document stored in Adobe's Creative Cloud, a typical curl call might look like this:

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentManifest \
  -H 'Authorization: Bearer <auth_token>' \
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

This initiates an asynchronous job and returns a response containing the href to poll for job status and the JSON manifest.
```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/pie/psdService/status/63c6e812-6cb8-43de-8a60-3681a9ec6feb"
        }
    }
}
```

#### Example 2: Poll for status and results

Using the job id returned from the previous call you can poll on the returned `/status` href to get the job status and, upon success, the JSON Manifest

```shell
curl -X GET \
  https://image.adobe.io/pie/psdService/status/63c6e812-6cb8-43de-8a60-3681a9ec6feb \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>'
```

#### Example 3: The returned manifest

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
          "bounds":{
            "height":64,
            "left":12,
            "top":1,
            "width":39
          },
          "id":549,
          "index":8,
          "locked":false,
          "name":"CompanyLogo",
          "type":"smartObject",
          "visible":true
        },
        {
          "bounds":{
            "height":153,
            "left":31,
            "top":334,
            "width":197
          },
          "children":[
            {
              "bounds":{
                "height":136,
                "left":29,
                "top":326,
                "width":252
              },
              "text": {
                "content":"Reset your customers’ expectations.",
                "paragraphStyles":[
                  {   
                    "alignment":"left"
                  }
                ],
                "characterStyles":[{
                  "fontAvailable":true,
                  "fontName":"AdobeClean-Bold",
                  "fontSize":36,
                  "orientation":"horizontal",
                }]               
              },
              "id":412,
              "index":6,
              "locked":false,
              "name":"Reset your customers’ expectations.",
              "type":"textLayer",
              "visible":true
            },
            {
              "bounds":{
                "height":67,
                "left":30,
                "top":452,
                "width":230
              },
              "text":{
                "content":"Get our retail experience article and infographic.",
                "paragraphStyles":[{
                  "alignment":"left"
                }],
                "characterStyles":[{
                  "fontAvailable":true,
                  "fontName":"AdobeClean-Regular",
                  "fontSize":15,
                  "orientation":"horizontal",
                }]
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
          "bounds":{
            "height":34,
            "left":31,
            "top":508,
            "width":99
          },
          "id":762,
          "index":3,
          "locked":false,
          "name":"CallToAction",
          "type":"smartObject",
          "visible":true
        },
        {
          "bounds":{
            "height":405,
            "left":0,
            "top":237,
            "width":300
          },
          "id":751,
          "index":2,
          "locked":false,
          "name":"BackgroundGradient",
          "type":"layer",
          "visible":true
        },
        {
          "bounds":{
            "height":515,
            "left":-385,
            "top":-21,
            "width":929
          },
          "id":750,
          "index":1,
          "locked":false,
          "name":"HeroImage",
          "type":"smartObject",
          "visible":true
        },
        {
          "bounds":{
            "height":600,
            "left":0,
            "top":0,
            "width":300
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

### /documentOperations (Making PSD edits and renders)

Once you have your PSD file's JSON manifest you can use it to make layer and/or document level edits to your PSD and then generate new renditions with the changes. You can pass in either all or a subset of the JSON manifest to `/documentOperations` as represented in the request body's `options.layers` argument. In other words you can choose to pass `options.layers` as a flat array of only the layers that you wish to act upon and can, if desired, leave out the rest.

The layer id or layer name are used by the service to identify the correct layer to operation upon in your PSD; Note that adding a new layer does not require the ID to be included, the service will generate a new layer id for you.

#### The add, edit and delete objects

The `add`, `edit`, `move` and `delete` blocks are how you communicate that you'd like action taken on that particular layer object. Any layer block passed into the API that is missing the one of these attributes will be ignored.

#### Example 1: Making a simple edit
```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
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
        "edit":{},     
        "id":750,
        "index":1,
        "locked":true,
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

#### Example 2: Creating new Renditions

See the `/renditionCreate` examples below as the format for the `outputs` object in the request body is identical

#### Example 3: Swapping the image in a smart object layer

In this example we want to swap the smart object in an existing embedded smart object layer, the Hero Image layer in Example.psd. We are requesting the following:

- The `edit` key is included to indicate we want to edit this layer
- The `layers.input` object is included to indicate where the replacement image can be found
- The `layers.smartObject` object is included to indicate specific information related to this image as SO

All the files used in the example are available in [sample_files](https://github.com/AdobeDocs/photoshop-api-docs/tree/master/sample_files). You can download the files and put it in your CC account or any storage(AWS, Azure or Dropbox).

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/documentOperations \
  -H "Authorization: Bearer $token"  \
  -H "x-api-key: $apiKey" \
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
        "edit":{},     
        "input":{                                       
          "href":"files/heroImage.png",  
          "storage":"adobe"
        },
        "smartObject" : {                
        	"type" : "image/png"
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

### /renditionCreate (Generating New Renditions)

The `/renditionsCreate` endpoint can take a number of input PSD files and generate new image renditions or a new PSD

##### Example 1: A single file input

In this example we are requesting two different outputs from our Example.psd input:

- Example.jpeg is a new JPEG rendition that has a width of 512 pixels
- Example.png is a new fullsize PNG rendition


```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/renditionCreate \
  -H 'Authorization: Bearer <auth_token>' \
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
      "width": 512,
      "storage":"adobe",
      "type":"image/jpeg"      
    },
    {
      "href":"files/Example.png",
      "storage":"adobe",
      "type":"image/png"
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

#### Example 2: Poll for status and results

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
            "type":"image/jpeg"    
          },
          {
            "href":"files/Example.png",
            "storage":"adobe",
            "type":"image/png"
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

#### Example 3: A folder input (multiple files)

In this example we are requesting new full size jpeg renditions from an input folder containing multiple PSD documents.

Note that the `outputs` object is using file tokens, $FileName, to create new files with the same names as the input files found

```shell
curl -X POST \
  https://image.adobe.io/pie/psdService/renditionCreate \
  -H 'Authorization: Bearer <auth_token>' \
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
### /smartObject (Replacing smartobject)

The `/smartObject` endpoint can take an input PSD file with an embedded smartobject and can replace with another smartobject.
This API is a simple API developed to ease the smartObject replacement workflow for an user.

##### Example 1: Replacing a SmartObject
This example shows how you can replace an embedded smart object

``` shell
curl - H "Authorization: Bearer $token" \
- H "x-api-key: $api_key" \
- X POST \
https: //image.adobe.io/pie/psdService/smartObject \
- d '{
  "inputs": [
  {
    "href": "files/SOCreate.psd",
    "storage": "adobe"
  }],
  "options": {
    "layers": [{
      "name": "New",
      "input": {
        "href": "files/jt-guitar.jpeg",
        "storage": "adobe"
      }
     }
    ]
  },
  "outputs": [
  {
    "storage": "adobe",
    "href": "files/SOedit.psd",
    "type": "vnd.adobe.photoshop"
  }
  ]}'

```

##### Example 2: Creating a SmartObject
This example shows how you can create an embedded smart object

``` shell
curl - H "Authorization: Bearer $token" \
- H "x-api-key: $api_key" \
- X POST \
https: //image.adobe.io/pie/psdService/smartObject
- d '{
  "inputs": [
  {
    "href": "files/SO.psd",
    "storage": "adobe"
  }],
  "options": {
    "layers": [{
      "name": "New",
      "add": {
        "insertTop": true
      },
      "input": {
        "href": "files/jt-drums.jpeg",
        "storage": "adobe"
       }
      }
    ]
  },
  "outputs": [
  {
    "storage": "adobe",
    "href": "files/SOCreate.psd",
    "type": "vnd.adobe.photoshop"
  }
]}'

```
## Sample Code

The [sample_code](sample_code) folder in this repo contains sample code for calling the Photoshop APIs.

Note that the sample code is covered by the MIT license.


## Current Limitations
There are a few limitations to the APIs you should be aware of ahead of time.  
- Multi-part uploads and downloads are not yet supported
- The `/documentOperations`, `/documentManifest`, `/renditionCreate` and `/smartObject` endpoints only support a single PSD input


The file Example.psd is included in this repository if you'd like to experiment with these example calls on your own.


# Lightroom APIs

The Adobe Lightroom APIs allow you to make Lightroom-like automated edits to image files.

## General Workflow

The typical workflow involves making an API POST call to the endpoint https://image.adobe.io/lrService/ for which the response will contain a link to check the status of the asynchronous job. Making a GET call to this link will return the status of the job and, eventually, the links to your generated output.

## How to use the Lightroom API's

The API's are documented at [https://github.com/AdobeDocs/lightroom-api-docs](https://github.com/AdobeDocs/lightroom-api-docs/)
