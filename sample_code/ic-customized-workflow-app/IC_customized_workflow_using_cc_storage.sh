#!/usr/bin/env bash
# this is a demo code snippet to use ImageCutOut service to generate cutout result as Photoshop path (Use Adobe Creative Cloud Storage)

# set up authorization token variable, by default it is the first argument
token='Your_Access_Token'

# set api key / client id
api_key='Your_Client_Id'

# set endpoint for ImageCutOut Service. API doc: https://adobedocs.github.io/photoshop-api-docs/#api-Sensei-cutout
ic_endpoint='https://image.adobe.io/sensei/cutout'

# set endpoint for Pegasus action service. API doc: https://adobedocs.github.io/photoshop-api-docs/#api-Photoshop-photoshopActions
pegasus_endpoint='https://image.adobe.io/pie/psdService/photoshopActions'


# This is the input file URL
input_url='A file URL for input image file'

# This is the URL for action file. Please download the make-path.atn and upload to your CC storage location
action_url='A file URL for action file (make-path.atn file downloaded)'

# This is the URL for intermediate result file.
intermediate_output_url='A file URL for intermediate result'

# This is the file URL final output. You will need to checkout the final cutout result with path from here.
final_output_url='A file URL for final result'


#--------------------------------------------- Call Sensei CutOut Service -----------------------------------------
# call Sensei-cutout API

ic_post_response=$(
curl -s $ic_endpoint \
-H "Authorization: Bearer $token" \
-H "x-api-key: $api_key"  \
-d '{
  "input": {
    "storage":"adobe",
    "href": "'$input_url'"
  },
  "output": {
    "storage":"adobe",
    "href": "'$intermediate_output_url'",
    "mask": {
      "format":"soft"
    },
    "overwrite":true
  }
}'
)

ic_status_endpoint=$(jq -r '._links.self.href' <<< $ic_post_response)


# waiting for Sensei-cutout service result to be ready
end=$((SECONDS+20)) # wait for 20 seconds


while [[ $SECONDS -lt $end && "$ic_status" != "succeeded" ]]; do
    :
    ic_status_response=$(
        curl -s $ic_status_endpoint \
        -H "Authorization: Bearer $token" \
        -H "x-api-key: $api_key"
        )
    ic_status=$(jq -r '.status' <<< $ic_status_response)
    echo ${ic_status}
    sleep 1

done

#------------------------------------------------------------------------------------------------------------------



#--------------------------------------------- Call Sensei CutOut Service -----------------------------------------
# call Photoshop action API

pegasus_response=$(
curl -s $pegasus_endpoint \
-H "Authorization: Bearer $token" \
-H "x-api-key: $api_key" \
-X POST \
-d '{
  "inputs": [
    {
      "href": "'$intermediate_output_url'",
      "storage": "adobe"
    }
  ],
  "options": {
    "actions": [
      {
        "href": "'$action_url'",
        "storage": "adobe"
      }
    ]
  },
  "outputs": [
    {
      "storage": "external",
      "type": "image/jpeg",
      "overwrite": true,
      "href": "'final_output_url'"
    }
  ]
}'
)
echo ${pegasus_response}

pegasus_status_endpoint=$(jq -r '._links.self.href' <<< $pegasus_response)


# waiting for Pegasus service result to be ready
end=$((SECONDS+20)) # almost wait 20 seconds

while [[ $SECONDS -lt $end && "$pegasus_status" != "succeeded" ]]; do
    :
    pegasus_status_response=$(
        curl -s $pegasus_status_endpoint \
        -H "Authorization: Bearer $token" \
        -H "x-api-key: $api_key"
        )
    pegasus_status=$(jq -r '.outputs[0].status' <<< $pegasus_status_response)
    echo ${pegasus_status}
    sleep 0.5

done

#------------------------------------------------------------------------------------------------------------------


# Note: Please check out the final result under the location where final_output_url was generated from.
# The final result should be in JPEG format with path embedded. Please open the result file in Photoshop and check the
# path panel
echo "\nScript completed !"