define({ "api": [
  {
    "type": "get",
    "url": "https://image.adobe.io/lrService/status/<:jobId>",
    "title": "autostraighten status",
    "version": "1.0.0",
    "description": "<p>Returns the status of a job.</p>",
    "name": "auto-straighten-job-get",
    "group": "Lightroom",
    "parameter": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>The jobId to get status for.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP Usage Template:",
          "content": "GET https://image.adobe.io/lrService/status/<:jobId>  HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key",
          "type": "http"
        },
        {
          "title": "Curl Usage:",
          "content": "curl -H \"authorization: Bearer $token\" -H \"content-type:application/json\" -H \"x-api-key:$x-api-key\" -X GET https://image.adobe.io/lrService/status/<:jobId>",
          "type": "curl"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Pending Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"pending\"\n    }\n  ]\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Succeeded Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"succeeded\",\n      \"_links\":{\n        \"self\":\n          {\n            \"href\":\"/some_project/OUTPUT/photo.jpg\",\n            \"storage\":\"adobe\"\n          }\n      }\n    }\n  ],\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Failed Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"failed\",\n      \"errorDetails\":\"request parameters didn't validate\"\n    }\n  ],\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response Templated:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n    \"jobId\":\"<:jobId>\",\n    \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmm:Z>\",\n    \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmm:Z>\",\n    \"outputs\":[\n       {\n         \"input\":\"<input>\",\n         \"status\":\"<status>\",\n         \"_links\":{\n           \"self\":{\n             \"href\":\"<href>\",\n             \"storage\":\"<storage>\"\n           }\n         }\n       }\n    ],\n    \"_links\":{\n       \"self\":{\n         \"href\":\"https://image.adobe.io/lrService/status/<:jobId>\"\n       }\n    }\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "created",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "modified",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of outputs</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.input",
            "description": "<p>the original input file path</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.status",
            "description": "<p>the child job status</p>  <ul>    <li>pending - request has been accepted and is waiting to start</li>    <li>running - the child job is running</li>    <li>succeeded - the child job has succeeded</li>    <li>failed - the child job has failed</li>  </ul>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "_links",
            "description": "<p>include hrefs that client can use to track status</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "_links.self",
            "description": "<p>the relation type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "_links.self.href",
            "description": "<p>the link to track status</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "outputs._links",
            "description": "<p>include hrefs of the output location</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "outputs._links.self",
            "description": "<p>the relation type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs._links.self.href",
            "description": "<p>the output location</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs._links.self.storage",
            "description": "<p>the storage of output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.details",
            "description": "<p>Description of the exact error that is reported by the requested job. Will appear in the response only if there is an error.</p>"
          }
        ]
      }
    },
    "filename": "docs-src/pre-release/get-autostraighten-create.js",
    "groupTitle": "Lightroom",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/lrService/autoStraighten",
    "title": "autostraighten",
    "version": "1.0.0",
    "description": "<p>Initiates an asynchronous job to auto straighten an image</p>",
    "name": "auto-straighten-post",
    "group": "Lightroom",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "hash",
            "optional": true,
            "field": "options",
            "description": "<p>autoStraighten parameters.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"auto\"",
              "\"full\"",
              "\"level\"",
              "\"vertical\""
            ],
            "optional": false,
            "field": "options.uprightMode",
            "description": "<p>The upright mode to use. If you have the options block, then this is a required field. If options block is not specified, then the appropriate upright mode will automatically be selected.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.constrainCrop",
            "defaultValue": "true",
            "description": "<p>If the straightened image should be constrain cropped, to remove all blank edges around an image.</p>"
          },
          {
            "group": "Request",
            "type": "hash",
            "optional": false,
            "field": "inputs",
            "description": "<p>A hash describing an input image to edit. The input object will be one of 'external', 'adobe', 'azure' or 'dropbox'</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "inputs.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGetURL &lt;<ul></p>    <li>CC Storage path must be prepended with `/files` or `/cloud-content` or `/assets`       <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>       <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>       <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </li>  </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": true,
            "field": "inputs.storage",
            "defaultValue": "adobe",
            "description": "<p>Input storage platforms supported.</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPutURL</p>  <ul>    <li>CC Storage hrefs</li>    <ul>      <li>Can be either a single asset or a folder</li>      <li>Must be prepended with `/files` or `/cloud-content` or `/assets`</li>      <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>      <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>      <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </ul>    <li>Template Tokens: At runtime these two tokens get replaced with their respective values... (FOR \"adobe\" STORED FOLDERS ONLY)</li>    <ul>      <li>$ReqID - replaced with the request id generated by the service</li>      <li>$FileName - replaced with the folder name</li>    </ul>    <li>If the output path is a folder than the Template Tokens will be used to dynamically generate the output file name according to the pattern \"/files/&lt;path&gt;/$ReqID_$FileName.&lt;ext&gt;\"</li>  </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": true,
            "field": "outputs.storage",
            "defaultValue": "adobe",
            "description": "<p>Output storage platforms supported.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/x-adobe-dng\"",
              "\"image/png\""
            ],
            "optional": true,
            "field": "outputs.type",
            "defaultValue": "image/jpeg",
            "description": "<p>outputs.type desired image format.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "outputs.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.quality",
            "defaultValue": "12",
            "description": "<p>Quality of the JPEG outputs (will be ignored for other output types). Ranges from 0 to 12, with 12 as the highest quality.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP Usage Templated:",
          "content": "POST https://image.adobe.io/lrService/autoStraighten HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n    \"storage\": \"<storage>\"\n  },\n  \"options\": {\n    \"uprightMode\": <upright_mode>,\n    \"constrainCrop\": <constrain_crop>\n  },\n  \"outputs\": [\n    {\n      \"href\": \"<presigned_getURL> or <cc_storage_location\",\n      \"storage\": \"<storage>\",\n      \"type\": \"<type>\",\n      \"quality\": \"<quality>\",\n      \"overwrite\": <overwrite>\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Example(CC Asset):",
          "content": "POST https://image.adobe.io/lrService/autoStraighten HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"href\": \"/files/input.jpg\",\n    \"storage\": \"adobe\"\n  },\n  \"options\": {\n    \"uprightMode\": \"full\",\n    \"constrainCrop\": false\n  },\n  \"outputs\": [\n    {\n      \"href\": \"/files/output.jpg\",\n      \"storage\": \"adobe\",\n      \"type\": \"image/jpeg\",\n      \"quality\": 10,\n      \"overwrite\": true\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Example(External Asset):",
          "content": "POST https://image.adobe.io/lrService/autoStraighten HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"href\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n    \"storage\": \"external\"\n  },\n  \"options\": {\n    \"uprightMode\": \"full\",\n    \"constrainCrop\": false\n  },\n  \"outputs\": [\n    {\n      \"href\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_putObject..\",\n      \"storage\": \"external\",\n      \"type\": \"image/jpeg\",\n      \"quality\": 10,\n      \"overwrite\": true\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Curl Usage:",
          "content": "curl -H \"authorization: Bearer $token\" -H \"Content-Type:application/json\" -H \"x-api-key:$x-api-key\" -X POST -d '{\"inputs\":{\"href\":\"<href>\",\"storage\":\"<storage>\"},\"outputs\":[{\"href\":\"<href>\",\"storage\":\"<storage>\",\"type\":\"<type>\",\"quality\": \"<quality>\",\"overwrite\": <overwrite>}]}' https://image.adobe.io/lrService/autoStraighten",
          "type": "curl"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-autostraighten-create.js",
    "groupTitle": "Lightroom",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "json",
            "optional": false,
            "field": "_links",
            "description": "<p>hrefs the client can use to get status of the asynchronous job</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response Templated:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\n{\n  \"_links\": {\n     \"self\" :{\n       \"href\" : \"https://image.adobe.io/lrService/status/<:jobId>\"\n     }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response Example:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\n{\n  \"_links\": {\n     \"self\" :{\n       \"href\" : \"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n     }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Error 4xx",
            "type": "array",
            "optional": true,
            "field": "details",
            "description": "<p>further descriptions of the exact error where <code>details</code> is substituted for a specific issue</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response Templated:",
          "content": "HTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\n{\n  \"type\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<details>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Example FileExistsError:",
          "content": " HTTP/1.1 400 Bad Request\n Content-Type: application/json\n {\n  \"title\": \"Asset Not Found\",\n  \"code\": 404,\n  \"type\": \"FileExistsErrors\",\n  \"details\": {\n    \"reason\": \"Unable to access the input href\",\n    \"name\": \"<path_to_invalid_file>\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Example InputValidationError:",
          "content": "HTTP/1.1 400 Bad Request\nContent-Type: application/json\n{\n  \"type\": \"InputValidationError\",\n  \"code\": 400,\n  \"reason\": [\n     {\n       \"keyword\": \"enum\",\n       \"dataPath\": \".inputs.storage\",\n       \"schemaPath\": \"#/definitions/storage/enum\",\n       \"params\": {\n         \"allowedValues\": [\n           \"adobe\",\n           \"external\",\n           \"lightroom\",\n           \"dropbox\",\n           \"azure\"\n         ]\n       },\n       \"message\": \"should be equal to one of the allowed values\"\n     }\n   ]\n }",
          "type": "json"
        },
        {
          "title": "Example InvalidAuthTokenError:",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n{\n  \"title\": \"Unauthorized\",\n  \"code\": 401,\n  \"type\": \"InvalidAuthTokenError\",\n  \"details\": {\n    \"reason\": \"Unable to access the input href\",\n    \"name\": \"<path_to_invalid_file>\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Example TrialLimitExceededError:",
          "content": " HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "json"
        },
        {
          "title": "Example UndefinedError:",
          "content": "HTTP/1.1 500 Internal Server Error\nContent-Type: application/json\n{\n  \"title\": \"Internal Service Error\",\n  \"code\": 500,\n  \"type\": \"InternalServiceError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/lrService/status/<:jobId>",
    "title": "autotone status",
    "version": "1.0.0",
    "description": "<p>Returns the status of a job.</p>",
    "name": "auto-tone-job-get",
    "group": "Lightroom",
    "parameter": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>The jobId to get status for.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP Usage Template:",
          "content": "GET https://image.adobe.io/lrService/status/<:jobId>  HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key",
          "type": "http"
        },
        {
          "title": "Curl Usage:",
          "content": "curl -H \"authorization: Bearer $token\" -H \"content-type:application/json\" -H \"x-api-key:$x-api-key\" -X GET https://image.adobe.io/lrService/status/<:jobId>",
          "type": "curl"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Pending Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"pending\"\n    }\n  ]\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Succeeded Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"succeeded\",\n      \"_links\":{\n        \"self\":\n          {\n            \"href\":\"/some_project/OUTPUT/photo.jpg\",\n            \"storage\":\"adobe\"\n          }\n      }\n    }\n  ],\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Failed Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"failed\",\n      \"errorDetails\":\"request parameters didn't validate\"\n    }\n  ],\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response Templated:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n    \"jobId\":\"<:jobId>\",\n    \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmm:Z>\",\n    \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmm:Z>\",\n    \"outputs\":[\n       {\n         \"input\":\"<input>\",\n         \"status\":\"<status>\",\n         \"_links\":{\n           \"self\":{\n             \"href\":\"<href>\",\n             \"storage\":\"<storage>\"\n           }\n         }\n       }\n    ],\n    \"_links\":{\n       \"self\":{\n         \"href\":\"https://image.adobe.io/lrService/status/<:jobId>\"\n       }\n    }\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "created",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "modified",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of outputs</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.input",
            "description": "<p>the original input file path</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.status",
            "description": "<p>the child job status</p>  <ul>    <li>pending - request has been accepted and is waiting to start</li>    <li>running - the child job is running</li>    <li>succeeded - the child job has succeeded</li>    <li>failed - the child job has failed</li>  </ul>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "_links",
            "description": "<p>include hrefs that client can use to track status</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "_links.self",
            "description": "<p>the relation type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "_links.self.href",
            "description": "<p>the link to track status</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "outputs._links",
            "description": "<p>include hrefs of the output location</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "outputs._links.self",
            "description": "<p>the relation type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs._links.self.href",
            "description": "<p>the output location</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs._links.self.storage",
            "description": "<p>the storage of output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.details",
            "description": "<p>Description of the exact error that is reported by the requested job. Will appear in the response only if there is an error.</p>"
          }
        ]
      }
    },
    "filename": "docs-src/pre-release/get-autotone-create.js",
    "groupTitle": "Lightroom",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/lrService/autoTone",
    "title": "autotone",
    "version": "1.0.0",
    "description": "<p>Initiates an asynchronous job to auto tone an image</p>",
    "name": "auto-tone-post",
    "group": "Lightroom",
    "parameter": {
      "examples": [
        {
          "title": "HTTP Usage Templated:",
          "content": "POST https://image.adobe.io/lrService/autoTone HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n    \"storage\": \"<storage>\"\n  },\n  \"outputs\": [\n    {\n      \"href\": \"<presigned_getURL> or <cc_storage_location\",\n      \"storage\": \"<storage>\",\n      \"type\": \"<type>\",\n      \"quality\": \"<quality>\",\n      \"overwrite\": <overwrite>\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Example(CC Asset):",
          "content": "POST https://image.adobe.io/lrService/autoTone HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"href\": \"/files/input.jpg\",\n    \"storage\": \"adobe\"\n  },\n  \"outputs\": [\n    {\n      \"href\": \"/files/output.jpg\",\n      \"storage\": \"adobe\",\n      \"type\": \"image/jpeg\",\n      \"quality\": 10,\n      \"overwrite\": true\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Example(External Asset):",
          "content": "POST https://image.adobe.io/lrService/autoTone HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"href\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n    \"storage\": \"external\"\n  },\n  \"outputs\": [\n    {\n      \"href\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_putObject..\",\n      \"storage\": \"external\",\n      \"type\": \"image/jpeg\",\n      \"quality\": 10,\n      \"overwrite\": true\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Curl Usage:",
          "content": "curl -H \"authorization: Bearer $token\" -H \"Content-Type:application/json\" -H \"x-api-key:$x-api-key\" -X POST -d '{\"inputs\":{\"href\":\"<href>\",\"storage\":\"<storage>\"},\"outputs\":[{\"href\":\"<href>\",\"storage\":\"<storage>\",\"type\":\"<type>\",\"quality\": \"<quality>\",\"overwrite\": <overwrite>}]}' https://image.adobe.io/lrService/autoTone",
          "type": "curl"
        }
      ],
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "hash",
            "optional": false,
            "field": "inputs",
            "description": "<p>A hash describing an input image to edit. The input object will be one of 'external', 'adobe', 'azure' or 'dropbox'</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "inputs.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGetURL &lt;<ul></p>    <li>CC Storage path must be prepended with `/files` or `/cloud-content` or `/assets`       <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>       <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>       <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </li>  </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": true,
            "field": "inputs.storage",
            "defaultValue": "adobe",
            "description": "<p>Input storage platforms supported.</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPutURL</p>  <ul>    <li>CC Storage hrefs</li>    <ul>      <li>Can be either a single asset or a folder</li>      <li>Must be prepended with `/files` or `/cloud-content` or `/assets`</li>      <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>      <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>      <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </ul>    <li>Template Tokens: At runtime these two tokens get replaced with their respective values... (FOR \"adobe\" STORED FOLDERS ONLY)</li>    <ul>      <li>$ReqID - replaced with the request id generated by the service</li>      <li>$FileName - replaced with the folder name</li>    </ul>    <li>If the output path is a folder than the Template Tokens will be used to dynamically generate the output file name according to the pattern \"/files/&lt;path&gt;/$ReqID_$FileName.&lt;ext&gt;\"</li>  </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": true,
            "field": "outputs.storage",
            "defaultValue": "adobe",
            "description": "<p>Output storage platforms supported.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/x-adobe-dng\"",
              "\"image/png\""
            ],
            "optional": true,
            "field": "outputs.type",
            "defaultValue": "image/jpeg",
            "description": "<p>outputs.type desired image format.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "outputs.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.quality",
            "defaultValue": "12",
            "description": "<p>Quality of the JPEG outputs (will be ignored for other output types). Ranges from 0 to 12, with 12 as the highest quality.</p>"
          }
        ]
      }
    },
    "filename": "docs-src/pre-release/post-autotone-create.js",
    "groupTitle": "Lightroom",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "json",
            "optional": false,
            "field": "_links",
            "description": "<p>hrefs the client can use to get status of the asynchronous job</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response Templated:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\n{\n  \"_links\": {\n     \"self\" :{\n       \"href\" : \"https://image.adobe.io/lrService/status/<:jobId>\"\n     }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response Example:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\n{\n  \"_links\": {\n     \"self\" :{\n       \"href\" : \"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n     }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Error 4xx",
            "type": "array",
            "optional": true,
            "field": "details",
            "description": "<p>further descriptions of the exact error where <code>details</code> is substituted for a specific issue</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response Templated:",
          "content": "HTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\n{\n  \"type\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<details>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Example FileExistsError:",
          "content": " HTTP/1.1 400 Bad Request\n Content-Type: application/json\n {\n  \"title\": \"Asset Not Found\",\n  \"code\": 404,\n  \"type\": \"FileExistsErrors\",\n  \"details\": {\n    \"reason\": \"Unable to access the input href\",\n    \"name\": \"<path_to_invalid_file>\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Example InputValidationError:",
          "content": "HTTP/1.1 400 Bad Request\nContent-Type: application/json\n{\n  \"type\": \"InputValidationError\",\n  \"code\": 400,\n  \"reason\": [\n     {\n       \"keyword\": \"enum\",\n       \"dataPath\": \".inputs.storage\",\n       \"schemaPath\": \"#/definitions/storage/enum\",\n       \"params\": {\n         \"allowedValues\": [\n           \"adobe\",\n           \"external\",\n           \"lightroom\",\n           \"dropbox\",\n           \"azure\"\n         ]\n       },\n       \"message\": \"should be equal to one of the allowed values\"\n     }\n   ]\n }",
          "type": "json"
        },
        {
          "title": "Example InvalidAuthTokenError:",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n{\n  \"title\": \"Unauthorized\",\n  \"code\": 401,\n  \"type\": \"InvalidAuthTokenError\",\n  \"details\": {\n    \"reason\": \"Unable to access the input href\",\n    \"name\": \"<path_to_invalid_file>\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Example TrialLimitExceededError:",
          "content": " HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "json"
        },
        {
          "title": "Example UndefinedError:",
          "content": "HTTP/1.1 500 Internal Server Error\nContent-Type: application/json\n{\n  \"title\": \"Internal Service Error\",\n  \"code\": 500,\n  \"type\": \"InternalServiceError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/lrService/status/<:jobId>",
    "title": "edit status",
    "version": "1.0.0",
    "description": "<p>Returns the status of a job.</p>",
    "name": "edit-job-get",
    "group": "Lightroom",
    "parameter": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>The jobId to get status for.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP Usage Template:",
          "content": "GET https://image.adobe.io/lrService/status/<:jobId>  HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key",
          "type": "http"
        },
        {
          "title": "Curl Usage:",
          "content": "curl -H \"authorization: Bearer $token\" -H \"content-type:application/json\" -H \"x-api-key:$x-api-key\" -X GET https://image.adobe.io/lrService/status/<:jobId>",
          "type": "curl"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Pending Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"pending\"\n    }\n  ]\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Succeeded Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"succeeded\",\n      \"_links\":{\n        \"self\":\n          {\n            \"href\":\"/some_project/OUTPUT/photo.jpg\",\n            \"storage\":\"adobe\"\n          }\n      }\n    }\n  ],\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Failed Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"failed\",\n      \"errorDetails\":\"request parameters didn't validate\"\n    }\n  ],\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response Templated:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n    \"jobId\":\"<:jobId>\",\n    \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmm:Z>\",\n    \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmm:Z>\",\n    \"outputs\":[\n       {\n         \"input\":\"<input>\",\n         \"status\":\"<status>\",\n         \"_links\":{\n           \"self\":{\n             \"href\":\"<href>\",\n             \"storage\":\"<storage>\"\n           }\n         }\n       }\n    ],\n    \"_links\":{\n       \"self\":{\n         \"href\":\"https://image.adobe.io/lrService/status/<:jobId>\"\n       }\n    }\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "created",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "modified",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of outputs</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.input",
            "description": "<p>the original input file path</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.status",
            "description": "<p>the child job status</p>  <ul>    <li>pending - request has been accepted and is waiting to start</li>    <li>running - the child job is running</li>    <li>succeeded - the child job has succeeded</li>    <li>failed - the child job has failed</li>  </ul>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "_links",
            "description": "<p>include hrefs that client can use to track status</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "_links.self",
            "description": "<p>the relation type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "_links.self.href",
            "description": "<p>the link to track status</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "outputs._links",
            "description": "<p>include hrefs of the output location</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "outputs._links.self",
            "description": "<p>the relation type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs._links.self.href",
            "description": "<p>the output location</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs._links.self.storage",
            "description": "<p>the storage of output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.details",
            "description": "<p>Description of the exact error that is reported by the requested job. Will appear in the response only if there is an error.</p>"
          }
        ]
      }
    },
    "filename": "docs-src/pre-release/get-edit-create.js",
    "groupTitle": "Lightroom",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/lrService/edit",
    "title": "edit",
    "version": "1.0.0",
    "description": "<p>Initiates an asynchronous job to apply a set of edit parameters on an image</p>",
    "name": "edit-post",
    "group": "Lightroom",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "hash",
            "optional": false,
            "field": "inputs",
            "description": "<p>A hash describing an input image to edit.</p>"
          },
          {
            "group": "Request",
            "type": "hash",
            "optional": false,
            "field": "inputs.source",
            "description": "<p>A hash describing an input image to edit. The input object will be one of 'external', 'adobe', 'azure' or 'dropbox'</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "inputs.source.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGetURL</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": true,
            "field": "inputs.source.storage",
            "defaultValue": "adobe",
            "description": "<p>is the asset stored on Adobe's cloud or an external service (like AWS S3)</p>"
          },
          {
            "group": "Request",
            "type": "hash",
            "optional": false,
            "field": "options",
            "description": "<p>A hash describing the list of edits to apply.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "inputs.edit.Contrast",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "inputs.edit.Saturation",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "inputs.edit.VignetteAmount",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "inputs.edit.Vibrance",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "inputs.edit.Highlights",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "inputs.edit.Shadows",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "inputs.edit.Whites",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "inputs.edit.Blacks",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "inputs.edit.Clarity",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "inputs.edit.Dehaze",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "inputs.edit.Texture",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0...150"
            ],
            "optional": false,
            "field": "inputs.edit.Sharpness",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0...100"
            ],
            "optional": false,
            "field": "inputs.edit.ColorNoiseReduction",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0...100"
            ],
            "optional": false,
            "field": "inputs.edit.NoiseReduction",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0...100"
            ],
            "optional": false,
            "field": "inputs.edit.SharpenDetail",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0...10"
            ],
            "optional": false,
            "field": "inputs.edit.SharpenEdgeMasking",
            "description": ""
          },
          {
            "group": "Request",
            "type": "real",
            "allowedValues": [
              "-5.00...5.00"
            ],
            "optional": false,
            "field": "inputs.edit.Exposure",
            "description": ""
          },
          {
            "group": "Request",
            "type": "real",
            "allowedValues": [
              "0.5...3.0"
            ],
            "optional": false,
            "field": "inputs.edit.SharpenRadius",
            "description": ""
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"As Shot\"",
              "\"Auto\"",
              "\"Cloudy\"",
              "\"Custom\"",
              "\"Daylight\"",
              "\"Flash\"",
              "\"Fluorescent\"",
              "\"Shade\"",
              "\"Tungsten\""
            ],
            "optional": false,
            "field": "inputs.edit.WhiteBalance",
            "description": ""
          },
          {
            "group": "Request",
            "type": "array",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPutURL</p>  <ul>    <li>CC Storage hrefs</li>    <ul>      <li>Can be either a single asset or a folder</li>      <li>Must be prepended with `/files` or `/cloud-content` or `/assets`</li>      <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>      <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>      <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </ul>    <li>Template Tokens: At runtime these two tokens get replaced with their respective values... (FOR \"adobe\" STORED FOLDERS ONLY)</li>    <ul>      <li>$ReqID - replaced with the request id generated by the service</li>      <li>$FileName - replaced with the folder name</li>    </ul>    <li>If the output path is a folder than the Template Tokens will be used to dynamically generate the output file name according to the pattern \"/files/&lt;path&gt;/$ReqID_$FileName.&lt;ext&gt;\"</li>  </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": true,
            "field": "outputs.storage",
            "defaultValue": "adobe",
            "description": "<p>Output storage platforms supported.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/x-adobe-dng\"",
              "\"image/png\""
            ],
            "optional": true,
            "field": "outputs.type",
            "defaultValue": "image/jpeg",
            "description": "<p>outputs.type desired image format.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "outputs.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.quality",
            "defaultValue": "12",
            "description": "<p>Quality of the JPEG outputs (will be ignored for other output types). Ranges from 0 to 12, with 12 as the highest quality.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP Usage Templated:",
          "content": "POST https://image.adobe.io/lrService/edit HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"source\": {\n      \"href\": \"/files/input.jpg\",\n      \"storage\": \"adobe\"\n    }\n  },\n  \"options\": {\n    \"Brightness\": <-100 to 100>,\n    \"Exposure\": <-5.00 to 5.00>,\n    \"Contrast\": <-100 to 100>,\n    \"WhiteBalance\": <\"As Shot\", \"Auto\", \"Cloudy\", \"Custom\", \"Daylight\", \"Flash\", \"Fluorescent\", \"Shade\", \"Tungsten\">,\n    \"Saturation\": <-100 to 100>,\n    \"Sharpness\": <0 to 150>,\n    \"ColorNoiseReduction\": <0 to 100>,\n    \"NoiseReduction\": <0 to 100>,\n    \"VignetteAmount\": <-100 to 100>,\n    \"Vibrance\": <-100 to 100>,\n    \"Highlights\": <-100 to 100>,\n    \"Shadows\": <-100 to 100>,\n    \"Whites\": <-100 to 100>,\n    \"Blacks\": <-100 to 100>,\n    \"Clarity\": <-100 to 100>,\n    \"Dehaze\": <-100 to 100>,\n    \"SharpenRadius\": <0.5 to 3.0>,\n    \"SharpenDetail\": <0 to 100>,\n    \"SharpenEdgeMasking\": <0 to 10>\n  },\n  \"outputs\": [\n    {\n      \"href\": \"<presigned_getURL> or <cc_storage_location\",\n      \"storage\": \"<storage>\",\n      \"type\": \"<type>\",\n      \"quality\": \"<quality>\",\n      \"overwrite\":<overwrite>\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Example(CC Asset):",
          "content": "POST https://image.adobe.io/lrService/edit HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"source\": {\n      \"href\": \"/files/input.jpg\",\n      \"storage\": \"adobe\"\n    }\n  },\n  \"options\": {\n    \"Exposure\": -5.00,\n    \"Contrast\": -100,\n    \"Sharpness\": 10,\n    \"WhiteBalance\": \"As Shot\",\n    \"Saturation\": -100,\n    \"Sharpness\": 20,\n    \"ColorNoiseReduction\": 15,\n    \"NoiseReduction\": 15,\n    \"VignetteAmount\": -100,\n    \"Vibrance\": -100,\n    \"Highlights\": -100,\n    \"Shadows\": -100,\n    \"Whites\": -100,\n    \"Blacks\": -100,\n    \"Clarity\": -100,\n    \"Dehaze\": -100,\n    \"SharpenRadius\": 1.1,\n    \"SharpenDetail\": 0,\n    \"SharpenEdgeMasking\": 0\n  },\n  \"outputs\": [\n    {\n      \"href\": \"/files/output.jpg\",\n      \"storage\": \"adobe\",\n      \"type\": \"image/jpeg\",\n      \"quality\": 6,\n      \"overwrite\": true\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Example(External Asset):",
          "content": "POST https://image.adobe.io/lrService/edit HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"source\": {\n      \"href\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n      \"storage\": \"external\"\n    }\n  },\n  \"options\": {\n    \"Exposure\": -5.00,\n    \"Contrast\": -100,\n    \"Sharpness\": 10,\n    \"WhiteBalance\": \"As Shot\",\n    \"Saturation\": -100,\n    \"Sharpness\": 20,\n    \"ColorNoiseReduction\": 15,\n    \"NoiseReduction\": 15,\n    \"VignetteAmount\": -100,\n    \"Vibrance\": -100,\n    \"Highlights\": -100,\n    \"Shadows\": -100,\n    \"Whites\": -100,\n    \"Blacks\": -100,\n    \"Clarity\": -100,\n    \"Dehaze\": -100,\n    \"SharpenRadius\": 1.1,\n    \"SharpenDetail\": 0,\n    \"SharpenEdgeMasking\": 0\n  },\n  \"outputs\": [\n    {\n      \"href\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_putObject..\",\n      \"storage\": \"external\",\n      \"type\": \"image/jpeg\",\n      \"quality\": 6,\n      \"overwrite\": true\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Curl Usage:",
          "content": "curl -H \"authorization: Bearer $token\" -H \"Content-Type:application/json\" -H \"x-api-key:$x-api-key\" -X POST -d '{\"inputs\":{\"href\":\"<href>\",\"storage\":\"<storage>\"}, \"options\": \"<options>\", \"outputs\":[{\"href\":\"<href>\",\"storage\":\"<storage>\",\"type\":\"<type>\",\"quality\": \"<quality>\",\"overwrite\":<overwrite>}]}' https://image.adobe.io/lrService/edit",
          "type": "curl"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-edit-create.js",
    "groupTitle": "Lightroom",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "json",
            "optional": false,
            "field": "_links",
            "description": "<p>hrefs the client can use to get status of the asynchronous job</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response Templated:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\n{\n  \"_links\": {\n     \"self\" :{\n       \"href\" : \"https://image.adobe.io/lrService/status/<:jobId>\"\n     }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response Example:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\n{\n  \"_links\": {\n     \"self\" :{\n       \"href\" : \"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n     }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Error 4xx",
            "type": "array",
            "optional": true,
            "field": "details",
            "description": "<p>further descriptions of the exact error where <code>details</code> is substituted for a specific issue</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response Templated:",
          "content": "HTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\n{\n  \"type\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<details>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Example FileExistsError:",
          "content": " HTTP/1.1 400 Bad Request\n Content-Type: application/json\n {\n  \"title\": \"Asset Not Found\",\n  \"code\": 404,\n  \"type\": \"FileExistsErrors\",\n  \"details\": {\n    \"reason\": \"Unable to access the input href\",\n    \"name\": \"<path_to_invalid_file>\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Example InputValidationError:",
          "content": "HTTP/1.1 400 Bad Request\nContent-Type: application/json\n{\n  \"type\": \"InputValidationError\",\n  \"code\": 400,\n  \"reason\": [\n     {\n       \"keyword\": \"enum\",\n       \"dataPath\": \".inputs.storage\",\n       \"schemaPath\": \"#/definitions/storage/enum\",\n       \"params\": {\n         \"allowedValues\": [\n           \"adobe\",\n           \"external\",\n           \"lightroom\",\n           \"dropbox\",\n           \"azure\"\n         ]\n       },\n       \"message\": \"should be equal to one of the allowed values\"\n     }\n   ]\n }",
          "type": "json"
        },
        {
          "title": "Example InvalidAuthTokenError:",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n{\n  \"title\": \"Unauthorized\",\n  \"code\": 401,\n  \"type\": \"InvalidAuthTokenError\",\n  \"details\": {\n    \"reason\": \"Unable to access the input href\",\n    \"name\": \"<path_to_invalid_file>\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Example TrialLimitExceededError:",
          "content": " HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "json"
        },
        {
          "title": "Example UndefinedError:",
          "content": "HTTP/1.1 500 Internal Server Error\nContent-Type: application/json\n{\n  \"title\": \"Internal Service Error\",\n  \"code\": 500,\n  \"type\": \"InternalServiceError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/lrService/status/<:jobId>",
    "title": "presets status",
    "version": "1.0.0",
    "description": "<p>Returns the status of a job.</p>",
    "name": "presets-job-get",
    "group": "Lightroom",
    "parameter": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>The jobId to get status for.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP Usage Template:",
          "content": "GET https://image.adobe.io/lrService/status/<:jobId>  HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key",
          "type": "http"
        },
        {
          "title": "Curl Usage:",
          "content": "curl -H \"authorization: Bearer $token\" -H \"content-type:application/json\" -H \"x-api-key:$x-api-key\" -X GET https://image.adobe.io/lrService/status/<:jobId>",
          "type": "curl"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Pending Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"pending\"\n    }\n  ]\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Succeeded Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"succeeded\",\n      \"_links\":{\n        \"self\":\n          {\n            \"href\":\"/some_project/OUTPUT/photo.jpg\",\n            \"storage\":\"adobe\"\n          }\n      }\n    }\n  ],\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Failed Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"failed\",\n      \"errorDetails\":\"request parameters didn't validate\"\n    }\n  ],\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response Templated:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n    \"jobId\":\"<:jobId>\",\n    \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmm:Z>\",\n    \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmm:Z>\",\n    \"outputs\":[\n       {\n         \"input\":\"<input>\",\n         \"status\":\"<status>\",\n         \"_links\":{\n           \"self\":{\n             \"href\":\"<href>\",\n             \"storage\":\"<storage>\"\n           }\n         }\n       }\n    ],\n    \"_links\":{\n       \"self\":{\n         \"href\":\"https://image.adobe.io/lrService/status/<:jobId>\"\n       }\n    }\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "created",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "modified",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of outputs</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.input",
            "description": "<p>the original input file path</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.status",
            "description": "<p>the child job status</p>  <ul>    <li>pending - request has been accepted and is waiting to start</li>    <li>running - the child job is running</li>    <li>succeeded - the child job has succeeded</li>    <li>failed - the child job has failed</li>  </ul>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "_links",
            "description": "<p>include hrefs that client can use to track status</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "_links.self",
            "description": "<p>the relation type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "_links.self.href",
            "description": "<p>the link to track status</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "outputs._links",
            "description": "<p>include hrefs of the output location</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "outputs._links.self",
            "description": "<p>the relation type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs._links.self.href",
            "description": "<p>the output location</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs._links.self.storage",
            "description": "<p>the storage of output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.details",
            "description": "<p>Description of the exact error that is reported by the requested job. Will appear in the response only if there is an error.</p>"
          }
        ]
      }
    },
    "filename": "docs-src/pre-release/get-presets-create.js",
    "groupTitle": "Lightroom",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/lrService/presets",
    "title": "presets",
    "version": "1.0.0",
    "description": "<p>Initiates an asynchronous job to apply a preset on an image</p>",
    "name": "presets-post",
    "group": "Lightroom",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "hash",
            "optional": false,
            "field": "inputs",
            "description": "<p>A hash describing an input image to edit and the presets to apply.</p>"
          },
          {
            "group": "Request",
            "type": "hash",
            "optional": false,
            "field": "inputs.source",
            "description": "<p>A hash describing an input image to edit. The input object will be one of 'external', 'adobe', 'azure' or 'dropbox'</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "inputs.source.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGetURL</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": true,
            "field": "inputs.source.storage",
            "defaultValue": "adobe",
            "description": "<p>is the asset stored on Adobe's cloud or an external service (like AWS S3)</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "optional": false,
            "field": "inputs.presets",
            "description": "<p>An array describing the list of presets to apply. The preset objects will either be one of 'external', 'adobe', 'azure' or 'dropbox'</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "inputs.presets.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGetURL</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": true,
            "field": "inputs.presets.storage",
            "defaultValue": "adobe",
            "description": "<p>is the asset stored on Adobe's cloud or an external service (like AWS S3)</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPutURL</p>  <ul>    <li>CC Storage hrefs</li>    <ul>      <li>Can be either a single asset or a folder</li>      <li>Must be prepended with `/files` or `/cloud-content` or `/assets`</li>      <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>      <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>      <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </ul>    <li>Template Tokens: At runtime these two tokens get replaced with their respective values... (FOR \"adobe\" STORED FOLDERS ONLY)</li>    <ul>      <li>$ReqID - replaced with the request id generated by the service</li>      <li>$FileName - replaced with the folder name</li>    </ul>    <li>If the output path is a folder than the Template Tokens will be used to dynamically generate the output file name according to the pattern \"/files/&lt;path&gt;/$ReqID_$FileName.&lt;ext&gt;\"</li>  </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": true,
            "field": "outputs.storage",
            "defaultValue": "adobe",
            "description": "<p>Output storage platforms supported.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/x-adobe-dng\"",
              "\"image/png\""
            ],
            "optional": true,
            "field": "outputs.type",
            "defaultValue": "image/jpeg",
            "description": "<p>outputs.type desired image format.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "outputs.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.quality",
            "defaultValue": "12",
            "description": "<p>Quality of the JPEG outputs (will be ignored for other output types). Ranges from 0 to 12, with 12 as the highest quality.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP Usage Templated:",
          "content": "POST https://image.adobe.io/lrService/presets HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"source\": {\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\": \"<storage>\"\n    },\n    \"presets\": [\n      {\n        \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n        \"storage\": \"<storage>\"\n      }\n    ]\n  },\n  \"outputs\": [\n    {\n      \"href\": \"<presigned_getURL> or <cc_storage_location\",\n      \"storage\": \"<storage>\",\n      \"type\": \"<type>\",\n      \"quality\": \"<quality>\",\n      \"overwrite\": <overwrite>\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Example(CC Asset):",
          "content": "POST https://image.adobe.io/lrService/presets HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"source\": {\n      \"href\": \"/files/input.jpg\",\n      \"storage\": \"adobe\"\n    },\n    \"presets\": [\n      {\n        \"href\": \"files/acr/preset.xmp\",\n        \"storage\": \"adobe\"\n      }\n    ]\n  },\n  \"outputs\": [\n    {\n      \"href\": \"/files/output.jpg\",\n      \"storage\": \"adobe\",\n      \"type\": \"image/jpeg\",\n      \"quality\": 6,\n      \"overwrite\": true\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Example(External Asset):",
          "content": "POST https://image.adobe.io/lrService/presets HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"source\": {\n      \"href\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n      \"storage\": \"external\"\n    },\n    \"presets\": [\n      {\n        \"href\":  \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n        \"storage\": \"external\"\n      }\n    ]\n  },\n  \"outputs\": [\n    {\n      \"href\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_putObject..\",\n      \"storage\": \"external\",\n      \"type\": \"image/jpeg\",\n      \"quality\": 6,\n      \"overwrite\": true\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Curl Usage:",
          "content": "curl -H \"authorization: Bearer $token\" -H \"Content-Type:application/json\" -H \"x-api-key:$x-api-key\" -X POST -d '{\"inputs\": {\"source\": {\"href\":\"<href>\",\"storage\":\"<storage>\"}, \"presets\": [{\"href\":\"<href>\",\"storage\":\"<storage>\"}]},\"outputs\":[{\"href\":\"<href>\",\"storage\":\"<storage>\",\"type\":\"<type>\",\"quality\": \"<quality>\",\"overwrite\": <overwrite>}]}' https://image.adobe.io/lrService/presets",
          "type": "curl"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-presets-create.js",
    "groupTitle": "Lightroom",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "json",
            "optional": false,
            "field": "_links",
            "description": "<p>hrefs the client can use to get status of the asynchronous job</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response Templated:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\n{\n  \"_links\": {\n     \"self\" :{\n       \"href\" : \"https://image.adobe.io/lrService/status/<:jobId>\"\n     }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response Example:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\n{\n  \"_links\": {\n     \"self\" :{\n       \"href\" : \"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n     }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Error 4xx",
            "type": "array",
            "optional": true,
            "field": "details",
            "description": "<p>further descriptions of the exact error where <code>details</code> is substituted for a specific issue</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response Templated:",
          "content": "HTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\n{\n  \"type\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<details>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Example FileExistsError:",
          "content": " HTTP/1.1 400 Bad Request\n Content-Type: application/json\n {\n  \"title\": \"Asset Not Found\",\n  \"code\": 404,\n  \"type\": \"FileExistsErrors\",\n  \"details\": {\n    \"reason\": \"Unable to access the input href\",\n    \"name\": \"<path_to_invalid_file>\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Example InputValidationError:",
          "content": "HTTP/1.1 400 Bad Request\nContent-Type: application/json\n{\n  \"type\": \"InputValidationError\",\n  \"code\": 400,\n  \"reason\": [\n     {\n       \"keyword\": \"enum\",\n       \"dataPath\": \".inputs.storage\",\n       \"schemaPath\": \"#/definitions/storage/enum\",\n       \"params\": {\n         \"allowedValues\": [\n           \"adobe\",\n           \"external\",\n           \"lightroom\",\n           \"dropbox\",\n           \"azure\"\n         ]\n       },\n       \"message\": \"should be equal to one of the allowed values\"\n     }\n   ]\n }",
          "type": "json"
        },
        {
          "title": "Example InvalidAuthTokenError:",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n{\n  \"title\": \"Unauthorized\",\n  \"code\": 401,\n  \"type\": \"InvalidAuthTokenError\",\n  \"details\": {\n    \"reason\": \"Unable to access the input href\",\n    \"name\": \"<path_to_invalid_file>\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Example TrialLimitExceededError:",
          "content": " HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "json"
        },
        {
          "title": "Example UndefinedError:",
          "content": "HTTP/1.1 500 Internal Server Error\nContent-Type: application/json\n{\n  \"title\": \"Internal Service Error\",\n  \"code\": 500,\n  \"type\": \"InternalServiceError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/lrService/status/<:jobId>",
    "title": "xmp status",
    "version": "1.0.0",
    "description": "<p>Returns the status of a job.</p>",
    "name": "xmp-job-get",
    "group": "Lightroom",
    "parameter": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>The jobId to get status for.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP Usage Template:",
          "content": "GET https://image.adobe.io/lrService/status/<:jobId>  HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key",
          "type": "http"
        },
        {
          "title": "Curl Usage:",
          "content": "curl -H \"authorization: Bearer $token\" -H \"content-type:application/json\" -H \"x-api-key:$x-api-key\" -X GET https://image.adobe.io/lrService/status/<:jobId>",
          "type": "curl"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Pending Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"pending\"\n    }\n  ]\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Succeeded Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"succeeded\",\n      \"_links\":{\n        \"self\":\n          {\n            \"href\":\"/some_project/OUTPUT/photo.jpg\",\n            \"storage\":\"adobe\"\n          }\n      }\n    }\n  ],\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Failed Job Example:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n  \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"created\":\"2018-01-04T12:57:15.12345:Z\",\n  \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n  \"outputs\":[\n    {\n      \"input\":\"/some_project/photo.jpg\",\n      \"status\":\"failed\",\n      \"errorDetails\":\"request parameters didn't validate\"\n    }\n  ],\n  \"_links\":{\n    \"self\":{\n      \"href\":\"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n    }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response Templated:",
          "content": "HTTP/1.1 202\nContent-Type: application/json\n{\n    \"jobId\":\"<:jobId>\",\n    \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmm:Z>\",\n    \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmm:Z>\",\n    \"outputs\":[\n       {\n         \"input\":\"<input>\",\n         \"status\":\"<status>\",\n         \"_links\":{\n           \"self\":{\n             \"href\":\"<href>\",\n             \"storage\":\"<storage>\"\n           }\n         }\n       }\n    ],\n    \"_links\":{\n       \"self\":{\n         \"href\":\"https://image.adobe.io/lrService/status/<:jobId>\"\n       }\n    }\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "created",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "modified",
            "description": "<p>timestamp</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of outputs</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.input",
            "description": "<p>the original input file path</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.status",
            "description": "<p>the child job status</p>  <ul>    <li>pending - request has been accepted and is waiting to start</li>    <li>running - the child job is running</li>    <li>succeeded - the child job has succeeded</li>    <li>failed - the child job has failed</li>  </ul>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "_links",
            "description": "<p>include hrefs that client can use to track status</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "_links.self",
            "description": "<p>the relation type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "_links.self.href",
            "description": "<p>the link to track status</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "outputs._links",
            "description": "<p>include hrefs of the output location</p>"
          },
          {
            "group": "Success 202",
            "type": "hash",
            "optional": false,
            "field": "outputs._links.self",
            "description": "<p>the relation type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs._links.self.href",
            "description": "<p>the output location</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs._links.self.storage",
            "description": "<p>the storage of output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.details",
            "description": "<p>Description of the exact error that is reported by the requested job. Will appear in the response only if there is an error.</p>"
          }
        ]
      }
    },
    "filename": "docs-src/pre-release/get-xmp-create.js",
    "groupTitle": "Lightroom",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/lrService/xmp",
    "title": "xmp",
    "version": "1.0.0",
    "description": "<p>Initiates an asynchronous job to apply an XMP setting to an image</p>",
    "name": "xmp-post",
    "group": "Lightroom",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "hash",
            "optional": false,
            "field": "inputs",
            "description": "<p>A hash describing an input image to edit.</p>"
          },
          {
            "group": "Request",
            "type": "hash",
            "optional": false,
            "field": "inputs.source",
            "description": "<p>A hash describing an input image to edit. The input object will be one of 'external', 'adobe', 'azure' or 'dropbox'</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "inputs.source.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGetURL</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": true,
            "field": "inputs.source.storage",
            "defaultValue": "adobe",
            "description": "<p>is the asset stored on Adobe's cloud or an external service (like AWS S3)</p>"
          },
          {
            "group": "Request",
            "type": "hash",
            "optional": false,
            "field": "options",
            "description": "<p>a hash describing the xmp to apply.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.xmp",
            "description": "<p>The XMP to apply.</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPutURL</p>  <ul>    <li>CC Storage hrefs</li>    <ul>      <li>Can be either a single asset or a folder</li>      <li>Must be prepended with `/files` or `/cloud-content` or `/assets`</li>      <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>      <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>      <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </ul>    <li>Template Tokens: At runtime these two tokens get replaced with their respective values... (FOR \"adobe\" STORED FOLDERS ONLY)</li>    <ul>      <li>$ReqID - replaced with the request id generated by the service</li>      <li>$FileName - replaced with the folder name</li>    </ul>    <li>If the output path is a folder than the Template Tokens will be used to dynamically generate the output file name according to the pattern \"/files/&lt;path&gt;/$ReqID_$FileName.&lt;ext&gt;\"</li>  </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": true,
            "field": "outputs.storage",
            "defaultValue": "adobe",
            "description": "<p>Output storage platforms supported.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/x-adobe-dng\"",
              "\"image/png\""
            ],
            "optional": true,
            "field": "outputs.type",
            "defaultValue": "image/jpeg",
            "description": "<p>outputs.type desired image format.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "outputs.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.quality",
            "defaultValue": "12",
            "description": "<p>Quality of the JPEG outputs (will be ignored for other output types). Ranges from 0 to 12, with 12 as the highest quality.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "HTTP Usage Templated:",
          "content": "POST https://image.adobe.io/lrService/xmp HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"source\": {\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\": \"<storage>\"\n    }\n  },\n  \"options\": {\n    \"xmp\": \"<xmp>\"\n  },\n  \"outputs\": [\n    {\n      \"href\": \"<presigned_getURL> or <cc_storage_location\",\n      \"storage\": \"<storage>\",\n      \"type\": \"<type>\",\n      \"quality\": \"<quality>\",\n      \"overwrite\": <overwrite>\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Example(CC Asset):",
          "content": "POST https://image.adobe.io/lrService/xmp HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"source\": {\n      \"href\": \"/files/input.jpg\",\n      \"storage\": \"adobe\"\n    }\n  },\n  \"options\": {\n    \"xmp\": \"<x:xmpmeta xmlns:x=\\\"adobe:ns:meta\\/\\\" x:xmptk=\\\"Adobe XMP Core 5.6-c140 79.160451, 2017\\/05\\/06-01:08:21        \\\"> <rdf:RDF xmlns:rdf=\\\"http:\\/\\/www.w3.org\\/1999\\/02\\/22-rdf-syntax-ns#\\\"> <rdf:Description rdf:about=\\\"\\\" xmlns:crs=\\\"http:\\/\\/ns.adobe.com\\/camera-raw-settings\\/1.0\\/\\\" crs:Version=\\\"11.4.1\\\" crs:ProcessVersion=\\\"11.0\\\" crs:WhiteBalance=\\\"Custom\\\" crs:IncrementalTemperature=\\\"+54\\\" crs:IncrementalTint=\\\"0\\\" crs:Saturation=\\\"+81\\\" crs:Sharpness=\\\"0\\\" crs:LuminanceSmoothing=\\\"0\\\" crs:ColorNoiseReduction=\\\"0\\\" crs:VignetteAmount=\\\"0\\\" crs:ShadowTint=\\\"0\\\" crs:RedHue=\\\"0\\\" crs:RedSaturation=\\\"0\\\" crs:GreenHue=\\\"0\\\" crs:GreenSaturation=\\\"0\\\" crs:BlueHue=\\\"0\\\" crs:BlueSaturation=\\\"0\\\" crs:Vibrance=\\\"+84\\\" crs:HueAdjustmentRed=\\\"0\\\" crs:HueAdjustmentOrange=\\\"0\\\" crs:HueAdjustmentYellow=\\\"0\\\" crs:HueAdjustmentGreen=\\\"0\\\" crs:HueAdjustmentAqua=\\\"0\\\" crs:HueAdjustmentBlue=\\\"0\\\" crs:HueAdjustmentPurple=\\\"0\\\" crs:HueAdjustmentMagenta=\\\"0\\\" crs:SaturationAdjustmentRed=\\\"0\\\" crs:SaturationAdjustmentOrange=\\\"0\\\" crs:SaturationAdjustmentYellow=\\\"0\\\" crs:SaturationAdjustmentGreen=\\\"0\\\" crs:SaturationAdjustmentAqua=\\\"0\\\" crs:SaturationAdjustmentBlue=\\\"0\\\" crs:SaturationAdjustmentPurple=\\\"0\\\" crs:SaturationAdjustmentMagenta=\\\"0\\\" crs:LuminanceAdjustmentRed=\\\"0\\\" crs:LuminanceAdjustmentOrange=\\\"0\\\" crs:LuminanceAdjustmentYellow=\\\"0\\\" crs:LuminanceAdjustmentGreen=\\\"0\\\" crs:LuminanceAdjustmentAqua=\\\"0\\\" crs:LuminanceAdjustmentBlue=\\\"0\\\" crs:LuminanceAdjustmentPurple=\\\"0\\\" crs:LuminanceAdjustmentMagenta=\\\"0\\\" crs:SplitToningShadowHue=\\\"0\\\" crs:SplitToningShadowSaturation=\\\"0\\\" crs:SplitToningHighlightHue=\\\"0\\\" crs:SplitToningHighlightSaturation=\\\"0\\\" crs:SplitToningBalance=\\\"0\\\" crs:ParametricShadows=\\\"0\\\" crs:ParametricDarks=\\\"0\\\" crs:ParametricLights=\\\"0\\\" crs:ParametricHighlights=\\\"0\\\" crs:ParametricShadowSplit=\\\"25\\\" crs:ParametricMidtoneSplit=\\\"50\\\" crs:ParametricHighlightSplit=\\\"75\\\" crs:SharpenRadius=\\\"+1.0\\\" crs:SharpenDetail=\\\"25\\\" crs:SharpenEdgeMasking=\\\"0\\\" crs:PostCropVignetteAmount=\\\"0\\\" crs:GrainAmount=\\\"0\\\" crs:LensProfileEnable=\\\"0\\\" crs:LensManualDistortionAmount=\\\"0\\\" crs:PerspectiveVertical=\\\"0\\\" crs:PerspectiveHorizontal=\\\"0\\\" crs:PerspectiveRotate=\\\"0.0\\\" crs:PerspectiveScale=\\\"100\\\" crs:PerspectiveAspect=\\\"0\\\" crs:PerspectiveUpright=\\\"5\\\" crs:PerspectiveX=\\\"0.00\\\" crs:PerspectiveY=\\\"0.00\\\" crs:AutoLateralCA=\\\"0\\\" crs:Exposure2012=\\\"0.00\\\" crs:Contrast2012=\\\"0\\\" crs:Highlights2012=\\\"0\\\" crs:Shadows2012=\\\"0\\\" crs:Whites2012=\\\"0\\\" crs:Blacks2012=\\\"0\\\" crs:Clarity2012=\\\"0\\\" crs:DefringePurpleAmount=\\\"0\\\" crs:DefringePurpleHueLo=\\\"30\\\" crs:DefringePurpleHueHi=\\\"70\\\" crs:DefringeGreenAmount=\\\"0\\\" crs:DefringeGreenHueLo=\\\"40\\\" crs:DefringeGreenHueHi=\\\"60\\\" crs:Dehaze=\\\"0\\\" crs:Texture=\\\"0\\\" crs:ToneMapStrength=\\\"0\\\" crs:ConvertToGrayscale=\\\"False\\\" crs:OverrideLookVignette=\\\"False\\\" crs:ToneCurveName=\\\"Linear\\\" crs:ToneCurveName2012=\\\"Linear\\\" crs:CameraProfile=\\\"Embedded\\\" crs:CameraProfileDigest=\\\"54650A341B5B5CCAE8442D0B43A92BCE\\\" crs:LensProfileSetup=\\\"LensDefaults\\\" crs:UprightVersion=\\\"151388160\\\" crs:UprightCenterMode=\\\"0\\\" crs:UprightCenterNormX=\\\"0.5\\\" crs:UprightCenterNormY=\\\"0.5\\\" crs:UprightFocalMode=\\\"0\\\" crs:UprightFocalLength35mm=\\\"35\\\" crs:UprightPreview=\\\"False\\\" crs:UprightGuidedDependentDigest=\\\"F7173540FD9FB419BD947A976070F4D2\\\" crs:UprightTransformCount=\\\"6\\\" crs:UprightTransform_5=\\\"1.039357088,-0.000108501,-0.003125183,-0.000018587,1.057735296,-0.010513773,0.001767865,0.034718470,1.000000000\\\" crs:UprightFourSegmentsCount=\\\"2\\\" crs:UprightFourSegments_0=\\\"0.216999993,0.850666642,0.808333337,0.851555586\\\" crs:UprightFourSegments_1=\\\"0.810999990,0.663111091,0.797666609,0.178666711\\\" crs:HasSettings=\\\"True\\\" crs:CropTop=\\\"0.019089\\\" crs:CropLeft=\\\"0.460746\\\" crs:CropBottom=\\\"0.694646\\\" crs:CropRight=\\\"0.591986\\\" crs:CropAngle=\\\"45\\\" crs:CropConstrainToWarp=\\\"0\\\" crs:HasCrop=\\\"True\\\"> <crs:ToneCurve> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurve> <crs:ToneCurveRed> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurveRed> <crs:ToneCurveGreen> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurveGreen> <crs:ToneCurveBlue> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurveBlue> <crs:ToneCurvePV2012> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurvePV2012> <crs:ToneCurvePV2012Red> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurvePV2012Red> <crs:ToneCurvePV2012Green> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurvePV2012Green> <crs:ToneCurvePV2012Blue> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurvePV2012Blue> <crs:Look crs:Name=\\\"\\\"\\/> <\\/rdf:Description> <\\/rdf:RDF> <\\/x:xmpmeta>\"\n  },\n  \"outputs\": [\n    {\n      \"href\": \"/files/output.jpg\",\n      \"storage\": \"adobe\",\n      \"type\": \"image/jpeg\",\n      \"quality\": 10,\n      \"overwrite\": true\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Example(External Asset):",
          "content": "POST https://image.adobe.io/lrService/xmp HTTP/1.1\nHost: image.adobe.io/lrService\nContent-Type: application/json\nauthorization: Bearer $token\nx-api-key: $x-api-key\n{\n  \"inputs\":{\n    \"source\": {\n      \"href\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n      \"storage\": \"external\"\n    }\n  },\n  \"options\": {\n    \"xmp\": \"<x:xmpmeta xmlns:x=\\\"adobe:ns:meta\\/\\\" x:xmptk=\\\"Adobe XMP Core 5.6-c140 79.160451, 2017\\/05\\/06-01:08:21        \\\"> <rdf:RDF xmlns:rdf=\\\"http:\\/\\/www.w3.org\\/1999\\/02\\/22-rdf-syntax-ns#\\\"> <rdf:Description rdf:about=\\\"\\\" xmlns:crs=\\\"http:\\/\\/ns.adobe.com\\/camera-raw-settings\\/1.0\\/\\\" crs:Version=\\\"11.4.1\\\" crs:ProcessVersion=\\\"11.0\\\" crs:WhiteBalance=\\\"Custom\\\" crs:IncrementalTemperature=\\\"+54\\\" crs:IncrementalTint=\\\"0\\\" crs:Saturation=\\\"+81\\\" crs:Sharpness=\\\"0\\\" crs:LuminanceSmoothing=\\\"0\\\" crs:ColorNoiseReduction=\\\"0\\\" crs:VignetteAmount=\\\"0\\\" crs:ShadowTint=\\\"0\\\" crs:RedHue=\\\"0\\\" crs:RedSaturation=\\\"0\\\" crs:GreenHue=\\\"0\\\" crs:GreenSaturation=\\\"0\\\" crs:BlueHue=\\\"0\\\" crs:BlueSaturation=\\\"0\\\" crs:Vibrance=\\\"+84\\\" crs:HueAdjustmentRed=\\\"0\\\" crs:HueAdjustmentOrange=\\\"0\\\" crs:HueAdjustmentYellow=\\\"0\\\" crs:HueAdjustmentGreen=\\\"0\\\" crs:HueAdjustmentAqua=\\\"0\\\" crs:HueAdjustmentBlue=\\\"0\\\" crs:HueAdjustmentPurple=\\\"0\\\" crs:HueAdjustmentMagenta=\\\"0\\\" crs:SaturationAdjustmentRed=\\\"0\\\" crs:SaturationAdjustmentOrange=\\\"0\\\" crs:SaturationAdjustmentYellow=\\\"0\\\" crs:SaturationAdjustmentGreen=\\\"0\\\" crs:SaturationAdjustmentAqua=\\\"0\\\" crs:SaturationAdjustmentBlue=\\\"0\\\" crs:SaturationAdjustmentPurple=\\\"0\\\" crs:SaturationAdjustmentMagenta=\\\"0\\\" crs:LuminanceAdjustmentRed=\\\"0\\\" crs:LuminanceAdjustmentOrange=\\\"0\\\" crs:LuminanceAdjustmentYellow=\\\"0\\\" crs:LuminanceAdjustmentGreen=\\\"0\\\" crs:LuminanceAdjustmentAqua=\\\"0\\\" crs:LuminanceAdjustmentBlue=\\\"0\\\" crs:LuminanceAdjustmentPurple=\\\"0\\\" crs:LuminanceAdjustmentMagenta=\\\"0\\\" crs:SplitToningShadowHue=\\\"0\\\" crs:SplitToningShadowSaturation=\\\"0\\\" crs:SplitToningHighlightHue=\\\"0\\\" crs:SplitToningHighlightSaturation=\\\"0\\\" crs:SplitToningBalance=\\\"0\\\" crs:ParametricShadows=\\\"0\\\" crs:ParametricDarks=\\\"0\\\" crs:ParametricLights=\\\"0\\\" crs:ParametricHighlights=\\\"0\\\" crs:ParametricShadowSplit=\\\"25\\\" crs:ParametricMidtoneSplit=\\\"50\\\" crs:ParametricHighlightSplit=\\\"75\\\" crs:SharpenRadius=\\\"+1.0\\\" crs:SharpenDetail=\\\"25\\\" crs:SharpenEdgeMasking=\\\"0\\\" crs:PostCropVignetteAmount=\\\"0\\\" crs:GrainAmount=\\\"0\\\" crs:LensProfileEnable=\\\"0\\\" crs:LensManualDistortionAmount=\\\"0\\\" crs:PerspectiveVertical=\\\"0\\\" crs:PerspectiveHorizontal=\\\"0\\\" crs:PerspectiveRotate=\\\"0.0\\\" crs:PerspectiveScale=\\\"100\\\" crs:PerspectiveAspect=\\\"0\\\" crs:PerspectiveUpright=\\\"5\\\" crs:PerspectiveX=\\\"0.00\\\" crs:PerspectiveY=\\\"0.00\\\" crs:AutoLateralCA=\\\"0\\\" crs:Exposure2012=\\\"0.00\\\" crs:Contrast2012=\\\"0\\\" crs:Highlights2012=\\\"0\\\" crs:Shadows2012=\\\"0\\\" crs:Whites2012=\\\"0\\\" crs:Blacks2012=\\\"0\\\" crs:Clarity2012=\\\"0\\\" crs:DefringePurpleAmount=\\\"0\\\" crs:DefringePurpleHueLo=\\\"30\\\" crs:DefringePurpleHueHi=\\\"70\\\" crs:DefringeGreenAmount=\\\"0\\\" crs:DefringeGreenHueLo=\\\"40\\\" crs:DefringeGreenHueHi=\\\"60\\\" crs:Dehaze=\\\"0\\\" crs:Texture=\\\"0\\\" crs:ToneMapStrength=\\\"0\\\" crs:ConvertToGrayscale=\\\"False\\\" crs:OverrideLookVignette=\\\"False\\\" crs:ToneCurveName=\\\"Linear\\\" crs:ToneCurveName2012=\\\"Linear\\\" crs:CameraProfile=\\\"Embedded\\\" crs:CameraProfileDigest=\\\"54650A341B5B5CCAE8442D0B43A92BCE\\\" crs:LensProfileSetup=\\\"LensDefaults\\\" crs:UprightVersion=\\\"151388160\\\" crs:UprightCenterMode=\\\"0\\\" crs:UprightCenterNormX=\\\"0.5\\\" crs:UprightCenterNormY=\\\"0.5\\\" crs:UprightFocalMode=\\\"0\\\" crs:UprightFocalLength35mm=\\\"35\\\" crs:UprightPreview=\\\"False\\\" crs:UprightGuidedDependentDigest=\\\"F7173540FD9FB419BD947A976070F4D2\\\" crs:UprightTransformCount=\\\"6\\\" crs:UprightTransform_5=\\\"1.039357088,-0.000108501,-0.003125183,-0.000018587,1.057735296,-0.010513773,0.001767865,0.034718470,1.000000000\\\" crs:UprightFourSegmentsCount=\\\"2\\\" crs:UprightFourSegments_0=\\\"0.216999993,0.850666642,0.808333337,0.851555586\\\" crs:UprightFourSegments_1=\\\"0.810999990,0.663111091,0.797666609,0.178666711\\\" crs:HasSettings=\\\"True\\\" crs:CropTop=\\\"0.019089\\\" crs:CropLeft=\\\"0.460746\\\" crs:CropBottom=\\\"0.694646\\\" crs:CropRight=\\\"0.591986\\\" crs:CropAngle=\\\"45\\\" crs:CropConstrainToWarp=\\\"0\\\" crs:HasCrop=\\\"True\\\"> <crs:ToneCurve> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurve> <crs:ToneCurveRed> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurveRed> <crs:ToneCurveGreen> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurveGreen> <crs:ToneCurveBlue> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurveBlue> <crs:ToneCurvePV2012> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurvePV2012> <crs:ToneCurvePV2012Red> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurvePV2012Red> <crs:ToneCurvePV2012Green> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurvePV2012Green> <crs:ToneCurvePV2012Blue> <rdf:Seq> <rdf:li>0, 0<\\/rdf:li> <rdf:li>255, 255<\\/rdf:li> <\\/rdf:Seq> <\\/crs:ToneCurvePV2012Blue> <crs:Look crs:Name=\\\"\\\"\\/> <\\/rdf:Description> <\\/rdf:RDF> <\\/x:xmpmeta>\"\n  },\n  \"outputs\": [\n    {\n      \"href\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_putObject..\",\n      \"storage\": \"external\",\n      \"type\": \"image/jpeg\",\n      \"quality\": 10,\n      \"overwrite\": true\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Curl Usage:",
          "content": "curl -H \"authorization: Bearer $token\" -H \"Content-Type:application/json\" -H \"x-api-key:$x-api-key\" -X POST -d '{\"inputs\":{\"href\":\"<href>\",\"storage\":\"<storage>\"}, \"options\": {\"xmp\": \"<xmp>\"}, \"outputs\":[{\"href\":\"<href>\",\"storage\":\"<storage>\",\"type\":\"<type>\",\"quality\": \"<quality>\",\"overwrite\": <overwrite>}]}' https://image.adobe.io/lrService/xmp",
          "type": "curl"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-xmp-create.js",
    "groupTitle": "Lightroom",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "json",
            "optional": false,
            "field": "_links",
            "description": "<p>hrefs the client can use to get status of the asynchronous job</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response Templated:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\n{\n  \"_links\": {\n     \"self\" :{\n       \"href\" : \"https://image.adobe.io/lrService/status/<:jobId>\"\n     }\n  }\n}",
          "type": "json"
        },
        {
          "title": "Success-Response Example:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\n{\n  \"_links\": {\n     \"self\" :{\n       \"href\" : \"https://image.adobe.io/lrService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n     }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Error 4xx",
            "type": "array",
            "optional": true,
            "field": "details",
            "description": "<p>further descriptions of the exact error where <code>details</code> is substituted for a specific issue</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response Templated:",
          "content": "HTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\n{\n  \"type\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<details>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Example FileExistsError:",
          "content": " HTTP/1.1 400 Bad Request\n Content-Type: application/json\n {\n  \"title\": \"Asset Not Found\",\n  \"code\": 404,\n  \"type\": \"FileExistsErrors\",\n  \"details\": {\n    \"reason\": \"Unable to access the input href\",\n    \"name\": \"<path_to_invalid_file>\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Example InputValidationError:",
          "content": "HTTP/1.1 400 Bad Request\nContent-Type: application/json\n{\n  \"type\": \"InputValidationError\",\n  \"code\": 400,\n  \"reason\": [\n     {\n       \"keyword\": \"enum\",\n       \"dataPath\": \".inputs.storage\",\n       \"schemaPath\": \"#/definitions/storage/enum\",\n       \"params\": {\n         \"allowedValues\": [\n           \"adobe\",\n           \"external\",\n           \"lightroom\",\n           \"dropbox\",\n           \"azure\"\n         ]\n       },\n       \"message\": \"should be equal to one of the allowed values\"\n     }\n   ]\n }",
          "type": "json"
        },
        {
          "title": "Example InvalidAuthTokenError:",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: application/json\n{\n  \"title\": \"Unauthorized\",\n  \"code\": 401,\n  \"type\": \"InvalidAuthTokenError\",\n  \"details\": {\n    \"reason\": \"Unable to access the input href\",\n    \"name\": \"<path_to_invalid_file>\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "Example TrialLimitExceededError:",
          "content": " HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "json"
        },
        {
          "title": "Example UndefinedError:",
          "content": "HTTP/1.1 500 Internal Server Error\nContent-Type: application/json\n{\n  \"title\": \"Internal Service Error\",\n  \"code\": 500,\n  \"type\": \"InternalServiceError\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/pie/psdService/status/<:jobID>",
    "title": "artboard create status",
    "description": "<p>Returns the status of a artboard create job. Will return 202 as long as there are child jobs still running and 200 once all children are complete</p>",
    "version": "1.0.0",
    "name": "artboard-create-status",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobID",
            "description": "<p>The jobID to get status for.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>an output object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.input",
            "description": "<p>the original input file path</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.status",
            "description": "<p>the child job status</p> <ul>   <li>pending - request has been accepted and is waiting to start</li>   <li>running - the child job is running</li>   <li>uploading - files have been generated and are uploading to destination</li>   <li>succeeded - the child job has succeeded</li>   <li>failed - the child job has failed</li> </ul>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.created",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot; created timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.modified",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot;  modified timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links",
            "description": "<p>the rendition links</p>"
          },
          {
            "group": "Success 202",
            "type": "rendition[]",
            "optional": false,
            "field": "outputs.output._links.renditions",
            "description": "<p>array off rendition objects</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition",
            "description": "<p>rendition object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.href",
            "description": "<p>the rendition location</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"external\"",
              "\"adobe\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.storage",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.type",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.errors",
            "description": "<p>any errors reported requested output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.type",
            "description": "<p>a machine readable error type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.code",
            "description": "<p>a machine readable error code</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.title",
            "description": "<p>a short human readable error summary</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": true,
            "field": "outputs.output.errors.errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"https://image.adobe.io/pie/psdService/status/<:jobId>\"\n{\n    \"jobId\":\"<:jobId>\",\n    \"outputs\":[\n        {\n            \"input\":[\"<input>\"],\n            \"status\":\"<status>\",\n            \"_links\":{\n              \"renditions\":[\n                {\n                  \"href\":\"<href>\",\n                  \"storage\":\"<storage>\",\n                  \"type\":\"<type>\"\n                }\n              ]\n            }\n        }\n    ],\n    \"_links\":{\n        \"self\":{\n            \"href\":\"https://image.adobe.io/pie/psdService/status/<:jobId>\"\n        }\n    }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 233\nLocation: \"https://image.adobe.io/pie/psdService/status/<:jobID>\"\n{\n   \"jobID\":\"0d6029b8-1159-4b6e-b4c3-25816f91f030\",\n   \"outputs\":[\n      {\n         \"input\":[\n            \"/files/project/input_1.psd\",\n            \"/files/project/input_2.psd\",\n            \"/files/project/input_3.psd\"\n         ],\n         \"status\":\"running\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\"\n      },\n      {\n         \"input\":[\n            \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n            \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\"\n         ],\n         \"status\":\"succeeded\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n         \"_links\":{\n            \"renditions\":[\n               {\n                  \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n                  \"storage\":\"external\",\n                  \"type\":\"image/vnd.adobe.photoshop\"\n               }\n            ]\n         }\n      },\n      {\n         \"input\":[\n            \"/files/project/input_with_errors.psd\"\n         ],\n         \"status\":\"failed\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n         \"errors\":{\n            \"input\":[\n               \"/files/project/input_with_errors.psd\",\n               \"/files/project/input_2.psd\",\n               \"/files/project/input_3.psd\"\n            ],\n            \"status\":\"failed\",\n            \"code\":\"404\",\n            \"error\":{\n               \"type\":\"FileExistsError\",\n               \"title\":\"input file does not exist\"\n            }\n         }\n      }\n   ],\n   \"_links\":{\n      \"self\":{\n         \"href\":\"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n      }\n   }\n}",
          "type": "object"
        },
        {
          "title": "Request: HTTP Example",
          "content": "GET /psdService/status/<:jobId> HTTP/1.1\nHost: image.adobe.io\nAuthorization: Bearer $token\nX-Api-Key: $api_key",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X GET https://image.adobe.io/pie/psdService/status/<:jobId>",
          "type": "curl"
        }
      ]
    },
    "filename": "docs-src/pre-release/get-artboard-create.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Inline Templated",
          "content": "// This is a templated example for when a requested job has failed\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"jobId\": \"<jobID\",\n  \"outputs\":[\n      {\n        \"input\":\"<href>\",\n        \"status\":\"<status>\",\n        \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"errors\":{\n          \"type\":\"<errorType>\",\n          \"title\":\"<errorDescription>\",\n          \"code\": \"\"<errorCode>\",\n          \"<errorDetails>\":[\n            {\n              \"name\":\"<paramName>\",\n              \"reason\":\"<error>\"\n            }\n          ]\n        }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Error-Response-Inline Example",
          "content": " // In this example the GET call to /status succeeds but one of the initiated jobs has failed\n\n HTTP/1.1 200 OK\n Content-Type: application/json\n Content-Length: {xsd:nonNegativeInteger}\n Location: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n {\n   \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n   \"outputs\":[\n      {\n         \"input\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"status\":\"failed\",\n         \"created\":\"2018-01-04T12:57:15.12345Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345Z\",\n         \"error\":{\n            \"type\":\"FileExistsError\",\n            \"title\":\"input file does not exist\",\n            \"code\":\"400\"\n         }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/pie/psdService/artboardCreate",
    "title": "artboard create",
    "description": "<p>Initiates an asynchronous job to apply (optional) psd edits and then generate renditions and/or save a new psd</p>",
    "version": "1.0.0",
    "name": "artboard_create",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options",
            "description": "<p>available options to apply to all input files</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.artboard",
            "description": "<p>Represents an array of input objects</p>"
          },
          {
            "group": "Request",
            "type": "input[]",
            "optional": false,
            "field": "options.artboard.inputs",
            "description": "<p>An array of input objects.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.artboard.inputs.input",
            "description": "<p>An object describing the input PSD to add to the artboard. Each input object will be either 'external' OR 'adobe'. Current support is for files less than 1000MB</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "options.artboard.inputs.input.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.artboard.inputs.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL.</p> <ul>   <li>CC Storage hrefs can be either a single asset or a folder</li>   <li>CC Storage hrefs must be prepended with `/files`. The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li> </ul>"
          },
          {
            "group": "Request",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>An array of output objects</p>"
          },
          {
            "group": "Request",
            "type": "output",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>An object describing the requested file output (a new PSD file. right now supports a single output PSD)</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPUTURL..</p> <ul>   <li>CC Storage hrefs</li>   <ul>     <li>Can be either a single asset or a folder</li>     <li>Must be prepended with `/files`. The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>   </ul>   <li>Template Tokens: At runtime these three tokens get replaced with their respective values... (FOR \"adobe\" STORED FILES ONLY)</li>   <ul>     <li>$ReqID - replaced with the request id generated by the service</li>     <li>$FileNum - replaced with an increment-by-1 counter, beginning at 0, so that each output file gets a unique number assigned </li>     <li>$FileName - replaced with file name minus the \".\" and file extension</li>   </ul> </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output.type",
            "description": "<p>desired image format.</p> <ul>  <li>image/vnd.adobe.photoshop - Create a new PSD file</li> </ul>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": false,
            "field": "outputs.output.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request: HTTP Templated",
          "content": "POST https://image.adobe.io/pie/psdService/artboardCreate HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"options\": {\n    \"artboard\": [\n      {\n        \"href\":\"<presigned_getURL> or <cc_storage_location>\",\n        \"storage\":\"<storage>\"\n      }\n    ]\n  },\n  \"outputs\":[\n    {\n      \"href\":\"<cc_storage_location>\",\n      \"storage\":\"adobe\",\n      \"type\":\"<type>\",\n      \"width\":<width>,\n      \"overwrite\":<bool>\n    },\n    {\n      \"href\":\"<presigned_putURL>\",\n      \"storage\":\"<storage>\",\n      \"type\":\"<type>\",\n      \"width\":<width>,\n      \"overwrite\":<bool>\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Request: HTTP Example",
          "content": "POST https://image.adobe.io/pie/psdService/artboardCreate HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n   \"options\":{\n      \"artboard\":[\n         {\n            \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n            \"storage\":\"external\"\n         },\n         {\n            \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n            \"storage\":\"external\"\n         },\n         {\n            \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n            \"storage\":\"external\"\n         }\n      ]\n   },\n   \"outputs\":[\n      {\n         \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_putObject..\",\n         \"storage\":\"external\",\n         \"type\":\"image/vnd.adobe.photoshop\",\n         \"overwrite\":false\n      }\n   ]\n}",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X POST -d '{\"options\":{\"artboard\":[{\"href\":\"<href>\",\"storage\":\"<storage>\"}, {\"href\":\"<href>\",\"storage\":\"<storage>\"}, {\"href\":\"<href>\",\"storage\":\"<storage>\"}],\"outputs\":[{\"href\":\"<href>\",\"storage\":\"<storage>\"}]}' https://image.adobe.io/pie/psdService/artboardCreate",
          "type": "curl"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links.self",
            "description": "<p>The link to GET the job status from</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links",
            "description": "<p>any link the client follow, described by their relationship</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/<:jobId>\" }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 682\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\" }\n  }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-artboard-create.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>402: TrialLimitExceededError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        },
        {
          "title": "Response: TrialLimitExceededError Example:",
          "content": " // This is an example for when quota assigned is already used.\n HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/pie/psdService/renditionCreate",
    "title": "rendition create",
    "description": "<p>Initiates an asynchronous job to create renditions</p>",
    "version": "1.0.0",
    "name": "create_renditions",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "input[]",
            "optional": false,
            "field": "inputs",
            "description": "<p>An array of input objects. We currently only support one input objecty.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "inputs.input",
            "description": "<p>An object describing an input file. Currently supported filetypes include:</p> <ul>   <li>jpeg</li>   <li>png</li>   <li>psd</li>   <li>tiff</li> </ul> Current support is for files less than 1000MB."
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "inputs.input.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "inputs.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL.</p>  <ul>    <li>CC Storage path must be prepended with `/files` or `/cloud-content` or `/assets`       <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>       <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>       <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </li>  </ul>"
          },
          {
            "group": "Request",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>An array of output objects</p>"
          },
          {
            "group": "Request",
            "type": "output",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>An object describing the requested file outputs (a new psd file or supported renditions)</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPUTURL..</p>  <ul>    <li>CC Storage hrefs</li>    <ul>      <li>Can be either a single asset or a folder</li>      <li>Must be prepended with `/files` or `/cloud-content` or `/assets`</li>      <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>      <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>      <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </ul>    <li>Template Tokens: At runtime these three tokens get replaced with their respective values... (FOR \"adobe\" STORED FILES ONLY)</li>    <ul>      <li>$ReqID - replaced with the request id generated by the service</li>      <li>$FileNum - replaced with an increment-by-1 counter, beginning at 0, so that each output file gets a unique number assigned </li>      <li>$FileName - replaced with file name minus the \".\" and file extension</li>    </ul>    <li>If the output path is a folder than the Template Tokens will be used to dynamically generate the output file name according to the pattern \"/files/&lt;path&gt;/$ReqID_$FileName_$FileNum.&lt;ext&gt;\"</li>  </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/png\"",
              "\"image/tiff\"",
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output.type",
            "description": "<p>desired image format.</p>  <ul>    <li>image/vnd.adobe.photoshop - Create a new PSD file</li>    <li>image/jpeg, image/png, image/tiff - Create a new jpeg, png or tiff rendition</li>  </ul>  Image mode coversions: </br></br>Certain image modes (rgb, cmyk, greyscale, etc) must be converted to another image mode before a rendition can be created:  <ul>    <li>Tiff Requested: Multichannel and Duotone will convert to RGB</li>    <li>PNG Requested: CMYK, HSL, HSB, Multichannel, Duotone, Lab and XYZ will convert to RGB</li>  </ul>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.output.width",
            "defaultValue": "0",
            "description": "<p>width, in pixels, of the renditions. Width of 0 generates a full size rendition.  Height is not necessary as the rendition generate will automatically figure out the correct width-to-height aspect ratio. Only supported for image renditions.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.output.maxWidth",
            "description": "<p>maxWidth (in pixels) of the renditions. When width is 0 and maxWidth is less than the width of the document, you get the final rendition size of maxWidth. Otherwise it will be a full size document rendition. If both width and maxWidth are provided then the lowest value gets the precedence. Height is not necessary as the API will automatically maintain the aspect ratio.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "outputs.output.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.output.quality",
            "defaultValue": "7",
            "description": "<p>quality of the renditions for JPEG. Range from 1 to 7, with 7 as the highest quality.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "outputs.output.compression",
            "defaultValue": "large",
            "description": "<p>compression level for PNG: small, medium or large.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"true\"",
              "\"false\""
            ],
            "optional": true,
            "field": "outputs.output.trimToCanvas",
            "defaultValue": "false",
            "description": "<p>'false' generates renditions that are the actual size of the layer (as seen by View &gt; Show &gt; Layer Edges within the Photoshop desktop app) but will remove any extra transparent pixel padding. 'true' generates renditions that are the size of the canvas, either trimming the layer to the visible portion of the canvas or padding extra space. If the requested file format supports transparency than transparent pixels will be used for padding, otherwise white pixels will be used.</p>"
          },
          {
            "group": "Request",
            "type": "layer[]",
            "optional": true,
            "field": "outputs.output.layers",
            "description": "<p>An array of layer objects.</br> By including this array you are signaling that you'd like a rendition created from these layer id's or layer names. Excluding it will generate a document-level rendition.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": false,
            "field": "outputs.output.layers.id",
            "description": "<p>the layer id</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.name",
            "description": "<p>the layer name.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "outputs.output.iccProfile",
            "description": "<p>An object describing the icc profile to convert to.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.iccProfile.imageMode",
            "description": "<p>the image mode</p> <ul>   <li>Allowed Value for iccProfile File</li>   <ul>       <li>grayscale</li>       <li>rgb</li>       <li>cmyk</li>   </ul> </ul> <ul>    <li>Allowed Value for iccProfile Name</li>    <ul>    <li>rgb</li>    <li>grayscale</li>    </ul> </ul>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "outputs.output.iccProfile.input",
            "description": "<p>An object describing the icc profile.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output.color.icc.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.iccProfile.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL.</p> <ul>   <li>Must be prepended with `/files` or `/cloud-content` or `/assets`</li>   <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>   <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>   <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li> </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"Adobe RGB (1998)\"",
              "\"Apple RGB\"",
              "\"ColorMatch RGB\"",
              "\"sRGB IEC61966-2.1\"",
              "\"Dot Gain 10%\"",
              "\"Dot Gain 15%\"",
              "\"Dot Gain 20%\"",
              "\"Dot Gain 25%\"",
              "\"Dot Gain 30%\"",
              "\"Gray Gamma 1.8\"",
              "\"Gray Gamma 2.2\""
            ],
            "optional": false,
            "field": "outputs.output.color.profileName",
            "description": "<p>the name of the color profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request: HTTP Templated",
          "content": "POST https://image.adobe.io/pie/psdService/renditionCreate HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"inputs\": [\n    {\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\": \"<storage>\"\n    }\n  ],\n  \"outputs\": [\n     {\n      \"href\": \"<cc_storage_location>\",\n      \"storage\": \"adobe\",\n      \"type\": \"<type>\",\n      \"width\": <width>,\n      \"overwrite\":<bool>,\n      \"quality\": \"<quality>\"\n      \"compression\": \"<compression>\",\n      \"layers\":[\n          {\n              \"id\":<id>,\n              \"name\":<name>\n          },\n          {\n              \"id\":<id>,\n              \"name\":<name>\n          }\n      ]\n    },\n    {\n      \"href\":\"<presigned_putURL>\",\n      \"storage\": \"external\",\n      \"type\": \"<type>\",\n      \"width\": <width>,\n      \"overwrite\":<bool>\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Single File Example",
          "content": "POST https://image.adobe.io/pie/psdService/renditionCreate HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n   \"inputs\":[\n      {\n         \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"storage\":\"external\"\n      }\n   ],\n   \"outputs\":[\n      {\n         \"href\":\"/files/some_project/renders/design_$ReqID_$FileName.jpeg\",\n         \"storage\":\"adobe\",\n         \"type\":\"image/jpeg\",\n         \"width\":0,\n         \"overwrite\":true,\n         \"quality\":1\n      },\n      {\n         \"href\":\"/files/some_project/renders/design_$ReqID_$FileName.png\",\n         \"storage\":\"adobe\",\n         \"type\":\"image/png\",\n         \"width\":0,\n         \"overwrite\":true,\n         \"compression\":\"small\",\n         \"layers\":[\n            {\n               \"id\":77\n            },\n            {\n               \"id\":72\n            }\n         ]\n      },\n      {\n         \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_putObject..\",\n         \"storage\":\"external\",\n         \"type\":\"image/jpeg\",\n         \"width\":512,\n         \"overwrite\":true,\n         \"quality\":2\n      },\n      {\n         \"href\":\"/files/some_project/renders/design_$ReqID_$FileName.psd\",\n         \"storage\":\"adobe\",\n         \"type\":\"image/vnd.adobe.photoshop\",\n         \"overwrite\":true\n      }\n   ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Single File Example for Dropbox",
          "content": "POST https://image.adobe.io/pie/psdService/renditionCreate HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n   \"inputs\":[\n      {\n         \"href\":\"https://dl.dropboxusercontent.com/apitul/1/KYTECIO6d2EDlg\",\n         \"storage\":\"dropbox\"\n      }\n   ],\n   \"outputs\":[\n      {\n         \"href\":\"https://dl.dropboxusercontent.com/apitl/1/AH9p5Nn-fv4wvpezACpj4U0tALP8uqqOSxqcfUbCYZSNNrlfNkX0Ni-cUq8RqrRj-zBsYDMLqn-AZNmfxjVioY1Tfp5WTrqpnia3UpAgljk3UfWgDm8bW2Il144UDl7jzKFqFs1EHECZYpQb0yeqQywlTgtdSbfSdhocCaLrBWoy_ARVtmsw_bOUu7OyUPv_wgoGKa3b0YBdzKf2zvhWDcNgeV_sC8StpFWJobuZ5cMF8wL3pWtZwdbe2ukzXH2gWg-aeqNwA2h4uAbhwvoy2QqRdk1A5TxKUdSbCtRGOX1Y3YccPW5cnYmIOdeaCLU6EmAEaOGugG25vq5CX3LKZGqxky5OeXT4BGZGhSecdo9j2LBVR78Kl57nd_4NA4cwcaKUQFseu9eqsQjpDTvSOQzT7ODmisWWtE3MVXgWLkUgcw\",\n         \"storage\":\"dropbox\",\n         \"type\":\"image/jpeg\",\n         \"width\":0,\n         \"overwrite\":true,\n         \"quality\":1\n      },\n      {\n         \"href\":\"https://dl.dropboxusercontent.com/apitl/1/AH9p5Nn-fv4wvpezACpj4U0tALP8uqqOSxqcfUbCYZSNNrlfNkX0Ni-cUq8RqrRj-zBsYDMLqn-AZNmfxjVioY1Tfp5WTrqpnia3UpAgljk3UfWgDm8bW2Il144UDl7jzKFqFs1EHECZYpQb0yeqQywlTgtdSbfSdhocCaLrBWoy_ARVtmsw_bOUu7OyUPv_wgoGKa3b0YBdzKf2zvhWDcNgeV_sC8StpFWJobuZ5cMF8wL3pWtZwdbe2ukzXH2gWg-aeqNwA2h4uAbhwvoy2QqRdk1A5TxKUdSbCtRGOX1Y3YccPW5cnYmIOdeaCLU6EmAEaOGugG25vq5CX3LKZGqxky5OeXT4BGZGhSecdo9j2LBVR78Kl57nd_4NA4cwcaKUQFseu9eqsQjpDTvSOQzT7ODmisWFDWghtWAjxs12ew\",\n         \"storage\":\"dropbox\",\n         \"type\":\"image/png\",\n         \"width\":0,\n         \"overwrite\":true,\n         \"compression\":\"small\"\n      }\n   ]\n}",
          "type": "http"
        },
        {
          "title": "HTTP Batch Example",
          "content": "POST https://image.adobe.io/pie/psdService/renditionCreate HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n   \"inputs\":[\n      {\n         \"href\":\"files/project_files\",\n         \"storage\":\"adobe\"\n      }\n   ],\n   \"outputs\":[\n      {\n         \"href\":\"/files/outputs\",\n         \"storage\":\"adobe\",\n         \"type\":\"image/jpeg\",\n         \"width\":0,\n         \"overwrite\":true,\n         \"quality\":3\n      },\n      {\n         \"href\":\"/files/outputs\",\n         \"storage\":\"adobe\",\n         \"type\":\"image/png\",\n         \"width\":0,\n         \"overwrite\":true,\n         \"compression\":\"medium\"\n      },\n      {\n         \"href\":\"/files/outputs\",\n         \"storage\":\"adobe\",\n         \"type\":\"image/vnd.adobe.photoshop\",\n         \"overwrite\":true\n      }\n   ]\n}",
          "type": "http"
        },
        {
          "title": "Request: Color Conversion by iccProfile Name",
          "content": "POST https://image.adobe.io/pie/psdService/renditionCreate HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"inputs\": [\n    {\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\": \"<storage>\"\n    }\n  ],\n  \"outputs\": [\n     {\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\": \"<storage>\"\n      \"type\": \"<type>\",\n      \"iccProfile\": {\n          \"imageMode\": \"<imageMode>\",\n          \"profileName\": \"<profileName>\"\n      }\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Request: Color Conversion by iccProfile File",
          "content": "POST https://image.adobe.io/pie/psdService/renditionCreate HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"inputs\": [\n    {\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\": \"<storage>\"\n    }\n  ],\n  \"outputs\": [\n     {\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\": \"<storage>\"\n      \"type\": \"<type>\",\n      \"iccProfile\": {\n          \"imageMode\": \"<imageMode>\",\n          \"iccProfile\": {\n            \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n            \"storage\": \"<storage>\"\n          }\n      }\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X POST -d '{\"inputs\": [{\"href\":\"<path_to_input_file>\",\"storage\":\"<storage>\"}],\"outputs\": [{\"href\":\"<href>\",\"storage\":\"<storage>\",\"type\": \"<type>\",\"width\": <width>,\"overwrite\":<bool>, \"quality\": \"<quality>\", \"compression\": \"<compression>\"}]}' https://image.adobe.io/pie/psdService/renditionCreate",
          "type": "curl"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-rendition-create.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links",
            "description": "<p>any link the client follow, described by their relationship</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/<:jobId>\" }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 682\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\" }\n  }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>402: TrialLimitExceededError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        },
        {
          "title": "Response: TrialLimitExceededError Example:",
          "content": " // This is an example for when quota assigned is already used.\n HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/pie/psdService/documentManifest",
    "title": "document manifest",
    "description": "<p>Initiates an asynchronous job to extract and return a psd file's layer information</p>",
    "version": "1.0.0",
    "name": "document-manifest",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "input[]",
            "optional": false,
            "field": "inputs",
            "description": "<p>An array of input objects. We currently only support one input object.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "inputs.input",
            "description": "<p>An object describing an input PSD file.Current support is for files less than 1000MB.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options",
            "description": "<p>available options to apply to all input files</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.thumbnails",
            "description": "<p>Include presigned GET URLs to small preview thumbnails for any renderable layer.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/png\"",
              "\"image/tiff\""
            ],
            "optional": false,
            "field": "options.thumbnails.type",
            "description": "<p>desired image format.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "inputs.input.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "inputs.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL.</p>  <ul>    <li>CC Storage path must be prepended with `/files` or `/cloud-content` or `/assets`       <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>       <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>       <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request: HTTP Templated",
          "content": "POST https://image.adobe.io/pie/psdService/layers HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"inputs\": [\n    {\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\":\"<storage>\"\n    }\n  ],\n  \"options\": {\n    \"thumbnails\": {\n      \"type\":\"<type>\"\n    }\n  }\n}",
          "type": "http"
        },
        {
          "title": "HTTP External Example",
          "content": "POST https://image.adobe.io/pie/psdService/layers HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n   \"inputs\":[\n      {\n         \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"storage\":\"external\"\n      }\n   ],\n   \"options\":{\n      \"thumbnails\":{\n         \"type\":\"image/jpeg\"\n      }\n   }\n}",
          "type": "http"
        },
        {
          "title": "HTTP Dropbox Example",
          "content": "POST https://image.adobe.io/pie/psdService/layers HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n   \"inputs\":[\n      {\n         \"href\":\"https://dl.dropboxusercontent.com/apitul/1/KYTECIO6d2EDlg\",\n         \"storage\":\"dropbox\"\n      }\n   ],\n   \"options\":{\n      \"thumbnails\":{\n         \"type\":\"image/jpeg\"\n      }\n   }\n}",
          "type": "http"
        },
        {
          "title": "HTTP Adobe Example",
          "content": "POST https://image.adobe.io/pie/psdService/layers HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"inputs\": [\n    {\n      \"href\": \"/files/some_project/design.psd\",\n      \"storage\": \"adobe\"\n    }\n  ],\n  \"options\": {\n    \"thumbnails\": {\n      \"type\":\"image/png\"\n    }\n  }\n}",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X POST -d '{\"inputs\": [{\"href\":\"<href>\",\"storage\":\"<storage>\"}],\"options\":{}}' https://image.adobe.io/pie/psdService/documentManifest",
          "type": "curl"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-document-manifest.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links",
            "description": "<p>any link the client follow, described by their relationship</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/<:jobId>\" }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 682\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\" }\n  }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>402: TrialLimitExceededError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        },
        {
          "title": "Response: TrialLimitExceededError Example:",
          "content": " // This is an example for when quota assigned is already used.\n HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/pie/psdService/status/<:jobId>",
    "title": "document manifest status",
    "description": "<p>Returns status and layer info for a psd file created by POST /psdService/status. Will return 202 as long as there are child jobs still running and 200 once all children are complete</p>",
    "version": "1.0.0",
    "name": "document-manifest-status",
    "group": "Photoshop",
    "success": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>The layers to get.</p>"
          }
        ],
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>an output object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.input",
            "description": "<p>the original input file path</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.status",
            "description": "<p>the child job status</p> <ul>   <li>pending - request has been accepted and is waiting to start</li>   <li>running - the child job is running</li>   <li>uploading - files have been generated and are uploading to destination</li>   <li>succeeded - the child job has succeeded</li>   <li>failed - the child job has failed</li> </ul>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.created",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot; created timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.modified",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot;  modified timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.document",
            "description": "<p>information about the psd file</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.document.name",
            "description": "<p>name of the input file</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output.document.height",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output.document.width",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.document.photoshopBuild",
            "description": "<p>the name of the application that created the PSD</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"bitmap\"",
              "\"greyscale\"",
              "\"indexed\"",
              "\"rgb\"",
              "\"cmyk\"",
              "\"hsl\"",
              "\"hsb\"",
              "\"multichannel\"",
              "\"duotone\"",
              "\"lab\"",
              "\"xyz\""
            ],
            "optional": false,
            "field": "outputs.output.document.imageMode",
            "description": "<p>the document's image mode.</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "8",
              "16",
              "32"
            ],
            "optional": false,
            "field": "outputs.output.document.bitDepth",
            "description": "<p>the document's bit/channel depth.</p>"
          },
          {
            "group": "Success 202",
            "type": "layer[]",
            "optional": false,
            "field": "outputs.output.layers",
            "description": "<p>a tree of layer objects representing the PSD layer structure extracted from the psd document</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs.output.layers.layer",
            "description": "<p>a layer object</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output.layers.layer.id",
            "description": "<p>the layer id. Note an id of -1 is valid and indicates a PSD that only contains a background image and no layers</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output.layers.layer.index",
            "description": "<p>the layer index</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": true,
            "field": "outputs.output.layers.layer.thumbnail",
            "description": "<p>If thumbnails were requested, a presigned GET URL to the thumbnail</p>"
          },
          {
            "group": "Success 202",
            "type": "layer[]",
            "optional": false,
            "field": "outputs.output.layers.layer.children",
            "description": "<p>an array of nested layer objects. Only layerSections (group layers) can include children</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"layer\"",
              "\"textLayer\"",
              "\"adjustmentLayer\"",
              "\"smartObject\"",
              "\"fillLayer\"",
              "\"backgroundLayer\""
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.type",
            "description": "<p>the layer type.</p> <ul>   <li>layer - a pixel layer</li>   <li>textLayer - a text layer</li>   <li>adjustmentLayer - an adjustment layer</li>   <li>layerSection - a grouping layer</li>   <li>smartObject - a smart object</li>   <li>backgroundLayer - a background layer</li>   <li>fillLayer - a fill layer</li> </ul>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.layer.name",
            "description": "<p>the layer name.</p>"
          },
          {
            "group": "Success 202",
            "type": "bool",
            "optional": false,
            "field": "outputs.output.layers.layer.locked",
            "description": "<p>is the layer locked</p>"
          },
          {
            "group": "Success 202",
            "type": "bool",
            "optional": false,
            "field": "outputs.output.layers.layer.visible",
            "description": "<p>is the layer visible</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.adjustments",
            "description": "<p>adjustment layer info</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.adjustments.brightnessContrast",
            "description": "<p>brightness and contrast settings</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "-150...150"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.brightnessContrast.brightness",
            "description": "<p>the adjustmentLayer's brightness:</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "-150...150"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.brightnessContrast.contrast",
            "description": "<p>the adjustmentLayer's contrast:</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.adjustments.exposure",
            "description": "<p>exposure settings</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "-20.0...20.0"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.exposure.exposure",
            "description": "<p>the layer's exposure. Defaults to 0.0</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "-0.5...0.5"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.exposure.offset",
            "description": "<p>the layer's offset. Defaults to 0.0</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0.01...9.99"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.exposure.gammaCorrection",
            "description": "<p>the layer's gammaCorrection. Defaults to 1.0</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.adjustments.hueSaturation",
            "description": "<p>hue and saturation settings</p>"
          },
          {
            "group": "Success 202",
            "type": "bool",
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.hueSaturation.colorize",
            "description": "<p>colorize</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.hueSaturation.channels",
            "description": "<p>an array of hashes representing the 'master' channel (the remaining five channels of 'magentas', 'yellows', 'greens', etc are not yet supported)</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"master\""
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.hueSaturation.channels.channel",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "-180...180"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.hueSaturation.channels.hue",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.hueSaturation.channels.saturation",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.hueSaturation.channels.lightness",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.adjustments.colorBalance",
            "description": "<p>color balance settings</p>"
          },
          {
            "group": "Success 202",
            "type": "bool",
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.colorBalance.preserveLuminosity",
            "description": "<p>preserveLuminosity</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.colorBalance.shadowLevels",
            "description": "<p>array of 3 ints</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.colorBalance.midtoneLevels",
            "description": "<p>array of 3 ints</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "allowedValues": [
              "-100...100"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.adjustments.colorBalance.highlightLevels",
            "description": "<p>array of 3 ints</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.layers.layer.bounds",
            "description": "<p>the bounds of the layer. applicable for the following layer types</p> <ul>   <li>layer - a pixel layer</li>   <li>adjustmentLayer - an adjustment layer</li>   <li>textLayer - a text layer</li>   <li>layerSection - a grouping layer</li>   <li>smartObject - a smart object</li>   <li>fillLayer - a fill layer</li> </ul>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output.layers.layer.bounds.top",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output.layers.layer.bounds.left",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Success 202",
            "type": "float",
            "optional": false,
            "field": "outputs.output.layers.layer.bounds.width",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Success 202",
            "type": "float",
            "optional": false,
            "field": "outputs.output.layers.layer.bounds.height",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.blendOptions",
            "description": "<p>Blend options of a layer, including opacity and blend mode</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output.layers.layer.blendOptions.opacity",
            "description": "<p>Indicates the opacity value of a layer</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.layer.blendOptions.blendMode",
            "description": "<p>Blend mode of a layer</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.mask",
            "description": "<p>An object describing the input mask added or replaced to the layer.</p>"
          },
          {
            "group": "Success 202",
            "type": "bool",
            "optional": false,
            "field": "outputs.output.layers.layer.mask.clip",
            "description": "<p>Indicates if this is a clipped layer.</p>"
          },
          {
            "group": "Success 202",
            "type": "bool",
            "optional": false,
            "field": "outputs.output.layers.layer.mask.enabled",
            "description": "<p>Indicates a mask is enabled on that layer or not.</p>"
          },
          {
            "group": "Success 202",
            "type": "bool",
            "optional": false,
            "field": "outputs.output.layers.layer.mask.linked",
            "description": "<p>Indicates a mask is linked to the layer or not.</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.layers.layer.mask.offset",
            "description": "<p>An object to specify mask offset on the layer.</p>"
          },
          {
            "group": "Success 202",
            "type": "integer",
            "optional": false,
            "field": "outputs.output.layers.layer.mask.offset.x",
            "description": "<p>Offset to indicate horizontal move of the mask.</p>"
          },
          {
            "group": "Success 202",
            "type": "integer",
            "optional": false,
            "field": "outputs.output.layers.layer.mask.offset.y",
            "description": "<p>Offset to indicate vertical move of the mask.</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.smartObject",
            "description": "<p>An object describing the attributes specific to creating or editing a smartObject layer.</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.layer.smartObject.type",
            "description": "<p>Desired image format for the smart object.</p>"
          },
          {
            "group": "Success 202",
            "type": "bool",
            "optional": false,
            "field": "outputs.output.layers.layer.smartObject.linked",
            "defaultValue": "false",
            "description": "<p>Indicates if this Smart Object is linked. Currently we support Embedded Smart Object only which means &quot;linked = false&quot;.</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.layer.smartObject.name",
            "description": "<p>Name of the embedded or linked smart object. Currently we support Embedded Smart Object only.</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.layer.smartObject.instanceId",
            "description": "<p>Attribute for only Embedded Smart Object. Indicates instance id of this embedded smart object. This id is unique for different smart object instances. InstanceId may have value as &quot;unknown&quot;, if the embedded smart object is generated using any other application than adobe applications like PS, Lr etc. We are deriving the value 'InstanceID' from the RAW Data of the document.</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.layer.smartObject.path",
            "description": "<p>Attribute for only Linked Smart Object. Indicates the relative path for the Linked Smart Object.</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.fill",
            "description": "<p>An object describing the attributes specific to creating or editing a fill layer.</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.layers.layer.fill.solidColor",
            "description": "<p>An object describing the solid color type for this fill layer. Currently supported mode is RGB only.</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.layers.layer.fill.solidColor.rgb",
            "description": "<p>An object describing the rgb color format in 8 bits for this fill layer.</p>"
          },
          {
            "group": "Success 202",
            "type": "integer",
            "allowedValues": [
              "0..255"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.fill.solidColor.color.rgb.red",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "integer",
            "allowedValues": [
              "0..255"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.fill.solidColor.color.rgb.green",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "integer",
            "allowedValues": [
              "0..255"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.fill.solidColor.color.rgb.blue",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.text",
            "description": "<p>text settings</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.layer.text.content",
            "description": "<p>the text string</p>"
          },
          {
            "group": "Success 202",
            "type": "characterStyle[]",
            "optional": true,
            "field": "outputs.output.layers.layer.text.characterStyles",
            "description": "<p>characterStyle settings. If the same supported attributes apply to all characters in the layer than this will be an array of one item, otherwise each characterStyle object will have a 'from' and 'to' value indicating the range of characters that the style applies to.</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": true,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.from",
            "description": "<p>The beginning of the range of characters that this characterStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": true,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.to",
            "description": "<p>The ending of the range of characters that this characterStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Success 202",
            "type": "float",
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontSize",
            "description": "<p>in points</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontName",
            "description": "<p>the font's postscript name.  The list of supported fonts is at https://github.com/AdobeDocs/photoshop-api-docs/blob/master/SupportedFonts.md</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontAvailable",
            "description": "<p>is the font missing.</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"horizontal\"",
              "\"vertical\""
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.orientation",
            "description": "<p>the text orientation</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor",
            "description": "<p>the font color settings.It can be in one of the formats</p> <ul>   <li>rgb</li>   <li>cmyk</li>   <li>gray</li>   <li>lab</li> </ul>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.rgb",
            "description": "<p>the font color settings for rgb mode in 16bit repesentation</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.rgb.red",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.rgb.green",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.rgb.blue",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk",
            "description": "<p>the font color settings for cmyk mode in 16bit repesentation.</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.cyan",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.magenta",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.yellowColor",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.black",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.gray",
            "description": "<p>the font color settings for gray mode in 16bit repesentation.</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.gray.gray",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.lab",
            "description": "<p>the font color settings for lab mode in 16bit repesentation.</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.lab.luminance",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.lab.a",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.characterStyles.characterStyle.fontColor.lab.b",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "paragraphStyle[]",
            "optional": true,
            "field": "outputs.output.layers.layer.text.paragrapStyles",
            "description": "<p>paragrapStyles settings. If the same supported attributes apply to all characters in the layer than this will be an array of one item, otherwise each paragraphStyle object will have a 'from' and 'to' value indicating the range of characters that the style applies to.</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": true,
            "field": "outputs.output.layers.layer.text.paragrapStyles.paragraphStyle",
            "description": "<p>paragraph style settings</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": true,
            "field": "outputs.output.layers.layer.text.paragrapStyles.paragraphStyle.from",
            "description": "<p>The beginning of the range of characters that this paragraphStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": true,
            "field": "outputs.output.layers.layer.text.paragrapStyles.paragraphStyle.to",
            "description": "<p>The ending of the range of characters that this paragraphStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"left\"",
              "\"center\"",
              "\"right\"",
              "\"justify\"",
              "\"justifyLeft\"",
              "\"justifyCenter\"",
              "\"justifyRight\""
            ],
            "optional": false,
            "field": "outputs.output.layers.layer.text.paragrapStyles.paragraphStyle.alignment",
            "description": "<p>the paragraph alignment</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.errors",
            "description": "<p>any errors reported requested output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.type",
            "description": "<p>a machine readable error type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.code",
            "description": "<p>a machine readable error code</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.title",
            "description": "<p>a short human readable error summary</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": true,
            "field": "outputs.output.errors.errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: {xsd:nonNegativeInteger}\nLocation: \"https://image.adobe.io/pie/psdService/status/<:jobId>\"\n{\n    \"jobId\":\"<:jobId>\",\n    \"outputs\":[\n        {\n            \"input\":\"<input>\",\n            \"status\":\"<status>\",\n            \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n            \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n            \"document\":{\n                \"name\":\"<filename>\",\n                \"height\":<height>,\n                \"width\":<width>,\n                \"imageMode\":\"<imageMode>\",\n                \"photoshopBuild\": \"<string>\"\n            },\n            \"layers\":[\n                {\n                    \"id\":<layerd>,\n                    \"index\":<index>,\n                    \"name\":\"<name>\",\n                    \"type\":\"<type>\",\n                    \"locked\":<bool>,\n                    \"visible\":<bool>,\n                    \"thumbnail\":\"<href_thumbnail>\",\n                    \"mask\":{\n                        \"enabled\":<bool>,\n                        \"linked\":<bool>,\n                        \"offset\":{\n                            \"x\":<int>,\n                            \"y\":<int>\n                        },\n                        \"clip\":<bool>\n                    },\n                    \"smartObject\":{\n                      \"type\":<image_type>,\n                      \"linked\":<bool>,\n                      \"name\" : <name>,\n                      \"instanceId\" : <instanceId>,\n                      \"path\":<relative path for a linked smart object>\n                    },\n                    \"fill\":{\n                      \"solidColor\":{\n                        \"rgb\" : {\n                          \"red\":<8 bit int>,\n                          \"green\":<8 bit int>,\n                          \"blue\":<8 bit int>\n                        }\n                      }\n                    },\n                    \"children\":[\n\n                    ],\n                    \"bounds\":{\n                        \"top\":<top>,\n                        \"left\":<left>,\n                        \"width\":<width>,\n                        \"height\":<height>\n                    },\n                    \"blendOptions\": {\n                       \"blendMode\": <blendMode>,\n                       \"opacity\": <opacity>\n                    },\n                    \"text\":{\n                        \"content\":\"<text contents>\",\n                        \"characterStyles\":[\n                            {\n                                \"from\":<int>,\n                                \"to\":<int>,\n                                \"text\":\"<text>\",\n                                \"fontSize\":<fontSize>,\n                                \"fontName\":\"<fontName>\",\n                                \"fontAvailable\":<bool>,\n                                \"orientation\":\"<orientation>\",\n                                \"fontColor\":{\n                                    \"rgb\":{\n                                        \"red\":<16 bit integer>,\n                                        \"green\":<16 bit integer>,\n                                        \"blue\":<16 bit integer>\n                                    }\n                                }\n                            }\n                        ],\n                        \"paragraphStyles\":[\n                            {\n                                \"alignment\":\"<alignment>\",\n                                \"from\":<int>,\n                                \"to\":<int>\n                            }\n                        ]\n                    },\n                    \"adjustements\":{\n                        \"brightnessContrast\":{\n                            \"brightness\":<-150..150>,\n                            \"contrast\":<-150..150>\n                        },\n                        \"exposure\":{\n                            \"exposure\":<-20...20>,\n                            \"offset\":<-0.5...0.5>,\n                            \"gammaCorrection\":<0.01...9.99>\n                        },\n                        \"colorBalance\":{\n                            \"preserveLuminosity\":true,\n                            \"shadowLevels\":[\n                                <-100...100>,\n                                <-100...100>,\n                                <-100...100>\n                            ],\n                            \"midtoneLevels\":[\n                                <-100...100>,\n                                <-100...100>,\n                                <-100...100>\n                            ],\n                            \"highlightLevels\":[\n                                <-100...100>,\n                                <-100...100>,\n                                <-100...100>\n                            ]\n                        },\n                        \"hueSaturation\":{\n                            \"channels\":[\n                                {\n                                    \"channel\":\"master\",\n                                    \"hue\":<180...180>,\n                                    \"saturation\":<-100...100>,\n                                    \"lightness\":<-100...100>\n                                }\n                            ],\n                            \"colorize\":false\n                        }\n                    }\n                }\n            ]\n        },\n        {\n            \"input\":\"<href>\",\n            \"status\":\"<status>\",\n            \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n            \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n            \"errors\":{\n                \"type\":\"<errorType>\",\n                \"title\":\"<errorDescription>\",\n                \"code\":\"<errorCode>\",\n                \"<errorDetails>\":[\n                    {\n                        \"name\":\"<paramName>\",\n                        \"reason\":\"<error>\"\n                    }\n                ]\n            }\n        }\n    ],\n    \"_links\":{\n        \"self\":{\n            \"href\":\"https://image.adobe.io/pie/psdService/status/<:jobId>\"\n        }\n    }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 2509\nLocation: \"https://image.adobe.io/pie/psdService/status/<:jobId>\"\n{\n  \"jobId\": \"5b0ac5d9-5b1a-4f1c-ac69-22fe8a40a037\",\n  \"outputs\": [{\n    \"input\": \"/files/some_project/design.psd\",\n    \"status\": \"succeeded\",\n    \"created\": \"2018-01-04T12:57:15.12345Z\",\n    \"modified\": \"2018-01-04T12:58:36.12345Z\",\n    \"document\": {\n      \"name\": \"design.psd\",\n      \"height\": 2100,\n      \"width\": 1500,\n      \"imageMode\": \"rgb\"\n    },\n    \"layers\": [{\n        \"id\": 44,\n        \"index\": 12,\n        \"type\": \"adjustmentLayer\",\n        \"name\": \"AdjustmentLayer\",\n        \"locked\": true,\n        \"visible\": true,\n        \"thumbnail\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n        \"bounds\": {\n          \"top\": \"0\",\n          \"left\": \"0\",\n          \"width\": \"0\",\n          \"height\": \"0\"\n        }\n      },\n      {\n        \"id\": 38,\n        \"locked\": false,\n        \"name\": \"SO Layer\",\n        \"type\": \"smartObject\",\n        \"visible\": true,\n        \"add\": {\n          \"insertTop\": true\n        },\n        \"smartObject\": {\n          \"type\": \"image/jpeg\",\n          \"linked\": false,\n          \"instanceId\" : \"46458af3-8eb0-487a-971b-8de9f6f01005\",\n          \"name\" : \"Puppy.jpg\"\n        }\n      },\n      {\n        \"id\": 34,\n        \"index\": 11,\n        \"type\": \"layer\",\n        \"name\": \"TopLayer\",\n        \"locked\": false,\n        \"visible\": true,\n        \"thumbnail\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n        \"bounds\": {\n          \"top\": \"140\",\n          \"left\": \"1330\",\n          \"width\": \"677\",\n          \"height\": \"632\"\n        }\n      },\n      {\n        \"id\": 32,\n        \"index\": 10,\n        \"type\": \"layerSection\",\n        \"name\": \"GroupLayer\",\n        \"locked\": true,\n        \"visible\": true,\n        \"thumbnail\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n        \"bounds\": {\n          \"top\": \"0\",\n          \"left\": \"0\",\n          \"width\": \"0\",\n          \"height\": \"0\"\n        },\n        \"children\": [{\n            \"id\": 64,\n            \"index\": 9,\n            \"type\": \"fillLayer\",\n            \"name\": \"FillLayer\",\n            \"locked\": false,\n            \"visible\": false,\n            \"bounds\": {\n              \"top\": \"0\",\n              \"left\": \"0\",\n              \"width\": \"0\",\n              \"height\": \"0\"\n            },\n            \"fill\": {\n              \"solidColor\": {\n                \"rgb\": {\n                  \"red\": 0,\n                  \"green\": 255,\n                  \"blue\": 255\n                }\n              }\n            },\n            \"blendOptions\": {\n              \"opacity\": 90,\n              \"blendMode\": \"normal\"\n            }\n          },\n          {\n            \"id\": 44,\n            \"index\": 9,\n            \"type\": \"smartObject\",\n            \"name\": \"SDK_PSD\",\n            \"locked\": false,\n            \"visible\": true,\n            \"thumbnail\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n            \"bounds\": {\n              \"top\": \"1169\",\n              \"left\": \"1757\",\n              \"width\": \"343\",\n              \"height\": \"331\"\n            }\n          },\n          {\n            \"id\": 60,\n            \"index\": 8,\n            \"type\": \"layer\",\n            \"name\": \"HiddenLayer\",\n            \"locked\": false,\n            \"visible\": false,\n            \"bounds\": {\n              \"top\": \"0\",\n              \"left\": \"0\",\n              \"width\": \"0\",\n              \"height\": \"0\"\n            }\n          },\n          {\n            \"id\": 66,\n            \"index\": 7,\n            \"type\": \"layerSection\",\n            \"name\": \"NestedGroup\",\n            \"locked\": true,\n            \"visible\": true,\n            \"mask\": {\n              \"enabled\": false,\n              \"linked\": true,\n              \"offset\": {\n                \"x\": 70,\n                \"y\": 50\n              },\n              \"clip\": true\n            },\n            \"thumbnail\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n            \"bounds\": {\n              \"top\": \"0\",\n              \"left\": \"0\",\n              \"width\": \"0\",\n              \"height\": \"0\"\n            },\n            \"children\": [{\n                \"id\": 53,\n                \"index\": 6,\n                \"type\": \"textLayer\",\n                \"name\": \"AreaTextLayer\",\n                \"locked\": true,\n                \"visible\": true,\n                \"thumbnail\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n                \"bounds\": {\n                  \"top\": \"265\",\n                  \"left\": \"155\",\n                  \"width\": \"470\",\n                  \"height\": \"317\"\n                },\n                \"text\": {\n                  \"content\": \"My Text String\",\n                  \"characterStyles\": [{\n                    \"fontSize\": 12.5,\n                    \"fontName\": \"Arial\",\n                    \"fontAvailable\": true,\n                    \"orientation\": \"horizontal\",\n                    \"fontColor\": {\n                      \"rgb\": {\n                        \"red\": 26086,\n                        \"green\": 23002,\n                        \"blue\": 8224\n                      }\n                    }\n                  }],\n                  \"paragraphStyles\": [{\n                    \"alignment\": \"justify\"\n                  }]\n                }\n              },\n              {\n                \"id\": 6,\n                \"index\": 5,\n                \"type\": \"textLayer\",\n                \"name\": \"PointTextLayer\",\n                \"locked\": true,\n                \"visible\": true,\n                \"thumbnail\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n                \"bounds\": {\n                  \"top\": \"55\",\n                  \"left\": \"158\",\n                  \"width\": \"154\",\n                  \"height\": \"50\"\n                },\n                \"text\": {\n                  \"content\": \"My Text String\",\n                  \"characterStyles\": [{\n                      \"from\": 0,\n                      \"to\": 5,\n                      \"fontSize\": 8,\n                      \"fontName\": \"Helvetica\",\n                      \"fontAvailable\": true,\n                      \"orientation\": \"horizontal\"\n                    },\n                    {\n                      \"from\": 6,\n                      \"to\": 13,\n                      \"fontSize\": 10,\n                      \"fontName\": \"Helvetica-bold\",\n                      \"fontAvailable\": true,\n                      \"orientation\": \"horizontal\"\n                    }\n                  ],\n                  \"paragraphStyles\": [{\n                      \"from\": 0,\n                      \"to\": 5,\n                      \"alignment\": \"right\"\n                    },\n                    {\n                      \"from\": 6,\n                      \"to\": 13,\n                      \"alignment\": \"center\"\n                    }\n                  ]\n                }\n              }\n            ]\n          },\n          {\n            \"id\": 39,\n            \"index\": 3,\n            \"type\": \"contentLayer\",\n            \"name\": \"ShapeLayer\",\n            \"locked\": false,\n            \"visible\": true,\n            \"thumbnail\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n            \"bounds\": {\n              \"top\": \"727\",\n              \"left\": \"91\",\n              \"width\": \"473\",\n              \"height\": \"380\"\n            }\n          },\n          {\n            \"id\": 2,\n            \"index\": 2,\n            \"type\": \"layer\",\n            \"name\": \"ImageLayer\",\n            \"locked\": true,\n            \"visible\": true,\n            \"thumbnail\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n            \"bounds\": {\n              \"top\": \"316\",\n              \"left\": \"702\",\n              \"width\": \"639\",\n              \"height\": \"791\"\n            }\n          }\n        ]\n      },\n      {\n        \"id\": 1,\n        \"index\": 0,\n        \"type\": \"backgroundLayer\",\n        \"name\": \"Background\",\n        \"locked\": false,\n        \"visible\": true,\n        \"thumbnail\": \"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n        \"bounds\": {\n          \"top\": \"0\",\n          \"left\": \"0\",\n          \"width\": \"2100\",\n          \"height\": \"1500\"\n        }\n      }\n    ]\n  }],\n  \"_links\": {\n    \"self\": {\n      \"href\": \"https://image.adobe.io/pie/psdService/status/5b0ac5d9-5b1a-4f1c-ac69-22fe8a40a037\"\n    }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Request: HTTP Example",
          "content": "GET /psdService/status/<:jobId> HTTP/1.1\nHost: image.adobe.io\nAuthorization: Bearer $token\nX-Api-Key: $api_key",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X GET https://image.adobe.io/pie/psdService/status/<:jobId>",
          "type": "curl"
        }
      ]
    },
    "filename": "docs-src/pre-release/get-document-manifest.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Inline Templated",
          "content": "// This is a templated example for when a requested job has failed\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"jobId\": \"<jobID\",\n  \"outputs\":[\n      {\n        \"input\":\"<href>\",\n        \"status\":\"<status>\",\n        \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"errors\":{\n          \"type\":\"<errorType>\",\n          \"title\":\"<errorDescription>\",\n          \"code\": \"\"<errorCode>\",\n          \"<errorDetails>\":[\n            {\n              \"name\":\"<paramName>\",\n              \"reason\":\"<error>\"\n            }\n          ]\n        }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Error-Response-Inline Example",
          "content": " // In this example the GET call to /status succeeds but one of the initiated jobs has failed\n\n HTTP/1.1 200 OK\n Content-Type: application/json\n Content-Length: {xsd:nonNegativeInteger}\n Location: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n {\n   \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n   \"outputs\":[\n      {\n         \"input\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"status\":\"failed\",\n         \"created\":\"2018-01-04T12:57:15.12345Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345Z\",\n         \"error\":{\n            \"type\":\"FileExistsError\",\n            \"title\":\"input file does not exist\",\n            \"code\":\"400\"\n         }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/pie/psdService/documentCreate",
    "title": "document create",
    "description": "<p>Initiates an asynchronous job to create a new psd, optionaly with layers, and then generate renditions and/or save as a psd</p>",
    "version": "1.0.0",
    "name": "document_create",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options",
            "description": "<p>available options to apply to all input files</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"useDefault\"",
              "\"fail\""
            ],
            "optional": false,
            "field": "options.manageMissingFonts",
            "defaultValue": "useDefault",
            "description": "<p>action to take if there are one or more missing fonts in the document</p> <ul>   <li>fail - The job will not succeed and the status will be set to \"failed\", with the details of the error provided in the \"details\" section in the status</li>   <li>useDefault - The job will succeed, however, by default all the missing fonts will be replaced with this font: ArialMT</li> </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.globalFont",
            "defaultValue": "nil",
            "description": "<p>options.globalFont The full postscript name of the font to be used as the global default for the document. This font will be used for any text layer which has a missing font and no other font has been specifically provided for that layer.<br/>If this font itself is missing, the option specified for <code>manageMissingFonts</code> from above will take effect.</p>"
          },
          {
            "group": "Request",
            "type": "font[]",
            "optional": true,
            "field": "options.fonts",
            "description": "<p>array of custom fonts needed in this document</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.fonts.font",
            "description": "<p>An object describing the input font to add or replace for a Text layer. Filename should be &lt;font_postscript_name&gt;.otf </br> If the font filename is not in the specified format above, font substitution will occur.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "options.fonts.font.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.fonts.font.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.document",
            "description": "<p>set of document level edits. Document level edits will always be applied AFTER layer level edits have been performed.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": false,
            "field": "options.document.height",
            "description": "<p>document height</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": false,
            "field": "options.document.width",
            "description": "<p>document width</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "72...300"
            ],
            "optional": false,
            "field": "options.document.resolution",
            "description": "<p>document resolution in pixels per inch</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"white\"",
              "\"backgroundColor\"",
              "\"transparent\""
            ],
            "optional": false,
            "field": "options.document.fill",
            "description": "<p>document fill</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"bitmap\"",
              "\"greyscale\"",
              "\"indexed\"",
              "\"rgb\"",
              "\"cmyk\"",
              "\"multichannel\"",
              "\"duotone\"",
              "\"lab\""
            ],
            "optional": false,
            "field": "options.document.mode",
            "description": "<p>color space</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "8",
              "16",
              "32"
            ],
            "optional": false,
            "field": "options.document.depth",
            "description": "<p>bit depth</p>"
          },
          {
            "group": "Request",
            "type": "layer[]",
            "optional": true,
            "field": "options.layers",
            "description": "<p>array of layer objects An array of layer objects representing the layers to be created, in the same order as provided (from top to bottom).</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer",
            "description": "<p>a layer object describing the layer.name and any desired attributes After successful completion of this async request please call <code>layers.read</code> in order to get a manifest with the layer indexes and layer id's. Currently supported layer types available for create are:</p> <ul>   <li>layer - a pixel layer</li>   <li>adjustmentLayer - an adjustment layer</li>   <li>textLayer - a text layer</li>   <li>fillLayer - a fill layer</li>   <li>smartObject - a smart object</li> </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"layer\"",
              "\"textLayer\"",
              "\"adjustmentLayer\"",
              "\"smartObject\"",
              "\"fillLayer\""
            ],
            "optional": false,
            "field": "options.layers.layer.type",
            "description": "<p>the layer type.</p> <ul>   <li>layer - a pixel layer</li>   <li>textLayer - a text layer</li>   <li>adjustmentLayer - an adjustment layer</li>   <li>smartObject - a smart object</li>   <li>fillLayer - a fill layer</li> </ul>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.layers.layer.input",
            "description": "<p>An object describing the input file to add or replace for a Pixel or Embedded Smart Object layer. Supported image types are PNG or JPEG. </br> Images support bounds. If the bounds do not reflect the width and height of the image the image will be resized to fit the bounds</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "options.layers.layer.input.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.layers.layer.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL</p> <ul>   <li>CC Storage hrefs can be either a single asset or a folder</li>   <li>CC Storage hrefs must be prepended with `/files`. The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li> </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.name",
            "description": "<p>the layer name.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.locked",
            "defaultValue": "false",
            "description": "<p>is the layer locked</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.visible",
            "defaultValue": "true",
            "description": "<p>is the layer visible</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.adjustments",
            "description": "<p>adjustment layer info</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.adjustments.brightnessContrast",
            "description": "<p>brightness and contrast ettings</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-150...150"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.brightnessContrast.brightness",
            "defaultValue": "0",
            "description": "<p>the adjustmentLayer's brightness:</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-150...150"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.brightnessContrast.contrast",
            "defaultValue": "0",
            "description": "<p>the adjustmentLayer's contrast:</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.adjustments.exposure",
            "description": "<p>exposure settings</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "-20.00...20.00"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.exposure.exposure",
            "defaultValue": "0.0",
            "description": "<p>the layer's exposure.</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "-0.5000...0.5000"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.exposure.offset",
            "defaultValue": "0.0",
            "description": "<p>the layer's offset.</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "0.01...9.99"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.exposure.gammaCorrection",
            "defaultValue": "1.0",
            "description": "<p>the layer's gammaCorrection.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation",
            "description": "<p>hue and saturation settings</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.colorize",
            "defaultValue": "false",
            "description": "<p>colorize</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.channels",
            "description": "<p>an array of hashes representing the 'master' channel (the remaining five channels of 'magentas', 'yellows', 'greens', etc are not yet supported)</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"master\""
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.channels.channel",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-180...180"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.channels.hue",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.channels.saturation",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.channels.lightness",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.adjustments.colorBalance",
            "description": "<p>color balance settings</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.adjustments.colorBalance.preserveLuminosity",
            "defaultValue": "true",
            "description": "<p>preserveLuminosity</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "allowedValues": [
              "-100...100"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.colorBalance.shadowLevels",
            "defaultValue": "[0,0,0",
            "description": "<p>array of 3 ints</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "allowedValues": [
              "-100...100"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.colorBalance.midtoneLevels",
            "defaultValue": "[0,0,0",
            "description": "<p>array of 3 ints</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "allowedValues": [
              "-100...100"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.colorBalance.highlightLevels",
            "defaultValue": "[0,0,0",
            "description": "<p>array of 3 ints</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.bounds",
            "description": "<p>the bounds of the layer. applicable for the following</p> <ul>   <li>layer - a pixel layer</li>   <li>adjustmentLayer - an adjustment layer</li>   <li>textLayer - a text layer</li>   <li>layerSection - a grouping layer</li>   <li>smartObject - a smart object</li>   <li>fillLayer - a fill layer</li> </ul>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.bounds.top",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.bounds.left",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "=4.00...32000.00"
            ],
            "optional": true,
            "field": "options.layers.layer.bounds.width",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "=4.00...32000.00"
            ],
            "optional": true,
            "field": "options.layers.layer.bounds.height",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.mask",
            "description": "<p>An object describing the input mask to be added or replaced to the layer.Supported mask type is Layer Mask. </br> The input file must be a greyscale image. </br> Supported file types are jpeg, png and psd.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.layers.layer.mask.input",
            "description": "<p>An object describing the input grayscale file to add or replace for a mask. Supported image types are PNG or JPEG or PSD.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.layers.layer.mask.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "options.layers.layer.mask.input.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.mask.clip",
            "description": "<p>Indicates if this is a clipped layer. A layer can't be clipped if it is the bottommost layer, a start/end of a layer set, or if base turns out to be end of group.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.mask.enabled",
            "defaultValue": "true",
            "description": "<p>Indicates a mask is enabled on that layer or not.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.mask.linked",
            "defaultValue": "true",
            "description": "<p>Indicates a mask is linked to the layer or not.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.mask.offset",
            "description": "<p>An object to specify mask offset on the layer.</p>"
          },
          {
            "group": "Request",
            "type": "integer",
            "optional": true,
            "field": "options.layers.layer.mask.offset.x",
            "defaultValue": "0",
            "description": "<p>Offset to indicate horizontal move of the mask.</p>"
          },
          {
            "group": "Request",
            "type": "integer",
            "optional": true,
            "field": "options.layers.layer.mask.offset.y",
            "defaultValue": "0",
            "description": "<p>Offset to indicate vertical move of the mask.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.smartObject",
            "description": "<p>An object describing the attributes specific to creating or editing a smartObject. </br> SmartObject properties need the input smart object file to operate on, which can be obtained from Input block. Currently we support Embedded Smart Object only.So this block is optional. If you are creating a Linked Smart Object, this is a required block.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.smartObject.linked",
            "defaultValue": "false",
            "description": "<p>Indicates if this Smart Object is linked. Currently we support Embedded Smart Object only which means &quot;linked = false&quot;.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.fill",
            "description": "<p>An object describing the attributes specific to creating or editing a fill layer.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.layers.layer.fill.solidColor",
            "description": "<p>An object describing the solid color fill for this fill layer. Currently supported mode is RGB only.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.layers.layer.fill.solidColor.rgb",
            "description": "<p>An object describing the rgb color format in 8 bits for this fill layer.</p>"
          },
          {
            "group": "Request",
            "type": "integer",
            "allowedValues": [
              "0..255"
            ],
            "optional": false,
            "field": "options.layers.layer.fill.solidColor.rgb.red",
            "description": ""
          },
          {
            "group": "Request",
            "type": "integer",
            "allowedValues": [
              "0..255"
            ],
            "optional": false,
            "field": "options.layers.layer.fill.solidColor.rgb.green",
            "description": ""
          },
          {
            "group": "Request",
            "type": "integer",
            "allowedValues": [
              "0..255"
            ],
            "optional": false,
            "field": "options.layers.layer.fill.solidColor.rgb.blue",
            "description": ""
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text",
            "description": "<p>text settings</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.layers.layer.text.content",
            "description": "<p>the text string</p>"
          },
          {
            "group": "Request",
            "type": "charactersStyle[]",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles",
            "description": "<p>characterStyle settings. If the same supported attributes apply to all characters in the layer than this will be an array of one item, otherwise each characterStyle object will have a 'from' and 'to' value indicating the range of characters that the style applies to.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.from",
            "description": "<p>The beginning of the range of characters that this characterStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.to",
            "description": "<p>The ending of the range of characters that this characterStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontSize",
            "description": "<p>in points</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontName",
            "description": "<p>the font's postscript name.  The list of supported fonts is at https://github.com/AdobeDocs/photoshop-api-docs/blob/master/SupportedFonts.md</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"horizontal\"",
              "\"vertical\""
            ],
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.orientation",
            "defaultValue": "horizontal",
            "description": "<p>the text orientation</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor",
            "description": "<p>the font color settings.It can be in one of the formats</p> <ul>   <li>rgb</li>   <li>cmyk</li>   <li>gray</li>   <li>lab</li> </ul>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.rgb",
            "description": "<p>the font color settings for rgb mode in 16bit repesentation</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.rgb.red",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.rgb.green",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.rgb.blue",
            "description": ""
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk",
            "description": "<p>the font color settings for cmyk mode in 16bit repesentation.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.cyan",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.magenta",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.yellowColor",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.black",
            "description": ""
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.gray",
            "description": "<p>the font color settings for gray mode in 16bit repesentation.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.gray.gray",
            "description": ""
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.lab",
            "description": "<p>the font color settings for lab mode in 16bit repesentation.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.lab.luminance",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.lab.a",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.lab.b",
            "description": ""
          },
          {
            "group": "Request",
            "type": "paragraphStyle[]",
            "optional": true,
            "field": "options.layers.layer.text.paragrapStyles",
            "description": "<p>paragrapStyles settings. If the same supported attributes apply to all characters in the layer than this will be an array of one item, otherwise each paragraphStyle object will have a 'from' and 'to' value indicating the range of characters that the style applies to.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.paragrapStyles.paragraphStyle",
            "description": "<p>paragraph style settings</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"left\"",
              "\"center\"",
              "\"right\"",
              "\"justify\"",
              "\"justifyLeft\"",
              "\"justifyCenter\"",
              "\"justifyRight\""
            ],
            "optional": true,
            "field": "options.layers.layer.text.paragrapStyles.paragraphStyle.alignment",
            "defaultValue": "left",
            "description": "<p>the paragraph alignment</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.text.paragrapStyles.paragraphStyle.from",
            "description": "<p>The beginning of the range of characters that this paragraphStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.text.paragrapStyles.paragraphStyle.to",
            "description": "<p>The ending of the range of characters that this characterStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.blendOptions",
            "description": "<p>Blend options of a layer, including opacity and blend mode</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..100"
            ],
            "optional": true,
            "field": "options.layers.layer.blendOptions.opacity",
            "description": "<p>Indicates the opacity value of a layer</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"normal\"",
              "\"dissolve\"",
              "\"darken\"",
              "\"multiply\"",
              "\"colorBurn\"",
              "\"linearBurn\"",
              "\"darkerColor\"",
              "\"lighten\"",
              "\"screen\"",
              "\"colorDodge\"",
              "\"linearDodge\"",
              "\"lighterColor\"",
              "\"overlay\"",
              "\"softLight\"",
              "\"hardLight\"",
              "\"vividLight\"",
              "\"linearLight\"",
              "\"pinLight\"",
              "\"hardMix\"",
              "\"difference\"",
              "\"exclusion\"",
              "\"subtract\"",
              "\"divide\"",
              "\"hue\"",
              "\"saturation\"",
              "\"color\"",
              "\"luminosity\""
            ],
            "optional": true,
            "field": "options.layers.layer.blendOptions.blendMode",
            "description": "<p>Blend mode of a layer</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.fillToCanvas",
            "defaultValue": "false",
            "description": "<p>Indicates if this layer needs to be proportionaly filled in to the entire canvas of the document. Applicable only to layer type=&quot;smartObject&quot; or layer type=&quot;layer&quot;.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"left\"",
              "\"center\"",
              "\"right\""
            ],
            "optional": true,
            "field": "options.layers.layer.horizontalAlign",
            "description": "<p>Indicates the horizontal position where this layer needs to be placed at. Applicable only to layer type=&quot;smartObject&quot; or layer type=&quot;layer&quot;.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"top\"",
              "\"center\"",
              "\"bottom\""
            ],
            "optional": true,
            "field": "options.layers.layer.verticalAlign",
            "description": "<p>Indicates the vertical position where this layer needs to be placed at. Applicable only to layer type=&quot;smartObject&quot; or layer type=&quot;layer&quot;.</p>"
          },
          {
            "group": "Request",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>An array of output objects</p>"
          },
          {
            "group": "Request",
            "type": "output",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>An object describing the requested file outputs (a new psd file or supported renditions)</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPUTURL..</p>  <ul>    <li>CC Storage hrefs</li>    <ul>      <li>Can be either a single asset or a folder</li>      <li>Must be prepended with `/files` or `/cloud-content` or `/assets`</li>      <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>      <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>      <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </ul>    <li>Template Tokens: At runtime these three tokens get replaced with their respective values... (FOR \"adobe\" STORED FILES ONLY)</li>    <ul>      <li>$ReqID - replaced with the request id generated by the service</li>      <li>$FileNum - replaced with an increment-by-1 counter, beginning at 0, so that each output file gets a unique number assigned </li>      <li>$FileName - replaced with file name minus the \".\" and file extension</li>    </ul>    <li>If the output path is a folder than the Template Tokens will be used to dynamically generate the output file name according to the pattern \"/files/&lt;path&gt;/$ReqID_$FileName_$FileNum.&lt;ext&gt;\"</li>  </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/png\"",
              "\"image/tiff\"",
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output.type",
            "description": "<p>desired image format.</p>  <ul>    <li>image/vnd.adobe.photoshop - Create a new PSD file</li>    <li>image/jpeg, image/png, image/tiff - Create a new jpeg, png or tiff rendition</li>  </ul>  Image mode coversions: </br></br>Certain image modes (rgb, cmyk, greyscale, etc) must be converted to another image mode before a rendition can be created:  <ul>    <li>Tiff Requested: Multichannel and Duotone will convert to RGB</li>    <li>PNG Requested: CMYK, HSL, HSB, Multichannel, Duotone, Lab and XYZ will convert to RGB</li>  </ul>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.output.width",
            "defaultValue": "0",
            "description": "<p>width, in pixels, of the renditions. Width of 0 generates a full size rendition.  Height is not necessary as the rendition generate will automatically figure out the correct width-to-height aspect ratio. Only supported for image renditions.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.output.maxWidth",
            "description": "<p>maxWidth (in pixels) of the renditions. When width is 0 and maxWidth is less than the width of the document, you get the final rendition size of maxWidth. Otherwise it will be a full size document rendition. If both width and maxWidth are provided then the lowest value gets the precedence. Height is not necessary as the API will automatically maintain the aspect ratio.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "outputs.output.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.output.quality",
            "defaultValue": "7",
            "description": "<p>quality of the renditions for JPEG. Range from 1 to 7, with 7 as the highest quality.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "outputs.output.compression",
            "defaultValue": "large",
            "description": "<p>compression level for PNG: small, medium or large.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"true\"",
              "\"false\""
            ],
            "optional": true,
            "field": "outputs.output.trimToCanvas",
            "defaultValue": "false",
            "description": "<p>'false' generates renditions that are the actual size of the layer (as seen by View &gt; Show &gt; Layer Edges within the Photoshop desktop app) but will remove any extra transparent pixel padding. 'true' generates renditions that are the size of the canvas, either trimming the layer to the visible portion of the canvas or padding extra space. If the requested file format supports transparency than transparent pixels will be used for padding, otherwise white pixels will be used.</p>"
          },
          {
            "group": "Request",
            "type": "layer[]",
            "optional": true,
            "field": "outputs.output.layers",
            "description": "<p>An array of layer objects.</br> By including this array you are signaling that you'd like a rendition created from these layer id's or layer names. Excluding it will generate a document-level rendition.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": false,
            "field": "outputs.output.layers.id",
            "description": "<p>the layer id</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.name",
            "description": "<p>the layer name.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "outputs.output.iccProfile",
            "description": "<p>An object describing the icc profile to convert to.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.iccProfile.imageMode",
            "description": "<p>the image mode</p> <ul>   <li>Allowed Value for iccProfile File</li>   <ul>       <li>grayscale</li>       <li>rgb</li>       <li>cmyk</li>   </ul> </ul> <ul>    <li>Allowed Value for iccProfile Name</li>    <ul>    <li>rgb</li>    <li>grayscale</li>    </ul> </ul>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "outputs.output.iccProfile.input",
            "description": "<p>An object describing the icc profile.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output.color.icc.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.iccProfile.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL.</p> <ul>   <li>Must be prepended with `/files` or `/cloud-content` or `/assets`</li>   <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>   <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>   <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li> </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"Adobe RGB (1998)\"",
              "\"Apple RGB\"",
              "\"ColorMatch RGB\"",
              "\"sRGB IEC61966-2.1\"",
              "\"Dot Gain 10%\"",
              "\"Dot Gain 15%\"",
              "\"Dot Gain 20%\"",
              "\"Dot Gain 25%\"",
              "\"Dot Gain 30%\"",
              "\"Gray Gamma 1.8\"",
              "\"Gray Gamma 2.2\""
            ],
            "optional": false,
            "field": "outputs.output.color.profileName",
            "description": "<p>the name of the color profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request: HTTP Templated",
          "content": "POST https://image.adobe.io/pie/psdService/documentCreate HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"options\":{\n      \"document\":{\n        \"height\": <int>,\n        \"width\": <int>,\n        \"resolution\": <72...300>,\n        \"mode\": <mode>,\n        \"fill\": <fill>,\n        \"depth\": <8,16,32>\n      },\n      \"manageMissingFonts\": \"<fail> or <useDefault>\",\n      \"globalFont\": \"<global_font_postscript_name>\",\n      \"fonts\": [\n        {\n          \"href\":\"<presigned_getURL> or <cc_storage_location>\",\n          \"storage\":\"<storage>\"\n        }\n      ],\n      \"layers\":[\n          {\n              \"type\":\"<type>\",\n              \"name\":\"<name>\",\n              \"locked\":<bool>,\n              \"visible\":<bool>,\n              \"input\":{\n                  \"href\":\"<presigned_getURL> or <cc_storage_location>\",\n                  \"storage\":\"<storage>\"\n              },\n              \"mask\":{\n                  \"input\":{\n                      \"href\":\"<presigned_getURL> or <cc_storage_location>\",\n                      \"storage\":\"<storage>\"\n                  },\n                  \"enabled\":<bool>,\n                  \"linked\":<bool>,\n                  \"offset\":{\n                      \"x\":<int>,\n                      \"y\":<int>\n                  },\n                  \"clip\":<bool>\n              },\n              \"smartObject\":{\n                \"linked\":<bool>\n              }\n              \"bounds\":{\n                  \"top\":<top>,\n                  \"left\":<left>,\n                  \"width\":<width>,\n                  \"height\":<height>\n              },\n              \"fill\":{\n                \"solidColor\":{\n                  \"rgb\" : {\n                    \"red\":<8 bit int>,\n                    \"green\":<8 bit int>,\n                    \"blue\":<8 bit int>\n                  }\n                }\n              },\n              \"text\":{\n                  \"content\":\"<text>\",\n                  \"characterStyles\":[\n                      {\n                          \"from\":<int>,\n                          \"to\":<int>,\n                          \"fontSize\":<fontSize>,\n                          \"fontName\":\"<fontName>\",\n                          \"orientation\":\"<orientation>\",\n                          \"fontColor\":{\n                              \"rgb\":{\n                                  \"red\":<16 bit integer>,\n                                  \"green\":<16 bit integer>,\n                                  \"blue\":<16 bit integer>\n                              }\n                          }\n                      }\n                  ],\n                  \"paragraphStyles\":[\n                      {\n                          \"from\":<int>,\n                          \"to\":<int>,\n                          \"alignment\":\"<alignment>\"\n                      }\n                  ]\n              },\n              \"adjustments\":{\n                  \"brightnessContrast\":{\n                      \"brightness\":<-150..150>,\n                      \"contrast\":<-150..150>\n                  },\n                  \"exposure\":{\n                      \"exposure\":<-20...20>,\n                      \"offset\":<-0.5...0.5>,\n                      \"gammaCorrection\":<0.01...9.99>\n                  },\n                  \"colorBalance\":{\n                      \"preserveLuminosity\":true,\n                      \"shadowLevels\":[\n                          <-100...100>,\n                          <-100...100>,\n                          <-100...100>\n                      ],\n                      \"midtoneLevels\":[\n                          <-100...100>,\n                          <-100...100>,\n                          <-100...100>\n                      ],\n                      \"highlightLevels\":[\n                          <-100...100>,\n                          <-100...100>,\n                          <-100...100>\n                      ]\n                  },\n                  \"hueSaturation\":{\n                      \"channels\":[\n                          {\n                              \"channel\":\"master\",\n                              \"hue\":<180...180>,\n                              \"saturation\":<-100...100>,\n                              \"lightness\":<-100...100>\n                          }\n                      ],\n                      \"colorize\":false\n                  }\n              },\n              \"blendOptions\": {\n                  \"opacity\":<int>,\n                  \"blendMode\": \"<blendMode>\"\n              }\n          }\n      ]\n  },\n  \"outputs\":[\n      {\n        \"href\":\"<cc_storage_location>\",\n        \"storage\":\"adobe\",\n        \"type\":\"<type>\",\n        \"width\":<width>,\n        \"overwrite\":<bool>,\n        \"trimToCanvas\":<bool>,\n        \"layers\":[\n            {\n                \"id\":<id>,\n                \"name\":<name>\n            }\n        ]\n      },\n      {\n        \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_putObject..\",\n        \"storage\":\"external\",\n        \"type\":\"image/vnd.adobe.photoshop\",\n        \"overwrite\":false\n      }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Request: HTTP Example",
          "content": "POST https://image.adobe.io/pie/psdService/documentCreate HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n   \"options\":{\n      \"document\":{\n        \"height\": 1000,\n        \"width\": 1000,\n        \"resolution\": 72,\n        \"mode\": \"rgb\",\n        \"fill\": \"transparent\",\n        \"depth\": 16\n      },\n      \"manageMissingFonts\": \"useDefault\",\n      \"globalFont\": \"MyriadPro-Bold\",\n      \"fonts\": [\n        {\n           \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n           \"storage\":\"external\"\n        }\n      ],\n      \"layers\":[\n         {\n            \"name\":\"new adjustment layer\",\n            \"type\":\"adjustmentLayer\",\n            \"visible\":true,\n            \"adjustments\":{\n               \"brightnessContrast\":{\n                  \"brightness\":-23,\n                  \"contrast\":15\n               }\n            }\n         },\n         {\n           \"name\":\"new content layer\",\n           \"type\":\"fillLayer\",\n           \"visible\":true,\n           \"fill\":{\n             \"solidColor\":{\n               \"rgb\" : {\n                 \"red\":0,\n                 \"green\":255,\n                 \"blue\":255\n               }\n             }\n           },\n           \"blendOptions\":{\n             \"opacity\":90,\n             \"blendMode\":\"normal\"\n           }\n         },\n         {\n            \"locked\":false,\n            \"name\":\"SO Layer\",\n            \"type\":\"smartObject\",\n            \"visible\":true,\n            \"input\":{\n               \"href\":\"files/input/Simple.psd\",\n               \"storage\":\"adobe\"\n            },\n            \"smartObject\":{\n               \"linked\":false\n            }\n         },\n         {\n            \"type\":\"textLayer\",\n            \"name\":\"my text layer\",\n            \"locked\":true,\n            \"visible\":true,\n            \"bounds\":{\n               \"top\":50,\n               \"left\":100,\n               \"width\":500,\n               \"height\":450\n            },\n            \"text\":{\n               \"content\":\"NEW TEXT CHANGES\",\n               \"characterStyles\":[\n                  {\n                     \"fontSize\":12.5,\n                     \"fontName\":\"Arial-BoldMT\",\n                     \"orientation\":\"horizontal\",\n                     \"fontColor\":{\n                        \"rgb\":{\n                           \"red\":26086,\n                           \"green\":23002,\n                           \"blue\":8224\n                        }\n                     }\n                  }\n               ],\n               \"paragraphStyles\":[\n                  {\n                     \"alignment\":\"left\"\n                  }\n               ]\n            },\n            \"blendOptions\":{\n               \"opacity\":90,\n               \"blendMode\":\"normal\"\n            }\n         },\n         {\n            \"name\":\"New Exposure Layer\",\n            \"type\":\"adjustmentLayer\",\n            \"locked\":false,\n            \"visible\":true,\n            \"adjustments\":{\n               \"exposure\":{\n                  \"exposure\":0.25,\n                  \"offset\":0.0049,\n                  \"gammaCorrection\":1.38\n               }\n            }\n         },\n         {\n            \"type\":\"adjustmentLayer\",\n            \"name\":\"Color Balance\",\n            \"locked\":false,\n            \"visible\":true,\n            \"mask\":{\n               \"input\":{\n                  \"href\":\"files/abc.psd\",\n                  \"storage\":\"adobe\"\n               },\n               \"enabled\":false,\n               \"linked\":true,\n               \"offset\":{\n                  \"x\":70,\n                  \"y\":50\n               },\n               \"clip\":true\n            },\n            \"adjustments\":{\n               \"colorBalance\":{\n                  \"shadowLevels\":[\n                     0,\n                     10,\n                     20\n                  ],\n                  \"preserveLuminosity\":true,\n                  \"midtoneLevels\":[\n                     30,\n                     40,\n                     50\n                  ],\n                  \"highlightLevels\":[\n                     60,\n                     70,\n                     80\n                  ]\n               }\n            }\n         },\n         {\n            \"name\":\"new Image layer\",\n            \"type\":\"layer\",\n            \"visible\":true,\n            \"input\":{\n               \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n               \"storage\":\"external\"\n            }\n         },\n         {\n            \"type\":\"adjustmentLayer\",\n            \"name\":\"Hue Saturation\",\n            \"locked\":false,\n            \"visible\":true,\n            \"adjustements\":{\n               \"hueSaturation\":{\n                  \"channels\":[\n                     {\n                        \"channel\":\"master\",\n                        \"hue\":-5,\n                        \"saturation\":20,\n                        \"lightness\":0\n                     }\n                  ],\n                  \"colorize\":false\n               }\n            }\n         },\n         {\n            \"type\":\"backgroundLayer\",\n            \"locked\":true,\n            \"visible\":true,\n            \"name\":\"Background\"\n         }\n      ]\n   },\n   \"outputs\":[\n      {\n         \"href\":\"/files/some_project/output/design_$ReqID_$FileName.psd\",\n         \"storage\":\"adobe\",\n         \"type\":\"image/jpeg\",\n         \"width\":500,\n         \"overwrite\":true,\n         \"trimToCanvas\":false,\n         \"layers\":[\n            {\n               \"id\":77\n            }\n         ]\n      },\n      {\n         \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_putObject..\",\n         \"storage\":\"external\",\n         \"type\":\"image/vnd.adobe.photoshop\",\n         \"overwrite\":false\n      }\n   ]\n}",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X POST -d '{\"options\":{\"layers\":[{<layer_info>}]},\"outputs\":[{\"href\":\"<href>\",\"storage\":\"<storage>\",\"type\":\"<type>\",\"width\":<width>,\"overwrite\":<bool>},{\"external\":<presigned_putURL>\",\"type\":\"<type>\",\"width\":<width>,\"overwrite\":\"<overwrite>\"}]}' https://image.adobe.io/pie/psdService/documentCreate",
          "type": "curl"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links.self",
            "description": "<p>The link to GET the job status from</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links",
            "description": "<p>any link the client follow, described by their relationship</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/<:jobId>\" }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 682\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\" }\n  }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-document-create.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>402: TrialLimitExceededError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        },
        {
          "title": "Response: TrialLimitExceededError Example:",
          "content": " // This is an example for when quota assigned is already used.\n HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/pie/psdService/documentOperations",
    "title": "document operations",
    "description": "<p>Initiates an asynchronous job to apply (optional) psd edits and then generate renditions and/or save a new psd</p>",
    "version": "1.0.0",
    "name": "document_operations",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "input[]",
            "optional": false,
            "field": "inputs",
            "description": "<p>An array of input objects. We currently only support one input object.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "inputs.input",
            "description": "<p>An object describing an input PSD file.Current support is for files less than 1000MB.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options",
            "description": "<p>available options to apply to all input files</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"useDefault\"",
              "\"fail\""
            ],
            "optional": false,
            "field": "options.manageMissingFonts",
            "defaultValue": "useDefault",
            "description": "<p>action to take if there are one or more missing fonts in the document</p> <ul>   <li>fail - The job will not succeed and the status will be set to \"failed\", with the details of the error provided in the \"details\" section in the status</li>   <li>useDefault - The job will succeed, however, by default all the missing fonts will be replaced with this font: ArialMT</li> </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.globalFont",
            "defaultValue": "nil",
            "description": "<p>options.globalFont The full postscript name of the font to be used as the global default for the document. This font will be used for any text layer which has a missing font and no other font has been specifically provided for that layer.<br/>If this font itself is missing, the option specified for <code>manageMissingFonts</code> from above will take effect.</p>"
          },
          {
            "group": "Request",
            "type": "font[]",
            "optional": true,
            "field": "options.fonts",
            "description": "<p>array of custom fonts needed in this document</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.fonts.font",
            "description": "<p>An object describing the input font to add or replace for a Text layer. Filename should be &lt;font_postscript_name&gt;.otf </br> If the font filename is not in the specified format above, font substitution will occur.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "options.fonts.font.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.fonts.font.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.document",
            "description": "<p>set of document level edits. Document level edits will always be applied AFTER layer level edits have been performed.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.document.canvasSize",
            "description": "<p>crop parameters</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.document.canvasSize.bounds",
            "description": "<p>the bounds to crop the document.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..."
            ],
            "optional": true,
            "field": "options.document.canvasSize.bounds.top",
            "description": "<p>in pixels, y co-ordinate of top left of the document</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..."
            ],
            "optional": true,
            "field": "options.document.canvasSize.bounds.left",
            "description": "<p>in pixels, x co-ordinate top left of the document</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..."
            ],
            "optional": true,
            "field": "options.document.canvasSize.bounds.bottom",
            "description": "<p>in pixels, y co-ordinate of bottom right of the document</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..."
            ],
            "optional": true,
            "field": "options.document.canvasSize.bounds.right",
            "description": "<p>in pixels, x co-ordinate bottom right of the document</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.document.imageSize",
            "description": "<p>resize parameters. resizing a PSD always maintains the original aspect ratio by default. If the new width &amp; height values specified in the parameters does not match the original aspect ratio, then the specified height will not be used and the height will be determined automatically.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": false,
            "field": "options.document.imageSize.height",
            "description": "<p>resize height</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": false,
            "field": "options.document.imageSize.width",
            "description": "<p>resize width</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.document.trim",
            "description": "<p>image trim parameters.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"transparentPixels\""
            ],
            "optional": false,
            "field": "options.document.trim.basedOn",
            "defaultValue": "transparentPixels",
            "description": ""
          },
          {
            "group": "Request",
            "type": "layer[]",
            "optional": true,
            "field": "options.layers",
            "description": "<p>array of layer objects An array of layer objects you wish to act upon (edit, add, delete). Any layer missing an &quot;operations&quot; block will be ignored.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.layers.layer",
            "description": "<p>a layer object describing the layer.id and any desired attribute changes</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.edit",
            "description": "<p>Indicates you want to edit the layer identified by it's id or name. Note the object is currently empty but leaves room for futher enhancements. The layer block should than contain changes from the original manifest. If you apply it to a group layer you will be effecting the attributes of the group layer itself, not the child layers</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.move",
            "description": "<p>Inidicates you want to move the layer identified by it's id or name. You must also indicate where you want to move the layer by supplying one of the attributes <code>insertAbove</code>, <code>insertBelow</code>, <code>insertInto</code>, <code>insertTop</code> or <code>insertBottom</code></p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.move.moveChildren",
            "defaultValue": "true",
            "description": "<p>If layer is a group layer than true = move the set as a unit. Otherwise an empty group is moved and any children are left where they were, ungrouped.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.move.insertAbove",
            "description": "<p>Used to move the layer above another. If the layer ID indicated is a group layer than the layer will be inserted above the group layer.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.move.insertAbove.id",
            "description": "<p>The id of the layer you want to move above. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.move.insertAbove.name",
            "description": "<p>The name of the layer you want to move above. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.move.insertBelow",
            "description": "<p>Used to move the layer below another. If the layer ID indicated is a group layer than the layer will be inserted below (and outside of) the group layer</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.move.insertBelow.id",
            "description": "<p>The id of the layer you want to move below. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.move.insertBelow.name",
            "description": "<p>The name of the layer you want to move below. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.move.insertInto",
            "description": "<p>Used to move the layer inside of a group. Useful when you need to move a layer to an empty group.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.move.insertInto.id",
            "description": "<p>The id of the group layer you want to move into. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.move.insertInto.name",
            "description": "<p>The name of the group layer you want to move into. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.move.insertTop",
            "description": "<p>Indicates the layer should be moved at the top of the layer stack.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.move.insertBottom",
            "description": "<p>Indicates the layer should be moved at the bottom of the layer stack. If the image has a background image than the new layer will be inserted above it instead.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.add",
            "description": "<p>Inidicates you want to add a new layer. You must also indicate where you want to insert the new layer by supplying one of the attributes <code>insertAbove</code>, <code>insertBelow</code>, <code>insertInto</code>, <code>insertTop</code> or <code>insertBottom</code> After successful completion of this async request please call <code>layers.read</code> again in order to get a refreshed manifest with the latest layer indexes and any new layer id's. Currently supported layer types available for add are:</p> <ul>   <li>layer - a pixel layer</li>   <li>adjustmentLayer - an adjustment layer</li>   <li>textLayer - a text layer</li>   <li>fillLayer - a fill layer</li> </ul>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.add.insertAbove",
            "description": "<p>Used to add the layer above another. If the layer ID indicated is a group layer than the layer will be inserted above the group layer.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.add.insertAbove.id",
            "description": "<p>The id of the layer you want to insert above. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.add.insertAbove.name",
            "description": "<p>The name of the layer you want to insert above. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.add.insertBelow",
            "description": "<p>Used to add the layer below another. If the layer ID indicated is a group layer than the layer will be inserted below (and outside of) the group layer</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.add.insertBelow.id",
            "description": "<p>The id of the layer you want to insert below. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.add.insertBelow.name",
            "description": "<p>The name of the layer you want to insert below. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.add.insertInto",
            "description": "<p>Used to add the layer inside of a group. Useful when you need to move a layer to an empty group.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.add.insertInto.id",
            "description": "<p>The id of the group layer you want to insert into. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.add.insertInto.name",
            "description": "<p>The name of the group layer you want to insert into. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.delete",
            "description": "<p>Indicates you want to delete the layer, including any children, identified by the id or name. Note the object is currently empty but leaves room for futher enhancements.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": false,
            "field": "options.layers.layer.id",
            "description": "<p>the layer id</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.index",
            "description": "<p>the layer index. Required when deleting a layer, otherwise not used</p>"
          },
          {
            "group": "Request",
            "type": "layer[]",
            "optional": false,
            "field": "options.layers.layer.children",
            "description": "<p>an array of nested layer objects. Only layerSections (group layers) can include children</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"layer\"",
              "\"textLayer\"",
              "\"adjustmentLayer\"",
              "\"smartObject\"",
              "\"fillLayer\"",
              "\"backgroundLayer\""
            ],
            "optional": false,
            "field": "options.layers.layer.type",
            "description": "<p>the layer type.</p> <ul>   <li>layer - a pixel layer</li>   <li>textLayer - a text layer</li>   <li>adjustmentLayer - an adjustment layer</li>   <li>layerSection - a grouping layer</li>   <li>smartObject - a smart object</li>   <li>backgroundLayer - a background layer</li>   <li>fillLayer - a fill layer</li> </ul>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.layers.layer.input",
            "description": "<p>An object describing the input file to add or replace for a Pixel or Embedded Smart Object layer. Supported image types are PNG or JPEG. </br> Added images are always placed at (top,left = 0,0) and bounds are ignored </br> Edited images support bounds. If the bounds do not reflect the width and height of the image the image will be resized to fit the bounds</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "options.layers.layer.input.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.layers.layer.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL</p> <ul>   <li>CC Storage hrefs can be either a single asset or a folder</li>   <li>CC Storage hrefs must be prepended with `/files`. The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li> </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.name",
            "description": "<p>the layer name.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.locked",
            "defaultValue": "false",
            "description": "<p>is the layer locked</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.visible",
            "defaultValue": "true",
            "description": "<p>is the layer visible</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.adjustments",
            "description": "<p>adjustment layer info</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.adjustments.brightnessContrast",
            "description": "<p>brightness and contrast ettings</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-150...150"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.brightnessContrast.brightness",
            "defaultValue": "0",
            "description": "<p>the adjustmentLayer's brightness:</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-150...150"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.brightnessContrast.contrast",
            "defaultValue": "0",
            "description": "<p>the adjustmentLayer's contrast:</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.adjustments.exposure",
            "description": "<p>exposure settings</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "-20.00...20.00"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.exposure.exposure",
            "defaultValue": "0.0",
            "description": "<p>the layer's exposure.</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "-0.5000...0.5000"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.exposure.offset",
            "defaultValue": "0.0",
            "description": "<p>the layer's offset.</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "0.01...9.99"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.exposure.gammaCorrection",
            "defaultValue": "1.0",
            "description": "<p>the layer's gammaCorrection.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation",
            "description": "<p>hue and saturation settings</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.colorize",
            "defaultValue": "false",
            "description": "<p>colorize</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.channels",
            "description": "<p>an array of hashes representing the 'master' channel (the remaining five channels of 'magentas', 'yellows', 'greens', etc are not yet supported)</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"master\""
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.channels.channel",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-180...180"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.channels.hue",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.channels.saturation",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "-100...100"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.hueSaturation.channels.lightness",
            "defaultValue": "0",
            "description": ""
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.adjustments.colorBalance",
            "description": "<p>color balance settings</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.adjustments.colorBalance.preserveLuminosity",
            "defaultValue": "true",
            "description": "<p>preserveLuminosity</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "allowedValues": [
              "-100...100"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.colorBalance.shadowLevels",
            "defaultValue": "[0,0,0",
            "description": "<p>array of 3 ints</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "allowedValues": [
              "-100...100"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.colorBalance.midtoneLevels",
            "defaultValue": "[0,0,0",
            "description": "<p>array of 3 ints</p>"
          },
          {
            "group": "Request",
            "type": "array",
            "allowedValues": [
              "-100...100"
            ],
            "optional": true,
            "field": "options.layers.layer.adjustments.colorBalance.highlightLevels",
            "defaultValue": "[0,0,0",
            "description": "<p>array of 3 ints</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.bounds",
            "description": "<p>the bounds of the layer. applicable for the following</p> <ul>   <li>layer - a pixel layer</li>   <li>adjustmentLayer - an adjustment layer</li>   <li>textLayer - a text layer</li>   <li>layerSection - a grouping layer</li>   <li>smartObject - a smart object</li>   <li>fillLayer - a fill layer</li> </ul>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.bounds.top",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.bounds.left",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "=4.00...32000.00"
            ],
            "optional": true,
            "field": "options.layers.layer.bounds.width",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "=4.00...32000.00"
            ],
            "optional": true,
            "field": "options.layers.layer.bounds.height",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.mask",
            "description": "<p>An object describing the input mask to be added or replaced to the layer.Supported mask type is Layer Mask. </br> The input file must be a greyscale image. </br> Supported file types are jpeg, png and psd.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.layers.layer.mask.input",
            "description": "<p>An object describing the input grayscale file to add or replace for a mask. Supported image types are PNG or JPEG or PSD.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.layers.layer.mask.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "options.layers.layer.mask.input.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.mask.clip",
            "description": "<p>Indicates if this is a clipped layer. A layer can't be clipped if it is the bottommost layer, a start/end of a layer set, or if base turns out to be end of group.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.mask.enabled",
            "defaultValue": "true",
            "description": "<p>Indicates a mask is enabled on that layer or not.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.mask.linked",
            "defaultValue": "true",
            "description": "<p>Indicates a mask is linked to the layer or not.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.mask.offset",
            "description": "<p>An object to specify mask offset on the layer.</p>"
          },
          {
            "group": "Request",
            "type": "integer",
            "optional": true,
            "field": "options.layers.layer.mask.offset.x",
            "defaultValue": "0",
            "description": "<p>Offset to indicate horizontal move of the mask.</p>"
          },
          {
            "group": "Request",
            "type": "integer",
            "optional": true,
            "field": "options.layers.layer.mask.offset.y",
            "defaultValue": "0",
            "description": "<p>Offset to indicate vertical move of the mask.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.smartObject",
            "description": "<p>An object describing the attributes specific to creating or editing a smartObject. </br> SmartObject properties need the input smart object file to operate on, which can be obtained from Input block. Currently we support Embedded Smart Object only.So this block is optional. If you are creating a Linked Smart Object, this is a required block.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.smartObject.linked",
            "defaultValue": "false",
            "description": "<p>Indicates if this Smart Object is linked. Currently we support Embedded Smart Object only which means &quot;linked = false&quot;.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.fill",
            "description": "<p>An object describing the attributes specific to creating or editing a fill layer.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.layers.layer.fill.solidColor",
            "description": "<p>An object describing the solid color fill for this fill layer. Currently supported mode is RGB only.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.layers.layer.fill.solidColor.rgb",
            "description": "<p>An object describing the rgb color format in 8 bits for this fill layer.</p>"
          },
          {
            "group": "Request",
            "type": "integer",
            "allowedValues": [
              "0..255"
            ],
            "optional": false,
            "field": "options.layers.layer.fill.solidColor.rgb.red",
            "description": ""
          },
          {
            "group": "Request",
            "type": "integer",
            "allowedValues": [
              "0..255"
            ],
            "optional": false,
            "field": "options.layers.layer.fill.solidColor.rgb.green",
            "description": ""
          },
          {
            "group": "Request",
            "type": "integer",
            "allowedValues": [
              "0..255"
            ],
            "optional": false,
            "field": "options.layers.layer.fill.solidColor.rgb.blue",
            "description": ""
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text",
            "description": "<p>text settings</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.layers.layer.text.content",
            "description": "<p>the text string</p>"
          },
          {
            "group": "Request",
            "type": "charactersStyle[]",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles",
            "description": "<p>characterStyle settings. If the same supported attributes apply to all characters in the layer than this will be an array of one item, otherwise each characterStyle object will have a 'from' and 'to' value indicating the range of characters that the style applies to.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.from",
            "description": "<p>The beginning of the range of characters that this characterStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.to",
            "description": "<p>The ending of the range of characters that this characterStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontSize",
            "description": "<p>in points</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontName",
            "description": "<p>the font's postscript name.  The list of supported fonts is at https://github.com/AdobeDocs/photoshop-api-docs/blob/master/SupportedFonts.md</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"horizontal\"",
              "\"vertical\""
            ],
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.orientation",
            "defaultValue": "horizontal",
            "description": "<p>the text orientation</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor",
            "description": "<p>the font color settings.It can be in one of the formats</p> <ul>   <li>rgb</li>   <li>cmyk</li>   <li>gray</li>   <li>lab</li> </ul>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.rgb",
            "description": "<p>the font color settings for rgb mode in 16bit repesentation</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.rgb.red",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.rgb.green",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.rgb.blue",
            "description": ""
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk",
            "description": "<p>the font color settings for cmyk mode in 16bit repesentation.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.cyan",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.magenta",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.yellowColor",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.cmyk.black",
            "description": ""
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.gray",
            "description": "<p>the font color settings for gray mode in 16bit repesentation.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.gray.gray",
            "description": ""
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.lab",
            "description": "<p>the font color settings for lab mode in 16bit repesentation.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.lab.luminance",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.lab.a",
            "description": ""
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..32768"
            ],
            "optional": false,
            "field": "options.layers.layer.text.characterStyles.characterStyle.fontColor.lab.b",
            "description": ""
          },
          {
            "group": "Request",
            "type": "paragraphStyle[]",
            "optional": true,
            "field": "options.layers.layer.text.paragrapStyles",
            "description": "<p>paragrapStyles settings. If the same supported attributes apply to all characters in the layer than this will be an array of one item, otherwise each paragraphStyle object will have a 'from' and 'to' value indicating the range of characters that the style applies to.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.text.paragrapStyles.paragraphStyle",
            "description": "<p>paragraph style settings</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"left\"",
              "\"center\"",
              "\"right\"",
              "\"justify\"",
              "\"justifyLeft\"",
              "\"justifyCenter\"",
              "\"justifyRight\""
            ],
            "optional": true,
            "field": "options.layers.layer.text.paragrapStyles.paragraphStyle.alignment",
            "defaultValue": "left",
            "description": "<p>the paragraph alignment</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.text.paragrapStyles.paragraphStyle.from",
            "description": "<p>The beginning of the range of characters that this paragraphStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.text.paragrapStyles.paragraphStyle.to",
            "description": "<p>The ending of the range of characters that this characterStyle applies to. Based on initial index of 0. For example a style applied to only the first two characters would be from=0 and to=1</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.blendOptions",
            "description": "<p>Blend options of a layer, including opacity and blend mode</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "allowedValues": [
              "0..100"
            ],
            "optional": true,
            "field": "options.layers.layer.blendOptions.opacity",
            "description": "<p>Indicates the opacity value of a layer</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"normal\"",
              "\"dissolve\"",
              "\"darken\"",
              "\"multiply\"",
              "\"colorBurn\"",
              "\"linearBurn\"",
              "\"darkerColor\"",
              "\"lighten\"",
              "\"screen\"",
              "\"colorDodge\"",
              "\"linearDodge\"",
              "\"lighterColor\"",
              "\"overlay\"",
              "\"softLight\"",
              "\"hardLight\"",
              "\"vividLight\"",
              "\"linearLight\"",
              "\"pinLight\"",
              "\"hardMix\"",
              "\"difference\"",
              "\"exclusion\"",
              "\"subtract\"",
              "\"divide\"",
              "\"hue\"",
              "\"saturation\"",
              "\"color\"",
              "\"luminosity\""
            ],
            "optional": true,
            "field": "options.layers.layer.blendOptions.blendMode",
            "description": "<p>Blend mode of a layer</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.fillToCanvas",
            "defaultValue": "false",
            "description": "<p>Indicates if this layer needs to be proportionaly filled in to the entire canvas of the document. Applicable only to layer type=&quot;smartObject&quot; or layer type=&quot;layer&quot;.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"left\"",
              "\"center\"",
              "\"right\""
            ],
            "optional": true,
            "field": "options.layers.layer.horizontalAlign",
            "description": "<p>Indicates the horizontal position where this layer needs to be placed at. Applicable only to layer type=&quot;smartObject&quot; or layer type=&quot;layer&quot;.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"top\"",
              "\"center\"",
              "\"bottom\""
            ],
            "optional": true,
            "field": "options.layers.layer.verticalAlign",
            "description": "<p>Indicates the vertical position where this layer needs to be placed at. Applicable only to layer type=&quot;smartObject&quot; or layer type=&quot;layer&quot;.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "inputs.input.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "inputs.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL.</p>  <ul>    <li>CC Storage path must be prepended with `/files` or `/cloud-content` or `/assets`       <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>       <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>       <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </li>  </ul>"
          },
          {
            "group": "Request",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>An array of output objects</p>"
          },
          {
            "group": "Request",
            "type": "output",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>An object describing the requested file outputs (a new psd file or supported renditions)</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPUTURL..</p>  <ul>    <li>CC Storage hrefs</li>    <ul>      <li>Can be either a single asset or a folder</li>      <li>Must be prepended with `/files` or `/cloud-content` or `/assets`</li>      <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>      <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>      <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </ul>    <li>Template Tokens: At runtime these three tokens get replaced with their respective values... (FOR \"adobe\" STORED FILES ONLY)</li>    <ul>      <li>$ReqID - replaced with the request id generated by the service</li>      <li>$FileNum - replaced with an increment-by-1 counter, beginning at 0, so that each output file gets a unique number assigned </li>      <li>$FileName - replaced with file name minus the \".\" and file extension</li>    </ul>    <li>If the output path is a folder than the Template Tokens will be used to dynamically generate the output file name according to the pattern \"/files/&lt;path&gt;/$ReqID_$FileName_$FileNum.&lt;ext&gt;\"</li>  </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/png\"",
              "\"image/tiff\"",
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output.type",
            "description": "<p>desired image format.</p>  <ul>    <li>image/vnd.adobe.photoshop - Create a new PSD file</li>    <li>image/jpeg, image/png, image/tiff - Create a new jpeg, png or tiff rendition</li>  </ul>  Image mode coversions: </br></br>Certain image modes (rgb, cmyk, greyscale, etc) must be converted to another image mode before a rendition can be created:  <ul>    <li>Tiff Requested: Multichannel and Duotone will convert to RGB</li>    <li>PNG Requested: CMYK, HSL, HSB, Multichannel, Duotone, Lab and XYZ will convert to RGB</li>  </ul>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.output.width",
            "defaultValue": "0",
            "description": "<p>width, in pixels, of the renditions. Width of 0 generates a full size rendition.  Height is not necessary as the rendition generate will automatically figure out the correct width-to-height aspect ratio. Only supported for image renditions.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.output.maxWidth",
            "description": "<p>maxWidth (in pixels) of the renditions. When width is 0 and maxWidth is less than the width of the document, you get the final rendition size of maxWidth. Otherwise it will be a full size document rendition. If both width and maxWidth are provided then the lowest value gets the precedence. Height is not necessary as the API will automatically maintain the aspect ratio.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "outputs.output.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.output.quality",
            "defaultValue": "7",
            "description": "<p>quality of the renditions for JPEG. Range from 1 to 7, with 7 as the highest quality.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "outputs.output.compression",
            "defaultValue": "large",
            "description": "<p>compression level for PNG: small, medium or large.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"true\"",
              "\"false\""
            ],
            "optional": true,
            "field": "outputs.output.trimToCanvas",
            "defaultValue": "false",
            "description": "<p>'false' generates renditions that are the actual size of the layer (as seen by View &gt; Show &gt; Layer Edges within the Photoshop desktop app) but will remove any extra transparent pixel padding. 'true' generates renditions that are the size of the canvas, either trimming the layer to the visible portion of the canvas or padding extra space. If the requested file format supports transparency than transparent pixels will be used for padding, otherwise white pixels will be used.</p>"
          },
          {
            "group": "Request",
            "type": "layer[]",
            "optional": true,
            "field": "outputs.output.layers",
            "description": "<p>An array of layer objects.</br> By including this array you are signaling that you'd like a rendition created from these layer id's or layer names. Excluding it will generate a document-level rendition.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": false,
            "field": "outputs.output.layers.id",
            "description": "<p>the layer id</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.layers.name",
            "description": "<p>the layer name.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "outputs.output.iccProfile",
            "description": "<p>An object describing the icc profile to convert to.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.iccProfile.imageMode",
            "description": "<p>the image mode</p> <ul>   <li>Allowed Value for iccProfile File</li>   <ul>       <li>grayscale</li>       <li>rgb</li>       <li>cmyk</li>   </ul> </ul> <ul>    <li>Allowed Value for iccProfile Name</li>    <ul>    <li>rgb</li>    <li>grayscale</li>    </ul> </ul>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "outputs.output.iccProfile.input",
            "description": "<p>An object describing the icc profile.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output.color.icc.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.iccProfile.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL.</p> <ul>   <li>Must be prepended with `/files` or `/cloud-content` or `/assets`</li>   <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>   <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>   <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li> </ul>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"Adobe RGB (1998)\"",
              "\"Apple RGB\"",
              "\"ColorMatch RGB\"",
              "\"sRGB IEC61966-2.1\"",
              "\"Dot Gain 10%\"",
              "\"Dot Gain 15%\"",
              "\"Dot Gain 20%\"",
              "\"Dot Gain 25%\"",
              "\"Dot Gain 30%\"",
              "\"Gray Gamma 1.8\"",
              "\"Gray Gamma 2.2\""
            ],
            "optional": false,
            "field": "outputs.output.color.profileName",
            "description": "<p>the name of the color profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request: HTTP Templated",
          "content": "POST https://image.adobe.io/pie/psdService/documentOperations HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"inputs\":[\n    {\n      \"href\":\"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\":\"<storage>\"\n    }\n  ],\n  \"options\":{\n      \"manageMissingFonts\": \"<fail> or <useDefault>\",\n      \"globalFont\": \"<global_font_postscript_name>\",\n      \"fonts\": [\n        {\n          \"href\":\"<presigned_getURL> or <cc_storage_location>\",\n          \"storage\":\"<storage>\"\n        }\n      ],\n      \"document\":{\n          \"canvasSize\":{\n            \"bounds\" : {\n              \"top\":<top>,\n              \"left\":<left>,\n              \"bottom\":<bottom>,\n              \"right\":<right>\n            }\n          },\n          \"imageSize\":{\n              \"height\":<height>,\n              \"width\":<width>\n          },\n          \"trim\": {\n              \"basedOn\":\"transparentPixels\"\n          }\n      },\n      \"layers\":[\n          {\n              \"id\":<layerId>,\n              \"index\":<index>,\n              \"type\":\"<type>\",\n              \"name\":\"<name>\",\n              \"locked\":<bool>,\n              \"visible\":<bool>,\n              \"children\":[\n\n              ],\n              \"edit\":{},\n              \"add\":{\n                  \"insertAbove\":{\n                      \"id\":<id>,\n                      \"name\":\"<name>\"\n                  },\n                  \"insertBelow\":{\n                      \"id\":<id>,\n                      \"name\":\"<name>\"\n                  },\n                  \"insertInto\":{\n                      \"id\":<id>,\n                      \"name\":\"<name>\"\n                  },\n                  \"insertTop\":<bool>,\n                  \"insertBottom\":<bool>\n              },\n              \"move\":{\n                  \"includeChildren\":<bool>,\n                  \"insertAbove\":{\n                      \"id\":<id>,\n                      \"name\":\"<name>\"\n                  },\n                  \"insertBelow\":{\n                      \"id\":<id>,\n                      \"name\":\"<name>\"\n                  },\n                  \"insertInto\":{\n                      \"id\":<id>,\n                      \"name\":\"<name>\"\n                  },\n                  \"insertTop\":<bool>,\n                  \"insertBottom\":<bool>\n              },\n              \"delete\":{\n                  \"includeChildren\":<bool>\n              },\n              \"input\":{\n                  \"href\":\"<presigned_getURL> or <cc_storage_location>\",\n                  \"storage\":\"<storage>\"\n              },\n              \"mask\":{\n                  \"input\":{\n                      \"href\":\"<presigned_getURL> or <cc_storage_location>\",\n                      \"storage\":\"<storage>\"\n                  },\n                  \"enabled\":<bool>,\n                  \"linked\":<bool>,\n                  \"offset\":{\n                      \"x\":<int>,\n                      \"y\":<int>\n                  },\n                  \"clip\":<bool>\n              },\n              \"smartObject\":{\n                \"linked\":<bool>\n              }\n              \"bounds\":{\n                  \"top\":<top>,\n                  \"left\":<left>,\n                  \"width\":<width>,\n                  \"height\":<height>\n              },\n              \"fill\":{\n                \"solidColor\":{\n                  \"rgb\" : {\n                    \"red\":<8 bit int>,\n                    \"green\":<8 bit int>,\n                    \"blue\":<8 bit int>\n                  }\n                }\n              },\n              \"text\":{\n                  \"content\":\"<text>\",\n                  \"characterStyles\":[\n                      {\n                          \"from\":<int>,\n                          \"to\":<int>,\n                          \"fontSize\":<fontSize>,\n                          \"fontName\":\"<fontName>\",\n                          \"orientation\":\"<orientation>\",\n                          \"fontColor\":{\n                              \"rgb\":{\n                                  \"red\":<16 bit integer>,\n                                  \"green\":<16 bit integer>,\n                                  \"blue\":<16 bit integer>\n                              }\n                          }\n                      }\n                  ],\n                  \"paragraphStyles\":[\n                      {\n                          \"from\":<int>,\n                          \"to\":<int>,\n                          \"alignment\":\"<alignment>\"\n                      }\n                  ]\n              },\n              \"adjustments\":{\n                  \"brightnessContrast\":{\n                      \"brightness\":<-150..150>,\n                      \"contrast\":<-150..150>\n                  },\n                  \"exposure\":{\n                      \"exposure\":<-20...20>,\n                      \"offset\":<-0.5...0.5>,\n                      \"gammaCorrection\":<0.01...9.99>\n                  },\n                  \"colorBalance\":{\n                      \"preserveLuminosity\":true,\n                      \"shadowLevels\":[\n                          <-100...100>,\n                          <-100...100>,\n                          <-100...100>\n                      ],\n                      \"midtoneLevels\":[\n                          <-100...100>,\n                          <-100...100>,\n                          <-100...100>\n                      ],\n                      \"highlightLevels\":[\n                          <-100...100>,\n                          <-100...100>,\n                          <-100...100>\n                      ]\n                  },\n                  \"hueSaturation\":{\n                      \"channels\":[\n                          {\n                              \"channel\":\"master\",\n                              \"hue\":<180...180>,\n                              \"saturation\":<-100...100>,\n                              \"lightness\":<-100...100>\n                          }\n                      ],\n                      \"colorize\":false\n                  }\n              },\n              \"blendOptions\": {\n                  \"opacity\":<int>,\n                  \"blendMode\": \"<blendMode>\"\n              }\n          }\n      ]\n  },\n  \"outputs\":[\n      {\n        \"href\":\"<cc_storage_location>\",\n        \"storage\":\"adobe\",\n        \"type\":\"<type>\",\n        \"width\":<width>,\n        \"overwrite\":<bool>,\n        \"trimToCanvas\":<bool>,\n        \"layers\":[\n            {\n                \"id\":<id>,\n                \"name\":<name>\n            }\n        ]\n      },\n      {\n        \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_putObject..\",\n        \"storage\":\"external\",\n        \"type\":\"image/vnd.adobe.photoshop\",\n        \"overwrite\":false\n      }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Request: HTTP Example",
          "content": "POST https://image.adobe.io/pie/psdService/documentOperations HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n   \"inputs\":[\n      {\n         \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"storage\":\"external\"\n      }\n   ],\n   \"options\":{\n      \"manageMissingFonts\": \"useDefault\",\n      \"globalFont\": \"MyriadPro-Bold\",\n      \"fonts\": [\n        {\n           \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n           \"storage\":\"external\"\n        }\n      ],\n      \"document\":{\n         \"canvasSize\":{\n           \"bounds\" : {\n             \"top\":200,\n             \"left\":200,\n             \"bottom\":500,\n             \"right\":500\n           }\n         },\n         \"imageSize\":{\n            \"height\":100,\n            \"width\":100\n         },\n         \"trim\":{\n            \"basedOn\":\"transparentPixels\"\n         }\n      },\n      \"layers\":[\n         {\n            \"add\":{\n               \"insertTop\":true\n            },\n            \"name\":\"new adjustment layer\",\n            \"type\":\"adjustmentLayer\",\n            \"visible\":true,\n            \"adjustments\":{\n               \"brightnessContrast\":{\n                  \"brightness\":-23,\n                  \"contrast\":15\n               }\n            }\n         },\n         {\n           \"add\":{\n             \"insertBottom\":true\n           },\n           \"name\":\"new content layer\",\n           \"type\":\"fillLayer\",\n           \"visible\":true,\n           \"fill\":{\n             \"solidColor\":{\n               \"rgb\" : {\n                 \"red\":0,\n                 \"green\":255,\n                 \"blue\":255\n               }\n             }\n           },\n           \"blendOptions\":{\n             \"opacity\":90,\n             \"blendMode\":\"normal\"\n           }\n         },\n         {\n            \"index\":8,\n            \"locked\":false,\n            \"name\":\"SO Layer\",\n            \"type\":\"smartObject\",\n            \"visible\":true,\n            \"add\":{\n               \"insertTop\":true\n            },\n            \"input\":{\n               \"href\":\"files/input/Simple.psd\",\n               \"storage\":\"adobe\"\n            },\n            \"smartObject\":{\n               \"linked\":false\n            }\n         },\n         {\n            \"id\":33,\n            \"edit\":{\n\n            },\n            \"index\":6,\n            \"type\":\"textLayer\",\n            \"name\":\"my text layer\",\n            \"locked\":true,\n            \"visible\":true,\n            \"bounds\":{\n               \"top\":50,\n               \"left\":100,\n               \"width\":500,\n               \"height\":450\n            },\n            \"text\":{\n               \"content\":\"NEW TEXT CHANGES\",\n               \"characterStyles\":[\n                  {\n                     \"fontSize\":12.5,\n                     \"fontName\":\"Arial-BoldMT\",\n                     \"orientation\":\"horizontal\",\n                     \"fontColor\":{\n                        \"rgb\":{\n                           \"red\":26086,\n                           \"green\":23002,\n                           \"blue\":8224\n                        }\n                     }\n                  }\n               ],\n               \"paragraphStyles\":[\n                  {\n                     \"alignment\":\"left\"\n                  }\n               ]\n            },\n            \"blendOptions\":{\n               \"opacity\":90,\n               \"blendMode\":\"normal\"\n            }\n         },\n         {\n            \"add\":{\n               \"insertAbove\":{\n                  \"id\":53\n               }\n            },\n            \"name\":\"New Exposure Layer\",\n            \"type\":\"adjustmentLayer\",\n            \"locked\":false,\n            \"visible\":true,\n            \"adjustments\":{\n               \"exposure\":{\n                  \"exposure\":0.25,\n                  \"offset\":0.0049,\n                  \"gammaCorrection\":1.38\n               }\n            }\n         },\n         {\n            \"edit\":{\n\n            },\n            \"id\":78,\n            \"index\":2,\n            \"type\":\"adjustmentLayer\",\n            \"name\":\"Color Balance\",\n            \"locked\":false,\n            \"visible\":true,\n            \"mask\":{\n               \"input\":{\n                  \"href\":\"files/abc.psd\",\n                  \"storage\":\"adobe\"\n               },\n               \"enabled\":false,\n               \"linked\":true,\n               \"offset\":{\n                  \"x\":70,\n                  \"y\":50\n               },\n               \"clip\":true\n            },\n            \"adjustments\":{\n               \"colorBalance\":{\n                  \"shadowLevels\":[\n                     0,\n                     10,\n                     20\n                  ],\n                  \"preserveLuminosity\":true,\n                  \"midtoneLevels\":[\n                     30,\n                     40,\n                     50\n                  ],\n                  \"highlightLevels\":[\n                     60,\n                     70,\n                     80\n                  ]\n               }\n            }\n         },\n         {\n            \"move\":{\n               \"insertAbove\":{\n                  \"name\":\"Hue Saturation\"\n               }\n            },\n            \"name\":\"new Image layer\",\n            \"type\":\"layer\",\n            \"visible\":true,\n            \"input\":{\n               \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n               \"storage\":\"external\"\n            }\n         },\n         {\n            \"edit\":{\n\n            },\n            \"id\":77,\n            \"index\":1,\n            \"type\":\"adjustmentLayer\",\n            \"name\":\"Hue Saturation\",\n            \"locked\":false,\n            \"visible\":true,\n            \"adjustements\":{\n               \"hueSaturation\":{\n                  \"channels\":[\n                     {\n                        \"channel\":\"master\",\n                        \"hue\":-5,\n                        \"saturation\":20,\n                        \"lightness\":0\n                     }\n                  ],\n                  \"colorize\":false\n               }\n            }\n         },\n         {\n            \"type\":\"backgroundLayer\",\n            \"index\":0,\n            \"locked\":true,\n            \"id\":1,\n            \"visible\":true,\n            \"name\":\"Background\"\n         }\n      ]\n   },\n   \"outputs\":[\n      {\n         \"href\":\"/files/some_project/output/design_$ReqID_$FileName.psd\",\n         \"storage\":\"adobe\",\n         \"type\":\"image/jpeg\",\n         \"width\":500,\n         \"overwrite\":true,\n         \"trimToCanvas\":false,\n         \"layers\":[\n            {\n               \"id\":77\n            }\n         ]\n      },\n      {\n         \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_putObject..\",\n         \"storage\":\"external\",\n         \"type\":\"image/vnd.adobe.photoshop\",\n         \"overwrite\":false\n      }\n   ]\n}",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X POST -d '{\"inputs\":[{\"href\":\"<href>\",\"storage\":\"<storage>\"}],\"options\":{\"layers\":[{<layer_info>}]},\"outputs\":[{\"href\":\"<href>\",\"storage\":\"<storage>\",\"type\":\"<type>\",\"width\":<width>,\"overwrite\":<bool>},{\"external\":<presigned_putURL>\",\"type\":\"<type>\",\"width\":<width>,\"overwrite\":\"<overwrite>\"}]}' https://image.adobe.io/pie/psdService/documentOperations",
          "type": "curl"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links.self",
            "description": "<p>The link to GET the job status from</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links",
            "description": "<p>any link the client follow, described by their relationship</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/<:jobId>\" }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 682\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\" }\n  }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-document-operations.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>402: TrialLimitExceededError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        },
        {
          "title": "Response: TrialLimitExceededError Example:",
          "content": " // This is an example for when quota assigned is already used.\n HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/pie/psdService/status/<:jobId>",
    "title": "document create status",
    "description": "<p>Returns the status of a File job. Will return 202 as long as there are child jobs still running and 200 once all children are complete</p>",
    "version": "1.0.0",
    "name": "get-document-create-job-status",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>The jobId to get status for.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.created",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot; created timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.modified",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot;  modified timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>an output object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.status",
            "description": "<p>the child job status</p> <ul>  <li>pending - request has been accepted and is waiting to start</li>  <li>running - the child job is running</li>  <li>uploading - files have been generated and are uploading to destination</li>  <li>succeeded - the child job has succeeded</li>  <li>failed - the child job has failed</li> </ul>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links",
            "description": "<p>the rendition links</p>"
          },
          {
            "group": "Success 202",
            "type": "rendition[]",
            "optional": false,
            "field": "outputs.output._links.renditions",
            "description": "<p>array off rendition objects</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition",
            "description": "<p>rendition object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.href",
            "description": "<p>the rendition location</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"external\"",
              "\"adobe\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.storage",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.width",
            "description": "<p>the requested rendition width in pixels.</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/png\"",
              "\"image/tiff\"",
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.type",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"true\"",
              "\"false\""
            ],
            "optional": true,
            "field": "outputs.output._links.renditions.rendition.trimToCanvas",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "layer[]",
            "optional": true,
            "field": "outputs.output._links.renditions.rendition.layers",
            "description": "<p>an array of layer objects signifying the rendition needed for a document.</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.layers.id",
            "description": "<p>the layer id</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.layers.name",
            "description": "<p>the layer name.</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.errors",
            "description": "<p>any errors reported requested output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.type",
            "description": "<p>a machine readable error type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.code",
            "description": "<p>a machine readable error code</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.title",
            "description": "<p>a short human readable error summary</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": true,
            "field": "outputs.output.errors.errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"/psdService/status/<:jobId>\"\n{\n    \"jobId\":\"<:jobId>\",\n    \"outputs\":[\n        {\n            \"status\":\"<status>\",\n            \"_links\":{\n              \"renditions\":[\n                {\n                  \"href\":\"<href>\",\n                  \"storage\":\"<storage>\",\n                  \"width\":\"<width>\",\n                  \"type\":\"<type>\"\n                }\n              ]\n            }\n        },\n        {\n            \"status\":\"<status>\",\n            \"errors\": {\n              \"type\": \"<errorType>\",\n              \"title\": \"<errorDescription>\",\n              \"code\": \"<errorCode>\",\n              \"<errorDetails>\": [\n                {\n                  \"name\":\"<paramName>\",\n                  \"reason\":\"<error>\"\n                }\n              ]\n            }\n        }\n    ],\n    \"_links\":{\n        \"self\":{\n            \"href\":\"https://image.adobe.io/pie/psdService/status/<:jobId>\"\n        }\n    }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202\nContent-Type: application/json\nContent-Length: 1082\nLocation: \"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n   \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n   \"outputs\":[\n      {\n         \"status\":\"pending\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\"\n      },\n      {\n         \"status\":\"running\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\"\n      },\n      {\n         \"status\":\"succeeded\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n         \"_links\":{\n            \"renditions\":[\n               {\n                  \"href\":\"/files/some_project/OUTPUT/design2_new.psd\",\n                  \"storage\":\"adobe\",\n                  \"width\":\"500\",\n                  \"type\":\"image/jpeg\",\n                  \"trimToCanvas\":false,\n                  \"layers\":[\n                     {\n                        \"id\":77\n                     }\n                  ]\n               }\n            ]\n         }\n      },\n      {\n         \"status\":\"failed\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n         \"error\":{\n            \"type\":\"InputValidationError\",\n            \"title\":\"request parameters didn't validate\",\n            \"code\":\"400\",\n            \"invalidParams\":[\n               {\n                  \"name\":\"contrast\",\n                  \"reason\":\"value must be an int between -150 and 150\"\n               },\n               {\n                  \"name\":\"exposure\",\n                  \"reason\":\"must be bool\"\n               }\n            ]\n         }\n      }\n   ],\n   \"_links\":{\n      \"self\":{\n         \"href\":\"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n      }\n   }\n}",
          "type": "object"
        },
        {
          "title": "Request: HTTP Example",
          "content": "GET /psdService/status/<:jobId> HTTP/1.1\nHost: image.adobe.io\nAuthorization: Bearer $token\nX-Api-Key: $api_key",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X GET https://image.adobe.io/pie/psdService/status/<:jobId>",
          "type": "curl"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p> <ul>   <li>400: InputValidationError</li>   <li>400: PayloadValidationError</li>   <li>400: RequestBodyError</li>   <li>401: MissingAuthTokenError</li>   <li>401: InvalidAuthTokenError</li>   <li>402: TrialLimitExceededError</li>   <li>403: AuthForbidden</li>   <li>404: FileExistsErrors</li>   <li>404: ResourceNotFound</li>   <li>415: InvalidContentTypeError</li>   <li>500: UndefinedError</li> </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Inline Templated",
          "content": "// This is a templated example for when a requested job has failed\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"jobId\": \"<jobID\",\n  \"outputs\":[\n      {\n        \"status\":\"<status>\",\n        \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"errors\":{\n          \"type\":\"<errorType>\",\n          \"title\":\"<errorDescription>\",\n          \"code\": \"\"<errorCode>\",\n          \"<errorDetails>\":[\n            {\n              \"name\":\"<paramName>\",\n              \"reason\":\"<error>\"\n            }\n          ]\n        }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        }
      ]
    },
    "filename": "docs-src/pre-release/get-document-create.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/pie/psdService/status/<:jobId>",
    "title": "document operations status",
    "description": "<p>Returns the status of a File job. Will return 202 as long as there are child jobs still running and 200 once all children are complete</p>",
    "version": "1.0.0",
    "name": "get-document-operations-job-status",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>The jobId to get status for.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202\nContent-Type: application/json\nContent-Length: 1082\nLocation: \"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n   \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n   \"outputs\":[\n      {\n         \"input\":\"/files/some_project/design1.psd\",\n         \"status\":\"pending\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\"\n      },\n      {\n         \"input\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"status\":\"running\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\"\n      },\n      {\n         \"input\":\"/files/some_project/design2.psd\",\n         \"status\":\"succeeded\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n         \"_links\":{\n            \"renditions\":[\n               {\n                  \"href\":\"/files/some_project/OUTPUT/design2_new.psd\",\n                  \"storage\":\"adobe\",\n                  \"width\":\"500\",\n                  \"type\":\"image/jpeg\",\n                  \"trimToCanvas\":false,\n                  \"layers\":[\n                     {\n                        \"id\":77\n                     }\n                  ]\n               }\n            ]\n         }\n      },\n      {\n         \"input\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"status\":\"failed\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n         \"error\":{\n            \"type\":\"InputValidationError\",\n            \"title\":\"request parameters didn't validate\",\n            \"code\":\"400\",\n            \"invalidParams\":[\n               {\n                  \"name\":\"contrast\",\n                  \"reason\":\"value must be an int between -150 and 150\"\n               },\n               {\n                  \"name\":\"exposure\",\n                  \"reason\":\"must be bool\"\n               }\n            ]\n         }\n      }\n   ],\n   \"_links\":{\n      \"self\":{\n         \"href\":\"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n      }\n   }\n}",
          "type": "object"
        },
        {
          "title": "Request: HTTP Example",
          "content": "GET /psdService/status/<:jobId> HTTP/1.1\nHost: image.adobe.io\nAuthorization: Bearer $token\nX-Api-Key: $api_key",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X GET https://image.adobe.io/pie/psdService/status/<:jobId>",
          "type": "curl"
        },
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"/psdService/status/<:jobId>\"\n{\n    \"jobId\":\"<:jobId>\",\n    \"outputs\":[\n        {\n            \"input\":\"<input>\",\n            \"status\":\"<status>\",\n            \"_links\":{\n              \"renditions\":[\n                {\n                  \"href\":\"<href>\",\n                  \"storage\":\"<storage>\",\n                  \"width\":\"<width>\",\n                  \"type\":\"<type>\"\n                }\n              ]\n            }\n        },\n        {\n            \"input\":\"<input>\",\n            \"status\":\"<status>\",\n            \"errors\": {\n              \"type\": \"<errorType>\",\n              \"title\": \"<errorDescription>\",\n              \"code\": \"<errorCode>\",\n              \"<errorDetails>\": [\n                {\n                  \"name\":\"<paramName>\",\n                  \"reason\":\"<error>\"\n                }\n              ]\n            }\n        }\n    ],\n    \"_links\":{\n        \"self\":{\n            \"href\":\"https://image.adobe.io/pie/psdService/status/<:jobId>\"\n        }\n    }\n}",
          "type": "object"
        }
      ],
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.created",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot; created timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.modified",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot;  modified timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>an output object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.input",
            "description": "<p>the original input file path</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.status",
            "description": "<p>the child job status</p>  <ul>    <li>pending - request has been accepted and is waiting to start</li>    <li>running - the child job is running</li>    <li>uploading - files have been generated and are uploading to destination</li>    <li>succeeded - the child job has succeeded</li>    <li>failed - the child job has failed</li>  </ul>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links",
            "description": "<p>the rendition links</p>"
          },
          {
            "group": "Success 202",
            "type": "rendition[]",
            "optional": false,
            "field": "outputs.output._links.renditions",
            "description": "<p>array off rendition objects</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition",
            "description": "<p>rendition object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.href",
            "description": "<p>the rendition location</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"external\"",
              "\"adobe\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.storage",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.width",
            "description": "<p>the requested rendition width in pixels.</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/png\"",
              "\"image/tiff\"",
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.type",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"true\"",
              "\"false\""
            ],
            "optional": true,
            "field": "outputs.output._links.renditions.rendition.trimToCanvas",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "layer[]",
            "optional": true,
            "field": "outputs.output._links.renditions.rendition.layers",
            "description": "<p>an array of layer objects signifying the rendition needed for a document.</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.layers.id",
            "description": "<p>the layer id</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.layers.name",
            "description": "<p>the layer name.</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.errors",
            "description": "<p>any errors reported requested output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.type",
            "description": "<p>a machine readable error type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.code",
            "description": "<p>a machine readable error code</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.title",
            "description": "<p>a short human readable error summary</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": true,
            "field": "outputs.output.errors.errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue</p>"
          }
        ]
      }
    },
    "filename": "docs-src/pre-release/get-document-operations.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Inline Templated",
          "content": "// This is a templated example for when a requested job has failed\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"jobId\": \"<jobID\",\n  \"outputs\":[\n      {\n        \"input\":\"<href>\",\n        \"status\":\"<status>\",\n        \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"errors\":{\n          \"type\":\"<errorType>\",\n          \"title\":\"<errorDescription>\",\n          \"code\": \"\"<errorCode>\",\n          \"<errorDetails>\":[\n            {\n              \"name\":\"<paramName>\",\n              \"reason\":\"<error>\"\n            }\n          ]\n        }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Error-Response-Inline Example",
          "content": " // In this example the GET call to /status succeeds but one of the initiated jobs has failed\n\n HTTP/1.1 200 OK\n Content-Type: application/json\n Content-Length: {xsd:nonNegativeInteger}\n Location: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n {\n   \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n   \"outputs\":[\n      {\n         \"input\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"status\":\"failed\",\n         \"created\":\"2018-01-04T12:57:15.12345Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345Z\",\n         \"error\":{\n            \"type\":\"FileExistsError\",\n            \"title\":\"input file does not exist\",\n            \"code\":\"400\"\n         }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/pie/psdService/status/<:jobId>",
    "title": "photoshop actions status",
    "description": "<p>Returns the status of a photoshop actions create request. Will return 202 as long as there are child jobs still running and 200 once all children are complete</p>",
    "version": "1.0.0",
    "name": "get-photoshop-actions-job-status",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>The jobId to get status for.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202\nContent-Type: application/json\nContent-Length: 1082\nLocation: \"https://image.adobe.io/pie/psdService/status/f4c423e4-34af-4c95-acf2-a8fdc54dad69\"\n{\n  \"jobId\": \"da79934f-07f3-46d4-82a1-1370175d80bc\",\n  \"outputs\": [\n    {\n      \"input\": \"https://www.some-image.com/image.jpg\",\n      \"status\": \"succeeded\",\n      \"created\": \"2020-09-23T20:55:40.891Z\",\n      \"modified\": \"2020-09-23T20:55:45.627Z\",\n      \"_links\": {\n        \"renditions\": [\n          {\n            \"href\": \"files/output.jpeg\",\n            \"storage\": \"adobe\",\n            \"type\": \"image/jpeg\"\n          }\n        ]\n      }\n    }\n  ],\n  \"_links\": {\n    \"self\": {\n      \"href\": \"https://image.adobe.io/pie/psdService/status/f4c423e4-34af-4c95-acf2-a8fdc54dad69\"\n    }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Request: HTTP Example",
          "content": "GET /psdService/status/<:jobId> HTTP/1.1\nHost: image.adobe.io\nAuthorization: Bearer $token\nX-Api-Key: $api_key",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X GET https://image.adobe.io/pie/psdService/status/<:jobId>",
          "type": "curl"
        },
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"/psdService/status/<:jobId>\"\n{\n    \"jobId\":\"<:jobId>\",\n    \"outputs\":[\n        {\n            \"input\":\"<input>\",\n            \"status\":\"<status>\",\n            \"_links\":{\n              \"renditions\":[\n                {\n                  \"href\":\"<href>\",\n                  \"storage\":\"<storage>\",\n                  \"width\":\"<width>\",\n                  \"type\":\"<type>\"\n                }\n              ]\n            }\n        },\n        {\n            \"input\":\"<input>\",\n            \"status\":\"<status>\",\n            \"errors\": {\n              \"type\": \"<errorType>\",\n              \"title\": \"<errorDescription>\",\n              \"code\": \"<errorCode>\",\n              \"<errorDetails>\": [\n                {\n                  \"name\":\"<paramName>\",\n                  \"reason\":\"<error>\"\n                }\n              ]\n            }\n        }\n    ],\n    \"_links\":{\n        \"self\":{\n            \"href\":\"https://image.adobe.io/pie/psdService/status/<:jobId>\"\n        }\n    }\n}",
          "type": "object"
        }
      ],
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.created",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot; created timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.modified",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot;  modified timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>an output object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.input",
            "description": "<p>the original input file path</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.status",
            "description": "<p>the child job status</p>  <ul>    <li>pending - request has been accepted and is waiting to start</li>    <li>running - the child job is running</li>    <li>uploading - files have been generated and are uploading to destination</li>    <li>succeeded - the child job has succeeded</li>    <li>failed - the child job has failed</li>  </ul>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links",
            "description": "<p>the rendition links</p>"
          },
          {
            "group": "Success 202",
            "type": "rendition[]",
            "optional": false,
            "field": "outputs.output._links.renditions",
            "description": "<p>array off rendition objects</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition",
            "description": "<p>rendition object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.href",
            "description": "<p>the rendition location</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"external\"",
              "\"adobe\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.storage",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.width",
            "description": "<p>the requested rendition width in pixels.</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/png\"",
              "\"image/tiff\"",
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.type",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"true\"",
              "\"false\""
            ],
            "optional": true,
            "field": "outputs.output._links.renditions.rendition.trimToCanvas",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "layer[]",
            "optional": true,
            "field": "outputs.output._links.renditions.rendition.layers",
            "description": "<p>an array of layer objects signifying the rendition needed for a document.</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.layers.id",
            "description": "<p>the layer id</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.layers.name",
            "description": "<p>the layer name.</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.errors",
            "description": "<p>any errors reported requested output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.type",
            "description": "<p>a machine readable error type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.code",
            "description": "<p>a machine readable error code</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.title",
            "description": "<p>a short human readable error summary</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": true,
            "field": "outputs.output.errors.errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue</p>"
          }
        ]
      }
    },
    "filename": "docs-src/pre-release/get-photoshop-actions-create.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Inline Templated",
          "content": "// This is a templated example for when a requested job has failed\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"jobId\": \"<jobID\",\n  \"outputs\":[\n      {\n        \"input\":\"<href>\",\n        \"status\":\"<status>\",\n        \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"errors\":{\n          \"type\":\"<errorType>\",\n          \"title\":\"<errorDescription>\",\n          \"code\": \"\"<errorCode>\",\n          \"<errorDetails>\":[\n            {\n              \"name\":\"<paramName>\",\n              \"reason\":\"<error>\"\n            }\n          ]\n        }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Error-Response-Inline Example",
          "content": " // In this example the GET call to /status succeeds but one of the initiated jobs has failed\n\n HTTP/1.1 200 OK\n Content-Type: application/json\n Content-Length: {xsd:nonNegativeInteger}\n Location: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n {\n   \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n   \"outputs\":[\n      {\n         \"input\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"status\":\"failed\",\n         \"created\":\"2018-01-04T12:57:15.12345Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345Z\",\n         \"error\":{\n            \"type\":\"FileExistsError\",\n            \"title\":\"input file does not exist\",\n            \"code\":\"400\"\n         }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/pie/psdService/status/<:jobId>",
    "title": "smart object status",
    "description": "<p>Returns the status of a smart object create or edit job. Will return 202 as long as there are child jobs still running and 200 once all children are complete</p>",
    "version": "1.0.0",
    "name": "get-smart-object-job-status",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>The jobId to get status for.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202\nContent-Type: application/json\nContent-Length: 1082\nLocation: \"https://image.adobe.io/pie/psdService/status/f4c423e4-34af-4c95-acf2-a8fdc54dad69\"\n{\n   \"jobId\":\"f4c423e4-34af-4c95-acf2-a8fdc54dad69\",\n   \"outputs\":[\n      {\n         \"input\":\"files/SO.psd\",\n         \"status\":\"succeeded\",\n         \"created\":\"2019-11-14T19:47:11.97Z\",\n         \"modified\":\"2019-11-14T19:47:17.366Z\",\n         \"_links\": {\n           \"renditions\": [\n             {\n               \"href\": \"files/SOedit.psd\",\n               \"storage\": \"adobe\",\n               \"type\": \"image/vnd.adobe.photoshop\"\n             }\n           ]\n         }\n      }\n   ],\n   \"_links\":{\n      \"self\":{\n         \"href\":\"https://image.adobe.io/pie/psdService/status/f4c423e4-34af-4c95-acf2-a8fdc54dad69\"\n      }\n   }\n}",
          "type": "object"
        },
        {
          "title": "Request: HTTP Example",
          "content": "GET /psdService/status/<:jobId> HTTP/1.1\nHost: image.adobe.io\nAuthorization: Bearer $token\nX-Api-Key: $api_key",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X GET https://image.adobe.io/pie/psdService/status/<:jobId>",
          "type": "curl"
        },
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"/psdService/status/<:jobId>\"\n{\n    \"jobId\":\"<:jobId>\",\n    \"outputs\":[\n        {\n            \"input\":\"<input>\",\n            \"status\":\"<status>\",\n            \"_links\":{\n              \"renditions\":[\n                {\n                  \"href\":\"<href>\",\n                  \"storage\":\"<storage>\",\n                  \"width\":\"<width>\",\n                  \"type\":\"<type>\"\n                }\n              ]\n            }\n        },\n        {\n            \"input\":\"<input>\",\n            \"status\":\"<status>\",\n            \"errors\": {\n              \"type\": \"<errorType>\",\n              \"title\": \"<errorDescription>\",\n              \"code\": \"<errorCode>\",\n              \"<errorDetails>\": [\n                {\n                  \"name\":\"<paramName>\",\n                  \"reason\":\"<error>\"\n                }\n              ]\n            }\n        }\n    ],\n    \"_links\":{\n        \"self\":{\n            \"href\":\"https://image.adobe.io/pie/psdService/status/<:jobId>\"\n        }\n    }\n}",
          "type": "object"
        }
      ],
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.created",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot; created timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.modified",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot;  modified timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>an output object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.input",
            "description": "<p>the original input file path</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.status",
            "description": "<p>the child job status</p>  <ul>    <li>pending - request has been accepted and is waiting to start</li>    <li>running - the child job is running</li>    <li>uploading - files have been generated and are uploading to destination</li>    <li>succeeded - the child job has succeeded</li>    <li>failed - the child job has failed</li>  </ul>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links",
            "description": "<p>the rendition links</p>"
          },
          {
            "group": "Success 202",
            "type": "rendition[]",
            "optional": false,
            "field": "outputs.output._links.renditions",
            "description": "<p>array off rendition objects</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition",
            "description": "<p>rendition object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.href",
            "description": "<p>the rendition location</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"external\"",
              "\"adobe\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.storage",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.width",
            "description": "<p>the requested rendition width in pixels.</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/png\"",
              "\"image/tiff\"",
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.type",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"true\"",
              "\"false\""
            ],
            "optional": true,
            "field": "outputs.output._links.renditions.rendition.trimToCanvas",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "layer[]",
            "optional": true,
            "field": "outputs.output._links.renditions.rendition.layers",
            "description": "<p>an array of layer objects signifying the rendition needed for a document.</p>"
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.layers.id",
            "description": "<p>the layer id</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.layers.name",
            "description": "<p>the layer name.</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.errors",
            "description": "<p>any errors reported requested output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.type",
            "description": "<p>a machine readable error type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.code",
            "description": "<p>a machine readable error code</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.title",
            "description": "<p>a short human readable error summary</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": true,
            "field": "outputs.output.errors.errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue</p>"
          }
        ]
      }
    },
    "filename": "docs-src/pre-release/get-smart-object.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Inline Templated",
          "content": "// This is a templated example for when a requested job has failed\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"jobId\": \"<jobID\",\n  \"outputs\":[\n      {\n        \"input\":\"<href>\",\n        \"status\":\"<status>\",\n        \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"errors\":{\n          \"type\":\"<errorType>\",\n          \"title\":\"<errorDescription>\",\n          \"code\": \"\"<errorCode>\",\n          \"<errorDetails>\":[\n            {\n              \"name\":\"<paramName>\",\n              \"reason\":\"<error>\"\n            }\n          ]\n        }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Error-Response-Inline Example",
          "content": " // In this example the GET call to /status succeeds but one of the initiated jobs has failed\n\n HTTP/1.1 200 OK\n Content-Type: application/json\n Content-Length: {xsd:nonNegativeInteger}\n Location: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n {\n   \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n   \"outputs\":[\n      {\n         \"input\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"status\":\"failed\",\n         \"created\":\"2018-01-04T12:57:15.12345Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345Z\",\n         \"error\":{\n            \"type\":\"FileExistsError\",\n            \"title\":\"input file does not exist\",\n            \"code\":\"400\"\n         }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/pie/psdService/photoshopActions",
    "title": "photoshop actions",
    "description": "<p>Initiates an asynchronous job to execute Photoshop Actions on a given image</p>",
    "version": "1.0.0",
    "name": "photoshopActions",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "input[]",
            "optional": false,
            "field": "inputs",
            "description": "<p>An array of input objects. We currently only support one input object.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "inputs.input",
            "description": "<p>An object describing an input PSD file.Current support is for files less than 1000MB.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options",
            "description": "<p>available options to apply to all input files</p>"
          },
          {
            "group": "Request",
            "type": "actions[]",
            "optional": false,
            "field": "options.actions",
            "description": "<p>array of action objects (We currently only support one input object) An array of action objects you wish photoshopActions to execute.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.actions.action",
            "description": "<p>a action object which tells the API where to download the action file</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.actions.action.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPutURL. The &quot;/files&quot; path directly corresponds to the root of your local &quot;Creative Cloud Files&quot; folder.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "options.actions.action.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.actions.action.actionName",
            "description": "<p>if you only want to execute a particular action, you may specify whcih action to play  in the ActionSet</p>"
          },
          {
            "group": "Request",
            "type": "patterns[]",
            "optional": true,
            "field": "options.patterns",
            "defaultValue": "false",
            "description": "<p>array of pattern objects (We currently only support one input object) An array of pattern objects you wish photoshopActions to use when playing an action that requires a custom pattern.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.patterns.pattern",
            "description": "<p>a pattern object which tells the API where to download the pattern file that is needed for your action</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.patterns.pattern.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPutURL. The &quot;/files&quot; path directly corresponds to the root of your local &quot;Creative Cloud Files&quot; folder.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "options.patterns.pattern.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "fonts[]",
            "optional": true,
            "field": "options.fonts",
            "defaultValue": "false",
            "description": "<p>options.fonts array of font objects An array of font objects you wish use when executing the action.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.fonts.font",
            "description": "<p>a font object which tells the API where to download the font that is needed for your action</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.fonts.font.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPutURL. The &quot;/files&quot; path directly corresponds to the root of your local &quot;Creative Cloud Files&quot; folder.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "options.fonts.font.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>An array of output objects</p>"
          },
          {
            "group": "Request",
            "type": "output",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>An object describing the requested file output (a new PSD file. right now supports a single output PSD)</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPUTURL..</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/png\"",
              "\"image/tiff\"",
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output.type",
            "description": "<p>desired image format.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "outputs.output.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "inputs.input.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "inputs.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL.</p>  <ul>    <li>CC Storage path must be prepended with `/files` or `/cloud-content` or `/assets`       <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>       <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>       <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request: HTTP Templated",
          "content": "POST https://image.adobe.io/pie/psdService/photoshopActions HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"inputs\": [\n    {\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\": \"<storage>\"\n    }\n  ],\n  \"options\": {\n    \"actions\": [\n      {\n        \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n        \"storage\": \"<storage>\"\n      }\n    ]\n  },\n  \"outputs\": [\n    {\n      \"storage\": \"<storage>\",\n      \"type\": \"i<type>\",\n      \"overwrite\": <bool>,\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\"\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Request: HTTP Example",
          "content": "POST https://image.adobe.io/pie/psdService/smartObject HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"inputs\": [\n    {\n      \"href\": \"https://as2.ftcdn.net/jpg/02/49/48/49/500_F_249484911_JifPIzjUqzkRhcdMkF9GnsUI9zaqdAsn.jpg\",\n      \"storage\": \"external\"\n    }\n  ],\n  \"options\": {\n    \"actions\": [\n      {\n        \"href\": \"https://raw.githubusercontent.com/johnleetran/ps-actions-samples/master/actions/Oil-paint.atn\",\n        \"storage\": \"external\"\n      }\n    ]\n  },\n  \"outputs\": [\n    {\n      \"storage\": \"external\",\n      \"type\": \"image/jpeg\",\n      \"href\": \"https://some-presigned-url.com/output.jpg\"\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Request: HTTP Example With Custom Patterns",
          "content": "POST https://image.adobe.io/pie/psdService/smartObject HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"inputs\": [\n    {\n      \"href\": \"https://as2.ftcdn.net/jpg/02/49/48/49/500_F_249484911_JifPIzjUqzkRhcdMkF9GnsUI9zaqdAsn.jpg\",\n      \"storage\": \"external\"\n    }\n  ],\n  \"options\": {\n    \"actions\": [\n      {\n        \"href\": \"https://raw.githubusercontent.com/johnleetran/ps-actions-samples/master/actions/Oblossoms_pattern.atn\",\n        \"storage\": \"external\"\n      }\n    ],\n    \"patterns\": [\n      {\n        \"href\": \"https://raw.githubusercontent.com/johnleetran/ps-actions-samples/master/patterns/blossoms_pattern.atn\",\n        \"storage\": \"external\"\n      }\n    ]\n  },\n  \"outputs\": [\n    {\n      \"storage\": \"external\",\n      \"type\": \"image/jpeg\",\n      \"href\": \"https://some-presigned-url.com/output.jpg\"\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X POST -d '{\n  \"inputs\": [\n    {\n      \"href\": \"https://as2.ftcdn.net/jpg/02/49/48/49/500_F_249484911_JifPIzjUqzkRhcdMkF9GnsUI9zaqdAsn.jpg\",\n      \"storage\": \"external\"\n    }\n  ],\n  \"options\": {\n    \"actions\": [\n      {\n        \"href\": \"https://raw.githubusercontent.com/johnleetran/ps-actions-samples/master/actions/Oil-paint.atn\",\n        \"storage\": \"external\"\n      }\n    ]\n  },\n  \"outputs\": [\n    {\n      \"storage\": \"external\",\n      \"type\": \"image/jpeg\",\n      \"href\": \"https://some-presigned-url.com/output.jpg\"\n    }\n  ]\n}' https://image.adobe.io/pie/psdService/photoshopActions",
          "type": "curl"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links.self",
            "description": "<p>The link to GET the job status from</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links",
            "description": "<p>any link the client follow, described by their relationship</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/<:jobId>\" }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 682\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\" }\n  }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-photoshop-actions-create.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>402: TrialLimitExceededError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/pie/psdService/status/<:jobID>",
    "title": "rendition create status",
    "description": "<p>Returns the status of a create rendition job. Will return 202 as long as there are child jobs still running and 200 once all children are complete</p>",
    "version": "1.0.0",
    "name": "rendition-create-status",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobID",
            "description": "<p>The jobID to get status for.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "jobId",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 202",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>array of output objects</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>an output object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.input",
            "description": "<p>the original input file path</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.status",
            "description": "<p>the child job status</p> <ul>   <li>pending - request has been accepted and is waiting to start</li>   <li>running - the child job is running</li>   <li>uploading - files have been generated and are uploading to destination</li>   <li>succeeded - the child job has succeeded</li>   <li>failed - the child job has failed</li> </ul>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.created",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot; created timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.modified",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot;  modified timestamp of the job</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links",
            "description": "<p>the rendition links</p>"
          },
          {
            "group": "Success 202",
            "type": "rendition[]",
            "optional": false,
            "field": "outputs.output._links.renditions",
            "description": "<p>array off rendition objects</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition",
            "description": "<p>rendition object</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.href",
            "description": "<p>the rendition location</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"external\"",
              "\"adobe\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.storage",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "int",
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.width",
            "description": "<p>the requested rendition width in pixels.</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/png\"",
              "\"image/tiff\"",
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output._links.renditions.rendition.type",
            "description": ""
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "outputs.output.errors",
            "description": "<p>any errors reported requested output</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.type",
            "description": "<p>a machine readable error type</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.code",
            "description": "<p>a machine readable error code</p>"
          },
          {
            "group": "Success 202",
            "type": "string",
            "optional": false,
            "field": "outputs.output.errors.title",
            "description": "<p>a short human readable error summary</p>"
          },
          {
            "group": "Success 202",
            "type": "array",
            "optional": true,
            "field": "outputs.output.errors.errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Example Single File:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 233\nLocation: \"https://image.adobe.io/pie/psdService/status/<:jobID>\"\n{\n   \"jobID\":\"0d6029b8-1159-4b6e-b4c3-25816f91f030\",\n   \"outputs\":[\n      {\n         \"input\":\"/files/project/input.psd\",\n         \"status\":\"running\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\"\n      },\n      {\n         \"input\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"status\":\"succeeded\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n         \"_links\":{\n            \"renditions\":[\n               {\n                  \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n                  \"storage\":\"external\",\n                  \"width\":512,\n                  \"type\":\"image/jpeg\"\n               },\n               {\n                  \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n                  \"storage\":\"external\",\n                  \"width\":0,\n                  \"type\":\"image/png\"\n               },\n               {\n                  \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n                  \"storage\":\"external\",\n                  \"width\":0,\n                  \"type\":\"image/tiff\"\n               },\n               {\n                  \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n                  \"storage\":\"external\",\n                  \"type\":\"image/vnd.adobe.photoshop\"\n               }\n            ]\n         }\n      },\n      {\n         \"input\":\"/files/project/input_with_errors.psd\",\n         \"status\":\"failed\",\n         \"created\":\"2018-01-04T12:57:15.12345:Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n         \"errors\":{\n            \"input\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n            \"status\":\"failed\",\n            \"code\":\"404\",\n            \"error\":{\n               \"type\":\"FileExistsError\",\n               \"title\":\"input file does not exist\"\n            }\n         }\n      }\n   ],\n   \"_links\":{\n      \"self\":{\n         \"href\":\"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n      }\n   }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example Batch:",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 233\nLocation: \"https://image.adobe.io/pie/psdService/status/<<:jobID>>\"\n{\n  \"jobID\": \"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n  \"outputs\":[\n    {\n      \"input\":\"/file/project_files/\",\n      \"status\":\"succeeded\",\n      \"created\":\"2018-01-04T12:57:15.12345:Z\",\n      \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n      \"_links\":{\n        \"renditions\":[\n          {\n            \"href\":\"/file/project_files/one.psd\",\n            \"storage\":\"external\",\n            \"width\":512,\n            \"type\":\"image/jpeg\"\n          }\n        ]\n      }\n    },\n    {\n      \"input\":\"/file/project_files/\",\n      \"status\":\"succeeded\",\n      \"created\":\"2018-01-04T12:57:15.12345:Z\",\n      \"modified\":\"2018-01-04T12:58:36.12345:Z\",\n      \"_links\":{\n        \"renditions\":[\n          {\n            \"href\":\"/file/project_files/two.psd\",\n            \"storage\":\"external\",\n            \"width\":512,\n            \"type\":\"image/jpeg\"\n          }\n        ]\n      }\n    }\n  ],\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/<:jobID>\" }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Request: HTTP Example",
          "content": "GET /psdService/status/<:jobId> HTTP/1.1\nHost: image.adobe.io\nAuthorization: Bearer $token\nX-Api-Key: $api_key",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X GET https://image.adobe.io/pie/psdService/status/<:jobId>",
          "type": "curl"
        },
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"/psdService/status/<:jobId>\"\n{\n    \"jobId\":\"<:jobId>\",\n    \"outputs\":[\n        {\n            \"input\":\"<input>\",\n            \"status\":\"<status>\",\n            \"_links\":{\n              \"renditions\":[\n                {\n                  \"href\":\"<href>\",\n                  \"storage\":\"<storage>\",\n                  \"width\":\"<width>\",\n                  \"type\":\"<type>\"\n                }\n              ]\n            }\n        },\n        {\n            \"input\":\"<input>\",\n            \"status\":\"<status>\",\n            \"errors\": {\n              \"type\": \"<errorType>\",\n              \"title\": \"<errorDescription>\",\n              \"code\": \"<errorCode>\",\n              \"<errorDetails>\": [\n                {\n                  \"name\":\"<paramName>\",\n                  \"reason\":\"<error>\"\n                }\n              ]\n            }\n        }\n    ],\n    \"_links\":{\n        \"self\":{\n            \"href\":\"https://image.adobe.io/pie/psdService/status/<:jobId>\"\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "docs-src/pre-release/get-renditions-create.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response-Inline Templated",
          "content": "// This is a templated example for when a requested job has failed\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"jobId\": \"<jobID\",\n  \"outputs\":[\n      {\n        \"input\":\"<href>\",\n        \"status\":\"<status>\",\n        \"created\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"modified\":\"<YYYY-DD-MMThh:mm:ss.mmmmmZ>\",\n        \"errors\":{\n          \"type\":\"<errorType>\",\n          \"title\":\"<errorDescription>\",\n          \"code\": \"\"<errorCode>\",\n          \"<errorDetails>\":[\n            {\n              \"name\":\"<paramName>\",\n              \"reason\":\"<error>\"\n            }\n          ]\n        }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Error-Response-Inline Example",
          "content": " // In this example the GET call to /status succeeds but one of the initiated jobs has failed\n\n HTTP/1.1 200 OK\n Content-Type: application/json\n Content-Length: {xsd:nonNegativeInteger}\n Location: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n {\n   \"jobId\":\"f54e0fcb-260b-47c3-b520-de0d17dc2b67\",\n   \"outputs\":[\n      {\n         \"input\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\",\n         \"status\":\"failed\",\n         \"created\":\"2018-01-04T12:57:15.12345Z\",\n         \"modified\":\"2018-01-04T12:58:36.12345Z\",\n         \"error\":{\n            \"type\":\"FileExistsError\",\n            \"title\":\"input file does not exist\",\n            \"code\":\"400\"\n         }\n      }\n   ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/pie/psdService/smartObject",
    "title": "smart object",
    "description": "<p>Initiates an asynchronous job to apply psd edits for replacing embedded smart object and then generate renditions and/or save a new psd</p>",
    "version": "1.0.0",
    "name": "smartObject",
    "group": "Photoshop",
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "input[]",
            "optional": false,
            "field": "inputs",
            "description": "<p>An array of input objects. We currently only support one input object.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "inputs.input",
            "description": "<p>An object describing an input PSD file.Current support is for files less than 1000MB.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options",
            "description": "<p>available options to apply to all input files</p>"
          },
          {
            "group": "Request",
            "type": "layer[]",
            "optional": false,
            "field": "options.layers",
            "description": "<p>array of layer objects An array of layer objects you wish to act upon (edit, add, delete). Any layer missing an &quot;operations&quot; block will be ignored.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.layers.layer",
            "description": "<p>a layer object to replace the smartobject layer with the same bounds as the original</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": false,
            "field": "options.layers.layer.id",
            "description": "<p>The layer id</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.layers.layer.name",
            "description": "<p>The layer name.You can identify a layer by id or name. That makes either id or name a required field.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.locked",
            "defaultValue": "false",
            "description": "<p>Is the layer locked</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "options.layers.layer.visible",
            "defaultValue": "true",
            "description": "<p>Is the layer visible</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options.layers.layer.input",
            "description": "<p>An object describing the input file to add or replace for the Embedded Smart Object layer. Currently supported filetypes include:</p> <ul>   <li>png</li>   <li>jpeg</li>   <li>psd</li>   <li>svg</li>   <li>ai</li>   <li>pdf</li> </ul> Added images are always placed at (top,left = 0,0) and bounds are ignored</br> Edited images are replaced for exact pixel size"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "options.layers.layer.input.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "options.layers.layer.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL</p> <ul>   <li>CC Storage hrefs can be either a single asset or a folder</li>   <li>CC Storage hrefs must be prepended with `/files`. The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li> </ul>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.add",
            "description": "<p>Inidicates you want to add a new smart object layer. You must also indicate where you want to insert the new layer by supplying one of the attributes <code>insertAbove</code>, <code>insertBelow</code>, <code>insertInto</code>, <code>insertTop</code> or <code>insertBottom</code>. &quot;Add&quot; block overwrites the default &quot;Edit&quot; block.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.add.insertAbove",
            "description": "<p>Used to add the layer above another. If the layer ID indicated is a group layer than the layer will be inserted above the group layer.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.add.insertAbove.id",
            "description": "<p>The id of the layer you want to insert above. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.add.insertAbove.name",
            "description": "<p>The name of the layer you want to insert above. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.add.insertBelow",
            "description": "<p>Used to add the layer below another. If the layer ID indicated is a group layer than the layer will be inserted below (and outside of) the group layer</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.add.insertBelow.id",
            "description": "<p>The id of the layer you want to insert below. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.add.insertBelow.name",
            "description": "<p>The name of the layer you want to insert below. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.add.insertInto",
            "description": "<p>Used to add the layer inside of a group. Useful when you need to move a layer to an empty group.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.add.insertInto.id",
            "description": "<p>The id of the group layer you want to insert into. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "options.layers.layer.add.insertInto.name",
            "description": "<p>The name of the group layer you want to insert into. Use either id OR name.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": true,
            "field": "options.layers.layer.bounds",
            "description": "<p>The bounds of this layer. While replacing a smart object if you provide the same aspect ratio(width/height) as of the actual image as a bound, the embedded SO will not be a distorted image.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.bounds.top",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "options.layers.layer.bounds.left",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "=4.00...32000.00"
            ],
            "optional": true,
            "field": "options.layers.layer.bounds.width",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "float",
            "allowedValues": [
              "=4.00...32000.00"
            ],
            "optional": true,
            "field": "options.layers.layer.bounds.height",
            "description": "<p>in pixels</p>"
          },
          {
            "group": "Request",
            "type": "output[]",
            "optional": false,
            "field": "outputs",
            "description": "<p>An array of output objects</p>"
          },
          {
            "group": "Request",
            "type": "output",
            "optional": false,
            "field": "outputs.output",
            "description": "<p>An object describing the requested file output (a new PSD file. right now supports a single output PSD)</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "outputs.output.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "outputs.output.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedPUTURL..</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"image/jpeg\"",
              "\"image/png\"",
              "\"image/tiff\"",
              "\"image/vnd.adobe.photoshop\""
            ],
            "optional": false,
            "field": "outputs.output.type",
            "description": "<p>desired image format.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.output.quality",
            "defaultValue": "7",
            "description": "<p>quality of the renditions for JPEG. Range from 1 to 7, with 7 as the highest quality.</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": true,
            "field": "outputs.output.compression",
            "defaultValue": "large",
            "description": "<p>compression level for PNG: small, medium or large.</p>"
          },
          {
            "group": "Request",
            "type": "int",
            "optional": true,
            "field": "outputs.output.width",
            "defaultValue": "0",
            "description": "<p>width, in pixels, of the renditions. Width of 0 generates a full size rendition.  Height is not necessary as the rendition generate will automatically figure out the correct width-to-height aspect ratio. Only supported for image renditions</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "outputs.output.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "inputs.input.storage",
            "defaultValue": "adobe",
            "description": "<p>storage platforms supported</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "inputs.input.href",
            "description": "<p>Either a Creative Cloud assets path for storage=&quot;adobe&quot; OR a presignedGETURL.</p>  <ul>    <li>CC Storage path must be prepended with `/files` or `/cloud-content` or `/assets`       <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>       <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>       <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request: HTTP Templated",
          "content": "POST https://image.adobe.io/pie/psdService/smartObject HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"inputs\": [\n    {\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\": \"<storage>\"\n    }\n  ],\n  \"options\" : {\n    \"layers\" : [{\n      \"name\": \"<name>\",\n      \"id\": \"<id>\",\n      \"visible\": <bool>,\n      \"locked\": <bool>,\n      \"input\": {\n        \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n        \"storage\": \"<storage>\"\n      },\n      \"bounds\" : {\n        \"width\" : <width>,\n        \"height\" : <height>\n      }\n    }]\n  },\n  \"outputs\": [\n     {\n      \"href\": \"<presigned_getURL> or <cc_storage_location>\",\n      \"storage\": \"adobe\",\n      \"type\": \"<type>\",\n      \"width\": <width>,\n      \"overwrite\": <bool>,\n      \"quality\": \"<quality>\"\n      \"compression\": \"<compression>\"\n    }\n  ]\n}",
          "type": "http"
        },
        {
          "title": "Request: HTTP Example",
          "content": "POST https://image.adobe.io/pie/psdService/smartObject HTTP/1.1\nHost: image.adobe.io\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n  \"inputs\": [{\n    \"href\": \"files/SO.psd\",\n    \"storage\": \"adobe\"\n  }],\n  \"options\": {\n    \"layers\": [{\n      \"name\": \"New\",\n      \"input\": {\n        \"href\": \"files/jt-guitar.jpeg\",\n        \"storage\": \"adobe\"\n      },\n      \"bounds\" : {\n        \"width\" : 602,\n        \"height\" : 400\n      }\n    }]\n  },\n  \"outputs\": [{\n    \"storage\": \"adobe\",\n    \"href\": \"files/SOedit.psd\",\n    \"type\": \"image/vnd.adobe.photoshop\"\n  }]\n}",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X POST -d '{\"inputs\": [{\"href\": \"files/SOCreate.psd\",\"storage\": \"adobe\"}],\"options\": {\"layers\": [{\"locked\": false,\"name\": \"New\",\"input\": {\"href\": \"files/output/jt-guitar.jpeg\",\"storage\": \"adobe\"},\"visible\": true}]},\"outputs\": [{\"storage\": \"adobe\",\"href\": \"files/SOedit.psd\",\"type\": \"image/vnd.adobe.photoshop\"}]}' https://image.adobe.io/pie/psdService/smartObject",
          "type": "curl"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links.self",
            "description": "<p>The link to GET the job status from</p>"
          },
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links",
            "description": "<p>any link the client follow, described by their relationship</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/<:jobId>\" }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 682\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/pie/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\" }\n  }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-smart-object.js",
    "groupTitle": "Photoshop",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>402: TrialLimitExceededError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        },
        {
          "title": "Response: TrialLimitExceededError Example:",
          "content": " // This is an example for when quota assigned is already used.\n HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/sensei/cutout",
    "title": "cutout create",
    "description": "<p>Initiate an asynchronous job to generate a PNG file in 4 channel RGBA format with the generated cutout mask applied to the input image</p>",
    "version": "1.0.0",
    "name": "cutout",
    "group": "Sensei",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "input",
            "description": "<p>Supported input file formats are JPEG and PNG</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "input.storage",
            "description": "<p>is the asset stored on Adobe's cloud or an external service (like AWS S3, Azure, Dropbox)</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "input.href",
            "description": "<p>Either an href to a single Creative Cloud asset for storage='adobe' OR a presignedGETURL for other external services. Supported input file types include png, jpg and tif.</p> <ul>    <li>CC Storage path must be prepended with `/files` or `/cloud-content` or `/assets`       <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>       <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>       <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li>    </li> </ul>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options",
            "description": ""
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"batch\"",
              "\"performance\""
            ],
            "optional": true,
            "field": "options.optimize",
            "defaultValue": "performance",
            "description": "<p>&quot;performance&quot; optimizes for speed. &quot;batch&quot; ensures the job will not fail due to timeout.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "output",
            "description": "<p>A PNG file</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "output.href",
            "description": "<p>The output path and file name for your mask. Either a Creative Cloud assets path for storage='adobe' OR a presignedGETURL for other external services.</p> <li>CC Storage path must be prepended with `/files` or `/cloud-content` or `/assets`    <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>    <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>    <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li> </li>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "output.storage",
            "description": "<p>will the output png be stored on Adobe's cloud or an external service (like AWS S3, Azure, Dropbox).</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "output.mask",
            "description": ""
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"binary\"",
              "\"soft\""
            ],
            "optional": false,
            "field": "output.mask.format",
            "defaultValue": "soft",
            "description": "<p>A soft (feathered) mask or binary mask</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "output.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "POST https://image.adobe.io/sensei/cutout HTTP/1.1\nHost: image.adobe.io\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n   \"input\":{\n      \"storage\":\"external\",\n      \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\"\n   },\n   \"output\":{\n      \"storage\":\"adobe\",\n      \"href\":\"/files/cutout/output/cutout.png\",\n      \"mask\":{\n         \"format\":\"soft\"\n      },\n      \"overwrite\":true\n   }\n}",
          "type": "http"
        },
        {
          "title": "Request (CURL command)",
          "content": "curl https://image.adobe.io/sensei/cutout \\\n-H \"Authorization: Bearer $token\" \\\n-H \"x-api-key: $api_key\" \\\n-d '{\n   \"input\":{\n      \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\"\n   },\n   \"output\":{\n      \"storage\":\"adobe\",\n      \"href\":\"/files/cutout/output/cutout.png\",\n      \"mask\":{\n         \"format\":\"soft\"\n      },\n      \"overwrite\":true\n   }\n}'",
          "type": "http"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-image-cutout-cutout.js",
    "groupTitle": "Sensei",
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links",
            "description": "<p>any link the client follow, described by their relationship</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/sensei/status/<:jobID>\" }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 682\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/sensei/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\" }\n  }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>402: TrialLimitExceededError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        },
        {
          "title": "Response: TrialLimitExceededError Example:",
          "content": " // This is an example for when quota assigned is already used.\n HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "object"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/sensei/status/<:jobID>",
    "title": "cutout status",
    "description": "<p>Get the status for an asynchronous cutout/mask job</p>",
    "version": "1.0.0",
    "name": "get-cutout-job-status",
    "group": "Sensei",
    "success": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobID",
            "description": "<p>The job to get status for.</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "jobID",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "created",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot; created timestamp of the job</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "modified",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot;  modified timestamp of the job</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"pending\"",
              "\"running\"",
              "\"succeeded\"",
              "\"failed\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>the job status</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "input",
            "description": "<p>the original input href</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "options",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"batch\"",
              "\"performance\""
            ],
            "optional": false,
            "field": "options.optimize",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "output",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "output.storage",
            "description": "<p>The type of storage where the output asset is location</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "output.href",
            "description": "<p>The href to the output asset</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "output.mask",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"binary\"",
              "\"soft\""
            ],
            "optional": false,
            "field": "output.mask.format",
            "defaultValue": "soft",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "_links",
            "description": "<p>any link the client follow, described by their relationship</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Pending (or Running)",
          "content": "HTTP/1.1 200\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"https://image.adobe.io/sensei/status/<:jobID>\"\n{\n   \"jobID\":\"c900e70c-03b2-43dc-b6f0-b0db16333b4b\",\n   \"status\":\"pending\",\n   \"_links\":{\n      \"self\":{\n         \"href\":\"https://image.adobe.io/sensei/status/c900e70c-03b2-43dc-b6f0-b0db16333b4b\"\n      }\n   }\n}",
          "type": "object"
        },
        {
          "title": "Response: Succeeded",
          "content": "HTTP/1.1 200\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"https://image.adobe.io/sensei/status/<:jobID>\"\n{\n   \"jobID\":\"c900e70c-03b2-43dc-b6f0-b0db16333b4b\",\n   \"status\":\"succeeded\",\n   \"input\": \"/files/images/input.jpg\",\n   \"output\":{\n      \"storage\":\"adobe\",\n      \"href\":\"/files/cutout/output/mask.png\",\n      \"mask\":{\n         \"format\":\"soft\"\n      },\n      \"color\":{\n         \"space\":\"rgb\"\n      }\n   },\n   \"options\":{\n      \"optimize\":\"performance\"\n   },\n   \"_links\":{\n      \"self\":{\n         \"href\":\"https://image.adobe.io/sensei/status/c900e70c-03b2-43dc-b6f0-b0db16333b4b\"\n      }\n   }\n}",
          "type": "object"
        },
        {
          "title": "Response: Job Failed",
          "content": "HTTP/1.1 200\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"https://image.adobe.io/sensei/status/<:jobID>\"\n{\n   \"jobID\":\"c900e70c-03b2-43dc-b6f0-b0db16333b4b\",\n   \"status\":\"failed\",\n   \"input\": \"/files/images/input.jpg\",\n   \"errors\":{\n      \"type\":\"<errorType>\",\n      \"code\":\"<errorCode>\",\n      \"title\":\"<errorDescription>\",\n      \"<errorDetails>\":[\n         {\n            \"name\":\"<paramName>\",\n            \"reason\":\"<error>\"\n         }\n      ]\n   },\n   \"_links\":{\n      \"self\":{\n         \"href\":\"https://image.adobe.io/sensei/status/c900e70c-03b2-43dc-b6f0-b0db16333b4b\"\n      }\n   }\n}",
          "type": "object"
        },
        {
          "title": "Request: HTTP Example",
          "content": "GET /sensei/status/<:jobID> HTTP/1.1\nHost: image.adobe.io\nAuthorization: Bearer $token\nX-Api-Key: $api_key",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X GET https://image.adobe.io/sensei/status/<:jobID>",
          "type": "curl"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request (CURL command)",
          "content": "curl -H \"Authorization: Bearer $token\" \\\n-H \"x-api-key: $api_key\" \\\nhttps://image.adobe.io/sensei/status/c900e70c-03b2-43dc-b6f0-b0db16333b4b",
          "type": "http"
        }
      ]
    },
    "filename": "docs-src/pre-release/get-image-cutout-cutout.js",
    "groupTitle": "Sensei",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "https://image.adobe.io/sensei/status/<:jobID>",
    "title": "mask status",
    "description": "<p>Get the status for an asynchronous cutout/mask job</p>",
    "version": "1.0.0",
    "name": "get-mask-job-status",
    "group": "Sensei",
    "success": {
      "fields": {
        "URL Param": [
          {
            "group": "URL Param",
            "type": "string",
            "optional": false,
            "field": "jobID",
            "description": "<p>The job to get status for.</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "jobID",
            "description": "<p>the job's id requested</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "created",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot; created timestamp of the job</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "modified",
            "description": "<p>&quot;YYYY-DD-MMThh:mm:ss.mmmmmZ&quot;  modified timestamp of the job</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"pending\"",
              "\"running\"",
              "\"succeeded\"",
              "\"failed\""
            ],
            "optional": false,
            "field": "status",
            "description": "<p>the job status</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "input",
            "description": "<p>the original input href</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "options",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"batch\"",
              "\"performance\""
            ],
            "optional": false,
            "field": "options.optimize",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "output",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "output.storage",
            "description": "<p>The type of storage where the output asset is location</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "output.href",
            "description": "<p>The href to the output asset</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "output.mask",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "allowedValues": [
              "\"binary\"",
              "\"soft\""
            ],
            "optional": false,
            "field": "output.mask.format",
            "defaultValue": "soft",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "_links",
            "description": "<p>any link the client follow, described by their relationship</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Pending (or Running)",
          "content": "HTTP/1.1 200\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"https://image.adobe.io/sensei/status/<:jobID>\"\n{\n   \"jobID\":\"c900e70c-03b2-43dc-b6f0-b0db16333b4b\",\n   \"status\":\"pending\",\n   \"_links\":{\n      \"self\":{\n         \"href\":\"https://image.adobe.io/sensei/status/c900e70c-03b2-43dc-b6f0-b0db16333b4b\"\n      }\n   }\n}",
          "type": "object"
        },
        {
          "title": "Response: Succeeded",
          "content": "HTTP/1.1 200\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"https://image.adobe.io/sensei/status/<:jobID>\"\n{\n   \"jobID\":\"c900e70c-03b2-43dc-b6f0-b0db16333b4b\",\n   \"status\":\"succeeded\",\n   \"input\": \"/files/images/input.jpg\",\n   \"options\":{\n      \"optimize\":\"performance\"\n   },\n   \"output\":{\n      \"storage\":\"adobe\",\n      \"href\":\"/files/cutout/output/mask.png\",\n      \"mask\":{\n         \"format\":\"soft\"\n      },\n      \"color\":{\n         \"space\":\"rgb\"\n      }\n   },\n   \"_links\":{\n      \"self\":{\n         \"href\":\"https://image.adobe.io/sensei/status/c900e70c-03b2-43dc-b6f0-b0db16333b4b\"\n      }\n   }\n}",
          "type": "object"
        },
        {
          "title": "Response: Job Failed",
          "content": "HTTP/1.1 200\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\nLocation: \"https://image.adobe.io/sensei/status/<:jobID>\"\n{\n   \"jobID\":\"c900e70c-03b2-43dc-b6f0-b0db16333b4b\",\n   \"status\":\"failed\",\n   \"input\": \"/files/images/input.jpg\",\n   \"errors\":{\n      \"type\":\"<errorType>\",\n      \"code\":\"<errorCode>\",\n      \"title\":\"<errorDescription>\",\n      \"<errorDetails>\":[\n         {\n            \"name\":\"<paramName>\",\n            \"reason\":\"<error>\"\n         }\n      ]\n   },\n   \"_links\":{\n      \"self\":{\n         \"href\":\"https://image.adobe.io/sensei/status/c900e70c-03b2-43dc-b6f0-b0db16333b4b\"\n      }\n   }\n}",
          "type": "object"
        },
        {
          "title": "Request: HTTP Example",
          "content": "GET /sensei/status/<:jobID> HTTP/1.1\nHost: image.adobe.io\nAuthorization: Bearer $token\nX-Api-Key: $api_key",
          "type": "http"
        },
        {
          "title": "Request: CURL Templated",
          "content": "curl -H \"Authorization: Bearer $token\" -H \"x-api-key: $api_key\" -X GET https://image.adobe.io/sensei/status/<:jobID>",
          "type": "curl"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request (CURL command)",
          "content": "curl -H \"Authorization: Bearer $token\" \\\n-H \"x-api-key: $api_key\" \\\nhttps://image.adobe.io/sensei/status/c900e70c-03b2-43dc-b6f0-b0db16333b4b",
          "type": "http"
        }
      ]
    },
    "filename": "docs-src/pre-release/get-image-cutout-mask.js",
    "groupTitle": "Sensei",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "https://image.adobe.io/sensei/mask",
    "title": "mask create",
    "description": "<p>Initiate an asynchronous job to generate a mask PNG</p>",
    "version": "1.0.0",
    "name": "mask",
    "group": "Sensei",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>&quot;application/json&quot;</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "authorization",
            "description": "<p>Authorization value.</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>a client id</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": true,
            "field": "x-gw-ims-org-id",
            "defaultValue": "nil",
            "description": "<p>x-gw-ims-org-id the IMS organization ID. This needs to be sent only if it is desirable to receive the job status through Adobe I/O Events</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request": [
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "input",
            "description": "<p>Supported input file formats are JPEG and PNG</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "input.storage",
            "description": "<p>is the asset stored on Adobe's cloud or an external service (like AWS S3, Azure, Dropbox)</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "input.href",
            "description": "<p>Either an href to a single Creative Cloud asset for storage='adobe' OR a presignedGETURL for other external services. Supported input file types include png, jpg and tif.</p> <li>CC Storage path must be prepended with `/files` or `/cloud-content` or `/assets`    <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>    <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>    <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li> </li>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "options",
            "description": ""
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"batch\"",
              "\"performance\""
            ],
            "optional": true,
            "field": "options.optimize",
            "defaultValue": "performance",
            "description": "<p>&quot;performance&quot; optimizes for speed. &quot;batch&quot; ensures the job will not fail due to timeout.</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "output",
            "description": "<p>A PNG file</p>"
          },
          {
            "group": "Request",
            "type": "string",
            "optional": false,
            "field": "output.href",
            "description": "<p>The output path and file name for your mask. Either a Creative Cloud assets path for storage='adobe' OR a presignedGETURL for other external services.</p> <li>CC Storage path must be prepended with `/files` or `/cloud-content` or `/assets`    <li>The `/files` path directly corresponds to the root of your local `Creative Cloud Files` folder</li>    <li>The `/cloud-content` path directly corresponds to the root of your `Cloud documents` folder in CC</li>    <li>The `/assets` path directly corresponds to the specific sync-group section of CC storage</li> </li>"
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"adobe\"",
              "\"external\"",
              "\"azure\"",
              "\"dropbox\""
            ],
            "optional": false,
            "field": "output.storage",
            "description": "<p>will the output png be stored on Adobe's cloud or an external service (like AWS S3, Azure, Dropbox).</p>"
          },
          {
            "group": "Request",
            "type": "object",
            "optional": false,
            "field": "output.mask",
            "description": ""
          },
          {
            "group": "Request",
            "type": "string",
            "allowedValues": [
              "\"binary\"",
              "\"soft\""
            ],
            "optional": false,
            "field": "output.mask.format",
            "defaultValue": "soft",
            "description": "<p>A soft (feathered) mask or binary mask.</p>"
          },
          {
            "group": "Request",
            "type": "bool",
            "optional": true,
            "field": "output.overwrite",
            "defaultValue": "true",
            "description": "<p>If the file already exists, indicates if the output file should be overwritten. Will eventually support eTags. Only applies to CC Storage</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "POST https://image.adobe.io/sensei/mask HTTP/1.1\nHost: image.adobe.io\nAuthorization: Bearer $token\nX-Api-Key: $api_key\n{\n   \"input\":{\n      \"storage\":\"external\",\n      \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\"\n   },\n   \"output\":{\n      \"storage\":\"adobe\",\n      \"href\":\"/files/cutout/output/mask.png\",\n      \"mask\":{\n         \"format\":\"soft\"\n      },\n      \"overwrite\":true\n   }\n}",
          "type": "http"
        },
        {
          "title": "Request (CURL command)",
          "content": "curl https://image.adobe.io/sensei/mask \\\n-H \"Authorization: Bearer $token\" \\\n-H \"x-api-key: $api_key\" \\\n-d '{\n   \"input\":{\n      \"storage\":\"external\",\n      \"href\":\"https://some-bucket-us-east-1.amazonaws.com/s3_presigned_getObject...\"\n   },\n   \"output\":{\n      \"storage\":\"adobe\",\n      \"href\":\"/files/cutout/output/mask.png\",\n      \"mask\":{\n         \"format\":\"soft\"\n      },\n      \"overwrite\":true\n   }\n}'",
          "type": "http"
        }
      ]
    },
    "filename": "docs-src/pre-release/post-image-cutout-mask.js",
    "groupTitle": "Sensei",
    "success": {
      "fields": {
        "Success 202": [
          {
            "group": "Success 202",
            "type": "object",
            "optional": false,
            "field": "_links",
            "description": "<p>any link the client follow, described by their relationship</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Success Templated",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/sensei/status/<:jobID>\" }\n  }\n}",
          "type": "object"
        },
        {
          "title": "Response: Success Example",
          "content": "HTTP/1.1 202 ACCEPTED\nContent-Type: application/json\nContent-Length: 682\n{\n  \"_links\": {\n      \"self\" :{ \"href\" : \"https://image.adobe.io/sensei/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\" }\n  }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "fields": {
        "Errors": [
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>a machine-readable error type</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>a machine-readable error code</p>"
          },
          {
            "group": "Errors",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>short, human-readable summary of the problem</p>"
          },
          {
            "group": "Errors",
            "type": "array",
            "optional": false,
            "field": "errorDetails",
            "description": "<p>further descriptions of the exact errors where <code>errorDetail</code> is substituted for a specific issue.</p>"
          },
          {
            "group": "Errors",
            "type": "details",
            "optional": false,
            "field": "errorCodes",
            "description": "<p>This field does not appear in the response but is a partial list of error codes and types</p>  <ul>    <li>400: InputValidationError</li>    <li>400: PayloadValidationError</li>    <li>400: RequestBodyError</li>    <li>401: MissingAuthTokenError</li>    <li>401: InvalidAuthTokenError</li>    <li>402: TrialLimitExceededError</li>    <li>403: AuthForbidden</li>    <li>404: FileExistsErrors</li>    <li>404: InputFileExistsErrors</li>    <li>404: ResourceNotFound</li>    <li>415: InvalidContentTypeError</li>    <li>500: UndefinedError</li>  </ul>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response: Error Templated",
          "content": "// This is a templated example for when the call itself fails\n\nHTTP/1.1 <Status_Code> <Reason>\nContent-Type: application/json\nContent-Length: <nonNegativeInteger>\n{\n  \"type\": \"<errorType>\",\n  \"code\": \"<errorCode>\",\n  \"title\": \"<errorDescription>\",\n  \"<errorDetails>\": [\n    {\n      \"name\":\"<paramName>\",\n      \"reason\":\"<error>\"\n    }\n  ]\n}",
          "type": "object"
        },
        {
          "title": "Response: Error Example",
          "content": "// This is an example for when the call itself fails\n\nHTTP/1.1 404 OK\nContent-Type: application/json\nContent-Length: 584\nLocation: \"/psdService/status/f54e0fcb-260b-47c3-b520-de0d17dc2b67\"\n{\n    \"type\": \"ResourceNotFound\",\n    \"title\": \"Requested resource was not found\",\n    \"code\": 404\n}",
          "type": "object"
        },
        {
          "title": "Response: TrialLimitExceededError Example:",
          "content": " // This is an example for when quota assigned is already used.\n HTTP/1.1 402 Payment Required\n Content-Type: application/json\n {\n  \"title\": \"Trial Limit Exceeded Error\",\n  \"code\": 402,\n  \"type\": \"TrialLimitExceededError\",\n  \"details\": \"Trial limit for the subscribed plan has been exceeded. For questions about additional capacity please reach out to PS team at psdservices@adobe.com\"\n}",
          "type": "object"
        }
      ]
    }
  }
] });
