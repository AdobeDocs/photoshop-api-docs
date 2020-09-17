


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
    - [SmartObject](#smartobject)
    - [Text layers (`New!`)](#text-layers-new)
      - [Font handling](#font-handling)
      - [Handle missing fonts in the document.](#handle-missing-fonts-in-the-document)
      - [Limitations](#limitations)
    - [Rendering / Conversions](#rendering--conversions)
    - [Layer level edits](#layer-level-edits)
      - [The add, edit and delete objects](#the-add-edit-and-delete-objects)
    - [Compatibility with Photoshop versions](#compatibility-with-photoshop-versions)
  - [How to use the Photoshop APIs](#how-to-use-the-photoshop-apis)
    - [Example 1: /smartObject (Replacing smartobject)](#example-1-smartobject-replacing-smartobject)
      - [Sample 1: Replacing a SmartObject](#sample-1-replacing-a-smartobject)
      - [Sample 2: Creating a SmartObject](#sample-2-creating-a-smartobject)
    - [Example 2: Using /documentOperations to edit TextLayer(s)](#example-2-using-documentoperations-to-edit-textlayers)
      - [Sample 2.1: Making a text layer edit](#sample-21-making-a-text-layer-edit)
      - [Sample 2.2: Using a custom font in a text layer](#sample-22-using-a-custom-font-in-a-text-layer)
      - [Sample 2.3: Dictating actions for missing fonts](#sample-23-dictating-actions-for-missing-fonts)
    - [Example 3: /documentOperations (Making PSD edits and renders)](#example-3-documentoperations-making-psd-edits-and-renders)
      - [Sample 3.1: Making a simple edit](#sample-31-making-a-simple-edit)
      - [Sample 3.2: Creating new Renditions](#sample-32-creating-new-renditions)
      - [Sample 3.3: Swapping the image in a smart object layer](#sample-33-swapping-the-image-in-a-smart-object-layer)
    - [Example 4: /renditionCreate (Generating New Renditions)](#example-4-renditioncreate-generating-new-renditions)
      - [Sample 4.1: A single file input](#sample-41-a-single-file-input)
    - [Example 5: /documentManifest (Retrieving a PSD manifest)](#example-5-documentmanifest-retrieving-a-psd-manifest)
      - [Sample 5.1: Initiate a job to retrieve a PSD's JSON manifest](#sample-51-initiate-a-job-to-retrieve-a-psds-json-manifest)
    - [Example 6: Fetch the status of the job after successfully submitting a request](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request)
      - [Sample 6.1 Poll for job status and get the returned manifest (for the /documentManifest API)](#sample-61-poll-for-job-status-and-get-the-returned-manifest-for-the-documentmanifest-api)
      - [Sample 6.2 Poll for job status and get the results of all other APIs](#sample-62-poll-for-job-status-and-get-the-results-of-all-other-apis)
  - [Sample Code](#sample-code)
  - [Current Limitations](#current-limitations)
- [ImageCutout](#imagecutout)
  - [General Workflow](#general-workflow-1)
  - [How to use the API's](#how-to-use-the-apis)
    - [Example 1: Initiate a job to create an image cutout](#example-1-initiate-a-job-to-create-an-image-cutout)
    - [Example 2: Initiate a job to create an image mask](#example-2-initiate-a-job-to-create-an-image-mask)
- [Lightroom APIs](#lightroom-apis)
  - [General Workflow](#general-workflow-2)
  - [How to use the Lightroom API's](#how-to-use-the-lightroom-apis)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Welcome to Photoshop APIs!

The Adobe Photoshop APIs enable you to make creative edits to your images and Ps files by providing access to core Adobe technologies.  This document  will help you onboard to the services, familiarize you with available features, and get you started with some basic usage examples.

The API documentation is published at

[Photoshop API Documentation](https://adobedocs.github.io/photoshop-api-docs/#api-Photoshop)

[Lightroom API Documentation](https://adobedocs.github.io/photoshop-api-docs/#api-Lightroom)

[Image Cutout API Documentation](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Sensei)



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
This will allow you to verify that your credentials work and show you what an OAuth token looks like for when you eventually do this programmatically.
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

4.  Make a Photoshop API call with real assets

  Now that you can successfully authenticate and talk to the API’s it’s time to make “real” calls…

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

5. Notes on token retrieval

  The access token must never be transmitted as a URI parameter. Doing so would expose it to being captured in-the-clear by intermediaries such as proxy server logs. The API does not allow you to send an access token anywhere except the Authorization header field.

  Your access token will expire typically in 24 hours.  You will receive a ‘refresh_token’ when you initially obtain the access token that you can use to get a new access token.  Be aware that refreshing your token might require a new login event.  Please reference the [OAuth documentation](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/OAuth/OAuth.md) for additional instructions.

6. Automate token retrieval

  Please contact psdservices@adobe.com for more information on how you can automate token generation for your workflow.

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

The typical workflow involves making one or more calls to `/documentOperations`, `/smartObject` to optionally edit an input PSD, and/or create new image renditions. Both endpoints are asynchronous so the response will contain the `/status` endpoint to poll for job status and results.

Optionally, another call can be made to retrieve the manifest file (a JSON representation of the documents layer tree) for this PSD document via the `/documentManifest` API.

### Input and Output file storage

Clients can use assets stored on one of the following storage types:
1. Adobe: by referencing the path to the files on Creative Cloud
2. External: (like AWS S3) by using a presigned GET/PUT URL
3. Azure: By generating a SAS (Shared Access Signature) for upload/download
4. Dropbox: Generate temporary upload/download links using https://dropbox.github.io/dropbox-api-v2-explorer/

### Tracking document changes

If you are making multiple edits to a PSD during the course of a user session it is your decision on how you want to track and store changes from one version of a PSD to another. Some clients will choose to refresh the document's JSON manifest by calling `/documentManifest` again after each call to `/documentOperations`. Other clients may choose to cache the changes locally and then make one final call to `/documentOperations` with the original PSD and the accumulated changes requested by the user.

## Supported Features

This is a list of currently supported features through our APIs.

### SmartObject

The Photoshop APIs currently support creating and editing of Embedded Smart Objects.

- In order to update an embedded smart object that is referenced by multiple layers you need to update each of those layers, then only the effect will be reflected in all layers referencing the same smart object.
- The replaced smart object is placed within the bounding box of the original image. If the new image is bigger or smaller than the original image, it fits into the original bounding box maintaining the aspect ratio. You can change the bounds of the replacement image by passing bounds parameters in the API call.
- If your document contains transparent pixels (e.g some .png) for the smart object layer, you may not get consistent bounds.

The API's are documented [here](https://adobedocs.github.io/photoshop-api-docs/#api-Photoshop-document_operations)

We also have an example of replacing a Smart Object within a layer.

[Smart Object Example Code](#sample-1-replacing-a-smartobject)

For better performance, we rasterize our smart objects that are bigger than  2000 pixels * 2000 pixels.

For optimal processing, please make sure the embedded smart object that you want to replace only contains alphanumeric characters in it's name.

### Text layers (`New!`)

The Photoshop APIs currently support creating and editing of Text Layer with different fonts, character styles and paragraph styles. The set of text attributes that can be edited is listed below:
- Edit the text contents
- Change the font (See the `Fonts` section for more info)
- Edit the font size
- Change the font color in the following formats: rgb, cmyk, gray, lab
- Edit the text orientation (horizontal/vertical)
- Edit the paragraph alignment (left, center, right, justify, justifyLeft, justifyCenter, justifyRight)

The API's are documented [here](https://adobedocs.github.io/photoshop-api-docs/#api-Photoshop-document_operations)

Here is an example of making a simple text layer edit.

[Text layer Example Code](#sample-21-making-a-text-layer-edit)

#### Font handling
In order to be able to correctly operate on text layers in the PSD, the corresponding fonts needed for these layers will need to be available when the server is processing the PSD. These include fonts from the following cases:
1. The font that is in the text layer being edited, but the font itself is not being changed
2. If the font in a text layer is being changed to a new font

While referencing fonts in the API request, please ensure that the correct Postscript name for that font is used. Referencing to that font with any other name will result in the API treating this as a missing font.

The Photoshop APIs supports using the following category of fonts:
- Currently Installed Fonts on the server listed [here](SupportedFonts.md)
- Fonts that you are authorized to access via [Adobe Fonts](https://fonts.adobe.com/fonts).
  **Note:** Currently only available for OAuth tokens, JWT service token support is forthcoming.
- Custom/Other Fonts: These are the fonts that are either owned by you or the ones that only you are authorized to use.
  To use a custom font you must include an href to the font in your request. Look at the `options.fonts` section of the API docs for more information.
  For including an href to the font in your request, please ensure the font file name to be in this format: `<font_postscript_name>.<ext>`, when it is being uploaded in your choice of storage. A sample `options.fonts` section will look like so:
  ```json
  {
    "storage": "adobe",
    "href": "/files/OpenSansCondensed-Light.ttf"
  }
  ```
  **Note:** This also applies to any other font present in the document which is not to be found in the first 2 categories above.

Here is an example usage of a custom font
[Custom font](#sample-22-using-a-custom-font-in-a-text-layer)

#### Handle missing fonts in the document.

The API provides two options to control the behavior when there are missing fonts, as the request is being processed:
- Specify a global font which would act as a default font for the current request: The `globalFont` field in the `options` section of the request can be used to specify the full postscript name of this font.
For any textLayer edit/add operation, if the font used specifically for that layer is missing, this font will be used as the default. If the global font itself is missing, then the action to be taken will be dictated by the `manageMissingFonts` options as explained here in the next bullet point.

  **Note**: If using an OAuth integration, Adobe Fonts can be used as a global font as well. If the global font is a custom font, please upload the font to one of the cloud storage types that is supported and specify the `href` and `storage` type in the `options.fonts` section of the request.
- Specify the action to be taken if one or more fonts required for the add/edit operation(s) are missing: The `manageMissingFonts` field in the `options` section of the request can be used to specify this action. It can accept one of the following 2 values:
  - `fail` to force the request/job to fail
  - `useDefault` to use our system designated default font, which is: `ArialMT`

Here is an example usage of `manageMissingFonts` and `globalFont`
[Handle missing fonts](#sample-23-dictating-actions-for-missing-fonts)

#### Limitations
- Most of the text attributes retain their respective original values. There are some attributes however that do not retain their original values. For example (and not limited to): tracking, leading, kerning

### Rendering / Conversions
- Create a new PSD document
- Create a JPEG, TIFF or PNG rendition of various sizes
- Request thumbnail previews of all renderable layers
- Convert between any of the supported filetypes (PSD, JPEG, TIFF, PNG)

Here is an example of creating JPEG and PNG rendtions of a PSD document.
[Render PSD document](#sample-41-a-single-file-input)

### Layer level edits
- General layer edits
  - Edit the layer name/id
  - Toggle the layer locked state
  - Toggle layer visibility
  - Apply bounds
  - Blend options of a layer, including opacity and blend mode
- Add or edit a Fill layer in a document along with Blend modes

#### The add, edit and delete objects

The `/documentOperations` API should primarily be used to make layer and/or document level edits to your PSD and then generate new renditions with the changes. You can pass in a flat array of only the layers that you wish to act upon, in the `options.layers` argument of the request body.
The layer name (or the layer id) will be used by the service to identify the correct layer to operation upon in your PSD.

The `add`, `edit`, `move` and `delete` blocks indicate the action you would like to be taken on a particular layer object. Any layer block passed into the API that is missing one of these attributes will be ignored.
The `add` and `move` blocks must also supply one of the attributes `insertAbove`, `insertBelow`, `insertInto`, `insertTop` or `insertBottom` to indicate where you want to move the layer to. More details on this can be found in the API documentation.

**Note**: Adding a new layer does not require the ID to be included, the service will generate a new layer id for you.

Here is an example of making a layer edit.
[Layer level editing](#sample-31-making-a-simple-edit)

### Compatibility with Photoshop versions

1. The API’s will open any PSD created with Photoshop 1.0 through the current release and this will always be true.
2.  When saving as PSD, the API’s will create PSD’s compatible with the current shipping Photoshop.
3.  In regards to “maximize compatibility” referenced in [https://helpx.adobe.com/photoshop/using/file-formats.html#maximize_compatibility_for_psd_and_psb_files](https://helpx.adobe.com/photoshop/using/file-formats.html#maximize_compatibility_for_psd_and_psb_files)  the API's default to “yes”


## How to use the Photoshop APIs

The API's are documented at https://adobedocs.github.io/photoshop-api-docs/

### Example 1: /smartObject (Replacing smartobject)

The `/smartObject` endpoint can take an input PSD file with an embedded smartobject and can replace with another smartobject.
This API is a simple API developed to ease the smartObject replacement workflow for an user.

#### Sample 1: Replacing a SmartObject
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

#### Sample 2: Creating a SmartObject
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

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request).

### Example 2: Using /documentOperations to edit TextLayer(s)

This example section will provide information and samples to demonstrate the use of `/documentOperations` API to work with Text Layers in particular.
Please refer to the [The add, edit and delete objects](#the-add-edit-and-delete-objects) section for more information on how to apply these operations on a text layer.

#### Sample 2.1: Making a text layer edit

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
        "name": "My Text Layer",
        "type": "textLayer",
        "text": {
            "content": "CHANGED TO NEW TEXT",
            "characterStyles": [{
                "fontSize": 15,
                "orientation": "horizontal",
                "fontColor": {
                    "rgb":{
                       "red":26086,
                       "green":23002,
                       "blue":8224
                    }
                }
            }],
            "paragraphStyles": [{
              "alignment": "right"
            }]
        },
        "edit": {}
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
}'
```

#### Sample 2.2: Using a custom font in a text layer
This will change the font in a text layer named `My Text Layer` to a custom font `VeganStylePersonalUse`.
**Note**: the value for the `fontName` field in the `text.characterStyles` section is the full postscript name of the custom font.

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
    "fonts": {
        storage: "adobe",
        href: "files/pits/input/VeganStylePersonalUse.ttf"
    },
    "layers":[
      {
        "name": "My Text Layer",
        "type": "textLayer",
        "text": {
            "content": "CHANGED TO NEW TEXT WITH NEW FONT",
            "characterStyles": [{
                "fontName": "VeganStylePersonalUse",
                "orientation": "horizontal",
                "fontColor": {
                    "rgb":{
                       "red":26086,
                       "green":23002,
                       "blue":8224
                    }
                }
            }]
        },
        "edit": {}
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
}'
```

#### Sample 2.3: Dictating actions for missing fonts
In this request for example, if `MySampleFont` is not found while processing the request, the system default font (`ArialMT`) will be used as `manageMissingFonts` is set to `useDefault`
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
    "manageMissingFonts": "useDefault",
    "globalFont": "MySampleFont",
    "fonts": {
        storage: "adobe",
        href: "files/pits/input/VeganStylePersonalUse.ttf"
    },
    "layers":[
      {
        "name": "My Text Layer",
        "type": "textLayer",
        "text": {
            "content": "CHANGED TO NEW TEXT WITH NEW FONT",
            "characterStyles": [{
                "fontName": "VeganStylePersonalUse",
                "orientation": "horizontal",
                "fontColor": {
                    "rgb":{
                       "red":26086,
                       "green":23002,
                       "blue":8224
                    }
                }
            }]
        },
        "edit": {}
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
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request).

### Example 3: /documentOperations (Making PSD edits and renders)

The `/documentOperations` API can be used to make layer and/or document level edits to your PSD and then generate new renditions with the changes. You can pass in a flat array of only the layers that you wish to act upon, in the request body's `options.layers` argument.

The layer name (or the layer id) will be used by the service to identify the correct layer to operation upon in your PSD.
Please refer to the [The add, edit and delete objects](#the-add-edit-and-delete-objects) section for more information on how to apply these operations on a layer.

#### Sample 3.1: Making a simple edit
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
}'
```

#### Sample 3.2: Creating new Renditions

See the `/renditionCreate` examples below as the format for the `outputs` object in the request body is identical

#### Sample 3.3: Swapping the image in a smart object layer

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
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request).

### Example 4: /renditionCreate (Generating New Renditions)

The `/renditionsCreate` endpoint can take a number of input PSD files and generate new image renditions or a new PSD

#### Sample 4.1: A single file input

This sample API call will request two different output renditions from our Example.psd input:

- `Example.jpeg` is a new JPEG rendition that has a width of 512 pixels
- `Example.png` is a new fullsize PNG rendition

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
}'
```

A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request).

### Example 5: /documentManifest (Retrieving a PSD manifest)

The `/documentManifest` api can take one or more input PSD's to generate JSON manifest files from. The JSON manifest is the tree representation of all of the layer objects contained in the PSD document. 

#### Sample 5.1: Initiate a job to retrieve a PSD's JSON manifest

Using Example.psd, with the use case of a document stored in Adobe's Creative Cloud, a typical curl call might look like this:

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
A call to this API initiates an asynchronous job and returns a response containing an href. Use the value in the href to poll for the status of the job and the same response will also contain the JSON manifest. This is illustrated in [Example 6](#example-6-fetch-the-status-of-the-job-after-successfully-submitting-a-request) below.

###  Example 6: Fetch the status of the job after successfully submitting a request 
Each of our Photoshop APIs, when invoked, initiates an asynchronous job and returns a response body that contains the href to poll for status of the job.

```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/pie/psdService/status/de2415fb-82c6-47fc-b102-04ad651c5ed4"
        }
    }
}
```
Using the job id returned from the response (ass above) of a successfully submitted API call, you can poll on the corresponding value in the `href` field, to get the status of the job.

```shell
curl -X GET \
  https://image.adobe.io/pie/psdService/status/de2415fb-82c6-47fc-b102-04ad651c5ed4 \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>'
```
#### Sample 6.1 Poll for job status and get the returned manifest (for the /documentManifest API)

Once your job completes successfully (no errors/failures reported), the status response will contain your document's JSON manifest along with other metadata about the input document. The JSON Manifest is further described in the [api docs](https://git.corp.adobe.com/pages/dice/pie-in-the-sky/#api-Documents-document_manifest_status)

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
#### Sample 6.2 Poll for job status and get the results of all other APIs

Once your job completes successfully (no errors/failures reported), this will return a response body containing the job status for each requested output. For the `/renditionCreate` API call in Example 4 in Sample 4.1 as illustrated above, a sample response containing the job status is as shown below: 

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

## Sample Code

The [sample_code](sample_code) folder in this repo contains sample code for calling the Photoshop APIs.

Note that the sample code is covered by the MIT license.


## Current Limitations
There are a few limitations to the APIs you should be aware of ahead of time.  
- Multi-part uploads and downloads are not yet supported
- The `/documentOperations`, `/documentManifest`, `/renditionCreate` and `/smartObject` endpoints only support a single PSD input


The file Example.psd is included in this repository if you'd like to experiment with these example calls on your own.

# ImageCutout

The Image Cutout API is powered by Sensei, Adobe’s Artificial Intelligence Technology, and Photoshop. The API's can identify the main subject of an image and produce two types of outputs. You can create a greyscale [mask](https://en.wikipedia.org/wiki/Layers_(digital_image_editing)#Layer_mask) png file that you can composite onto the original image (or any other).  You can also create a cutout where the mask has already composited onto your original image so that everything except the main subject has been removed.

| Original        | Mask           | Cutout  |
| :-------------: |:-------------:| :-----:|
| ![Alt text](assets/sensei_orig.jpg?raw=true "Original Image") | ![Alt text](assets/sensei_mask.png?raw=true "Mask") | ![Alt text](assets/sensei_cutout.png?raw=true "Original Image") |


## General Workflow

The typical workflow involves making an API POST call to the endpoint https://image.adobe.io/sensei for which the response will contain a link to check the status of the asynchronous job. Making a GET call to this link will return the status of the job and, eventually, the links to your generated output.

## How to use the API's

The API's are documented at [https://adobedocs.github.io/photoshop-api-docs/#api-Sensei](https://adobedocs.github.io/photoshop-api-docs-pre-release/#api-Sensei)

First be sure to follow the instructions in the [Authentication](#authentication) section to get your token.

### Example 1: Initiate a job to create an image cutout

The `/cutout` api takes a single input image to generate your mask or cutout from. Using Example.jpg, with the use case of a document stored in Adobe's Creative Cloud, a typical curl call might look like this:

```shell
curl -X POST \
  https://image.adobe.io/sensei/cutout \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>' \
  -d '{
   "input":{
      "storage":"adobe",
      "href":"/files/images/Example.jpg"
   },
   "output":{
      "storage":"adobe",
      "href":"/files/output/cutout.png",
      "mask":{
         "format":"binary"
      }
   }
}'
```

This initiates an asynchronous job and returns a response containing the href to poll for job status and the JSON manifest.
```json
{
    "_links": {
        "self": {
            "href": "https://image.adobe.io/sensei/status/e3a13d81-a462-4b71-9964-28b2ef34aca7"
        }
    }
}
```


Using the job id returned from the previous call you can poll on the returned `/status` href to get the job status

```shell
curl -X GET \
  https://image.adobe.io/sensei/status/e3a13d81-a462-4b71-9964-28b2ef34aca7 \
  -H 'Authorization: Bearer <auth_token>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <YOUR_API_KEY>'
```

Once the job is complete your successful `/status` response will look similar to the response below; The output will have been placed in your requested location. In the event of failure the errors will be shown instead

```json
{
    "jobID": "e3a13d81-a462-4b71-9964-28b2ef34aca7",
    "status": "succeeded",
    "created": "2020-02-11T21:08:43.789Z",
    "modified": "2020-02-11T21:08:48.492Z",
    "input": "/files/images/Example.jpg",
    "_links": {
        "self": {
            "href": "https://image-stage.adobe.io/sensei/status/e3a13d81-a462-4b71-9964-28b2ef34aca7"
        }
    },
    "output": {
        "storage": "adobe",
        "href": "/files/output/cutout.png",
        "mask": {
            "format": "binary"
        }
    }
}
```

### Example 2: Initiate a job to create an image mask

The workflow is exactly the same as [creating an image cutout](#example-1-initiate-a-job-to-create-an-image-cutout) except you use the `/mask` endpoint instead of `/cutout`.  

# Lightroom APIs

The Adobe Lightroom APIs allow you to make Lightroom-like automated edits to image files.

## General Workflow

The typical workflow involves making an API POST call to the endpoint https://image.adobe.io/lrService/ for which the response will contain a link to check the status of the asynchronous job. Making a GET call to this link will return the status of the job and, eventually, the links to your generated output.

## How to use the Lightroom API's

- The API's are documented at [Lightroom API documentation](https://adobedocs.github.io/photoshop-api-docs#api-Lightroom)
- For more details and examples of using the APIs, please look at [Lightroom API usage details and examples](https://github.com/AdobeDocs/lightroom-api-docs)