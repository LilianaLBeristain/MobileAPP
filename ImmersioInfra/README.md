## Deploying Infrastructure

1. Download [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).
2. Using Azure CLI, run `az login` and provide the necessary credentials locally to an azure account.
3. Change the values inside `azuredeploy.parameters.json`.
4. Then, run the following steps using Azure CLI inside the **`/ImmersioInfra`** folder to create a resource group as well as deploy the ARM template defined in `azuredeploy.json`.
    1. `az group create --name <name-of-resource-group> --location "canadacentral"`
    2. `az deployment group create --name <name-of-deployment> --resource-group <name-of-resource-group-created-above> --template-file azuredeploy.json --parameters azuredeploy.parameters.json`

**NOTE**: To delete the resource group and its contents, run the command below.
  * `az group delete --name <name-of-resource-group>`

## Deploying Code

#### Prerequisites:
  * Visual Studio Code installed
  * Visual Studio Code App Service extension installed
  * Resource group created and infrastructure deployed
  * Make sure to open a separate workspace with just the [**`/ImmersioServer`**](https://github.com/stevenshih1997/ImmersioServer) contents in Visual Studio Code to perform the following steps
  * Make sure the code you wish to deploy build and works locally and has been committed.

#### Steps:

1. Login to the same azure account used to deploy the infrastructure above using the extension
2. Go into the extension to confirm that the resource group and server is under the account
4. Right click the server and select **Configure Deployment Source**. When prompted, select **LocalGit** and the appropriate folder (**`/ImmersioServer`**).
5. Press the blue up arrow icon to deploy the code to Azure.
6. Click **Yes** on any pop-ups

**NOTE**: 
* If additional help is needed, steps are displayed in more detail in the 'How to deploy your code' link.
* To tail the server logs with `Azure CLI`, run `az webapp log tail --name <name-of-webapp> --resource-group <name-of-resource-group>`

## Useful Resources
* [Ways to deploy an ARM template](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-cli)

* [How to deploy your code](https://docs.microsoft.com/en-ca/azure/developer/javascript/tutorial/deploy-nodejs-azure-app-service-with-visual-studio-code?tabs=bash)

* [ARM Template Examples](https://docs.microsoft.com/en-us/azure/azure-monitor/samples/resource-manager-web-app)

### TODO
* Change links to reflect final repos
* Change Azure accounts to reflect final product
* Change README to reflect accurate links
* Setup documentation for server
* Add SSL cert to mysql
* Properly setup firewall rules
* Add application insights for server and database
* Add periodic ping (once every ~20 sec for each connection to it) from server to database to keep it active and prevent ECONNRESET error. 
