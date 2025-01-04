## Prerequisites
* Login to azure account through vscode
* Install [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).

## Steps to deploy mobile infrastructure

1. Create resource group for mobile infrastructure: `az group create --name <name-of-resource-group> --location <location>`
2. Deploy ARM template with chosen parameters in `azuredeploy.parameters.json`: `az deployment group create --name <name-of-deployment> --resource-group <name-of-resource-group> --template-file azuredeploy.json --parameters azuredeploy.parameters.json` (inside `immersioinfra/mobile`)
3. Once successfully deployed, note down key and connection string and update `.env` file from `/ImmersioServer` repository with values in azure portal's blob storage access keys.
4. Go to azure extension while in `/ImmersioServer` repository and upload local settings of `.env` file to allow Azure mobile cloud to access those variables
5. Finally, create new AAD app and secret on azure media services api access section page

## Steps to deploy code
1. To deploy server code to the mobile infrastructure, go to the azure extension on vscode
2. Login to correct azure account
3. Right click and select the  `deploy web app` option.

## How to add new lessons and videos
### Videos
1. Upload video as an asset onto Azure media service's assets section on the portal
2. Create a new job to transform mp4 file to enable a streaming format.
3. After job completes, copy video url with format `(format=m3u8-cmaf)` and paste it into react-native front end code where we want the video to be in the mobile application.
### Lessons
1. In Azure portal, find azure's blob storage from the deployed mobile infrastructure.
2. There should be a folder named lessons, where text and image content can be uploaded and consumed.
3. Make sure the uploaded files follow the naming conventions of existing lessons and pictures.

## Helpful Notes
* https://stackoverflow.com/questions/26343837/whats-the-best-way-to-stream-mp4-video-from-azure-media-services-for-ie8 
