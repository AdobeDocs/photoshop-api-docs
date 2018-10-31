# Photoshop API OAuth 2.0 Example: Node.js

This sample app will show you how to use Adobe Photoshop APIs with OAuth 2.0 using Node.js.

After setting up the sample, you will have a Node.js app that:

1. Runs on `https://localhost:8000`
1. Lets a user log in with their Adobe ID
1. Prompts the user to authorize the app with requested scopes
1. Lets the user view their Adobe ID profile information
1. Lets the user get manifest from a Photoshop file


<!-- $ doctoc ./readme.md --title "## Contents" --entryprefix 1. --gitlab --maxlevel 3 -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Adobe IO OAuth2](#adobe-io-oauth2)
- [Technology Used](#technology-used)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
  - [Create an OpenSSL cert](#create-an-openssl-cert)
  - [Install Node.js packages](#install-nodejs-packages)
  - [Set your Adobe API credentials](#set-your-adobe-api-credentials)
  - [Set your sample file path](#set-your-sample-file-path)
- [Usage](#usage)
- [Other Resources](#other-resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Adobe IO OAuth2

You can find a companion repo for this developer guide [on GitHub](https://github.com/adobeio/adobeio-documentation/tree/master/auth/OAuth2.0Endpoints/samples/adobe-auth-node).

Be sure to follow all instructions in the `readme`.

## Technology Used

1. Node.js and the `npm` package manager
1. OpenSSL CLI

## Prerequisites

This guide assumes that you have read the [Adobe OAuth 2.0 Guide for Web](https://github.com/adobeio/adobeio-documentation/blob/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md).

You may have received a `Client ID` (API Key) and `Client Secret` from the Adobe prerelease manager via email. If so, you will those Adobe API credentials. (For this sample app, there is a Redirect URI Pattern that is set up by the Adobe prerelease manager to include `https://localhost:8000`. It should already be configured if you received your `Client ID` and `Client Secret` via email.)

Otherwise, you must have [a registered app on the Adobe I/O Console](https://github.com/adobeio/adobeio-documentation/blob/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md#register-your-application-and-enable-apis) with the following settings:

1. `Platform`: web
1. `Redirect URI Pattern`: `https://localhost:8000`

You may also use `Default redirect URI`: `https://localhost:8000`

## Configuration

The following steps will help you get this sample up and running.

### Create an OpenSSL cert

Adobe OAuth 2.0 requires SSL, so you will need to create a self-signed cert using the OpenSSL CLI. Be sure to run this in the `./server` directory:

```
$ cd server
$ openssl req -x509 -newkey rsa:4096 -nodes -out cert.pem -keyout key.pem -days 365
```

Make sure that after running this command you have the `cert.pem` and `key.pem` files at the top level of the `./server` directory.

### Install Node.js packages

The `package.json` file contains a list of dependencies. Run the following command from the top level directory of the app to install these dependencies:

```
$ npm install
```

### Set your Adobe API credentials

Set your Adobe API credentials as environment variables.

```bash
export PS_ADOBE_API_KEY=<YOUR_API_KEY>
export PS_ADOBE_API_SECRET=<YOUR_API_SECRET>
```

### Set your sample file path

Copy a sample PSD file to the root of your "Creative Cloud Files" folder. You can find sample files [here](../../sample_files). Put the name of your sample file in `./config.json`. 

Note that the root of your "Creative Cloud Files" folder maps to the relative url "/files" in Creative Cloud storage.


```json
    "sampleFile": "files/<your PSD file>",
```


## Usage

After completing the configuration steps, you will need to put a sample Photoshop file in the root of your Creative Cloud Files folder.

Now, start the server:

```
$ npm start
```

To access the app, go to `https://localhost:8000`. Click through the cert warnings in the browser.

The app will write output to the console to show progress. The outputs are numbered so that you can match them up to the corresponding locations in the code.

## Other Resources

- [Adobe Photoshop API Documentation](https://github.com/adobe/photoshop-api-docs)
- [Adobe OAuth 2.0 Guide for Web](https://github.com/adobeio/adobeio-documentation/blob/master/auth/OAuth2.0Endpoints/web-oauth2.0-guide.md)
