# pie-in-the-sky
A web server that able to receive the requests to queue up jobs for rendition generation.   

## Generate docs
```
npm install apidoc -g
apidoc -i docs-src/ -o docs/
```

## API Documentation
```https://git.corp.adobe.com/pages/dice/pie-in-the-sky/```

## Instructions for OSX

### Install Go:
```brew install go```

### Install glide
```brew install glide```

### Clone the Project
Clone the project following the below structure
```
  <.>/
      src/
          pie-in-the-sky/
```
Or create a soft link one level up
```
$ pwd -> ~/git/pie-in-the-sky
$ cd ..
$ ln -s . src
```
### Set the environmental variable
```
export GOPATH=<GO_PROJ_ROOT>
export AWS_REGION=<AWS_REGION>                # default: us-east-1
export QUEUE_NAME_LAYERS=<LAYER_QUEUE_NAME>   # default: PIE-manifest-worker-stage
export S3_BUCKET_LAYERS=<S3_BUCKET_LAYERS>    # default: ciss-asset-storage-stage
export QUEUE_NAME_FILES=<QUEUE_NAME_FILES>    # default: PIE-operation-worker-stage
export DB_STATUS_TABLE=<DB_STATUS_TABLE>      # default: PIE-worker-stage
export DB_JOB_INDEX=<DB_JOB_INDEX> default: batch_job_id-index
```
### Setup AWS credentials
```Use KLAM```

### Install packages
```glide install```

### Add new package
```glide get <new package>```

### Compile server (debug mode):
```go build -gcflags "-N -l" -o debug_version server.go```

### Run server:
```go run server.go```
```env=local go run server.go # ENV refers to config filenames in ./config```

### Run server with Prod config
```
export AWS_PROFILE=<your_prof_profile>
export IMS_URL=https://ims-na1-cc1.adobelogin.com
export CC_URL=https://cc-api-storage.adobe.io/
env=prod go run server.go
```

### Build and push docker image
* Login into docker artifactory repo using cocoon credentials  
```
docker login -u $COCOON_ACCOUNT "https://docker2-mixamo-release-local.dr-uw2.adobeitc.com"
```

* Run dice-vault for credentials injection
```
docker run -d -p 0.0.0.0:14242:3000 -v ~/.ssh:/vault/.ssh docker2-mixamo-release-local.dr-uw2.adobeitc.com/dice-vault
```

* Build docker image  
```
docker build -t docker2-mixamo-release-local.dr-uw2.adobeitc.com/pie-in-the-sky:<commit> .
```
* Push docker image  
```
docker push docker2-mixamo-release-local.dr-uw2.adobeitc.com/pie-in-the-sky:<commit>
```
# pie-in-the-sky
