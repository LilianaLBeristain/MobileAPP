## Prerequisites
* Login to azure account through vscode
* Install docker
* Install kubernetes cli, kubectl: `az aks install-cli`
* Install [Helm](https://helm.sh/docs/intro/install/)
* Install [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).

## Setting up and Deploying Rasa Infrastructure

1. Go to the file `azuredeploy.parameters.json` and replace GEN-UNIQUE with details such as cluster name and the admin's ssh key.
2. Run command: `az group create --name <name-of-resource-group> --location <location>`
3. `az deployment group create --name <name-of-deployment> --resource-group <name-of-resource-group-created-above> --template-file azuredeploy.json --parameters azuredeploy.parameters.json`
4. After the previous steps, there should now be an empty kubernetes cluster ready for hosting the rasa bot code.

## Setting up kubernetes cluster

1. Clone github repository containing code for the Rasa bot and other configuration files.
2. Create a resource group and container registry for docker image: 
    1. `az group create --name <name-of-resource-group> --location <location>`
    2. `az acr create --resource-group myResourceGroup --name <acrName> --sku Basic`
3. Build docker image and push to registry. Make sure to login to acr first.
    1. `az acr login --name <acrName>`
    2. `docker build .` (Make sure to be in the github repo on the same level where `Dockerfile` is located). Use `docker images` to confirm image has been built.
    3. Get acr login server address to tag image: `az acr list --resource-group <name-of-resource-group> --query "[].{acrLoginServer:loginServer}" --output table`
    4. Finally, tag the docker image: `docker tag <image-name> <acrLoginServer>/<image-name>`
    5. Confirm image has been tagged correctly: `docker images`
    6. Push image to registry: `docker push <acrLoginServer>/<image-name>`
    7. Check image exists in acr: `az acr repository list --name <acrName> --output table`
4. Connect to remote kubernetes cluster: `az aks get-credentials --resource-group <name-of-resource-group> --name <cluster-name>`
5. Confirm connection to remote kubernetes cluster: `kubectl get nodes`

## Deploy Rasa application

1. Check helm has been downloaded successfully: `helm version --short`
2. Add rasa-x helm chart: `helm repo add rasa-x https://rasahq.github.io/rasa-x-helm`
3. Install helm chart while in directory containing rasabot `values.yml`: `helm install --generate-name --namespace <namespace> --values values.yml rasa-x/rasa-x`
4. To update the `values.yml` file for the helm deployment: `helm upgrade --values values.yml --namespace <namespace> --resuse-values rasa-x/rasa-x`
5. Confirm rasabot helm chart has been deployed: `kubectl --namespace <namespace> get pods`
6. Use command `kubectl -n <namespace> get service -l app.kubernetes.io/component=nginx -o jsonpath="{.items..status..loadBalancer..ingress[0].ip}"` to get IP address to website where rasa bot admin portal is deployed.
7. Password should be the value described in the file `values.yml`.
8. Follow steps on the Rasa X website to connect repository to Rasa X. Make sure the `config.yml` file for the Rasa X configuration files are at the root of the repository when linking the repository.

## Troubleshooting

* If there are errors in training the model, check the logs in kubernetes pod rasa-worker for more specific error messages.
* Make sure to delete failed and evicted pods.

## Helpful commands

* Create namespace: `kubectl create namespace <namespace>`
* Install helm chart repo for rasa under a namespace where your values.yml file is located (instantiate rasa kubernetes cluster): `helm install --generate-name -n <namespace> --values values.yml rasa-x/rasa-x`
* Get IP address for entry point to Rasa X UI: `kubectl -n <namespace> get service -l app.kubernetes.io/component=nginx -o jsonpath="{.items..status..loadBalancer..ingress[0].ip}"`
* Get pods of kubernetes cluster: `kubectl -n <namespace> get pods`
* Get logs of a certain kubernetes pod: `kubectl logs -n <namespace> rasabot -f <pod name>`
* Delete all failed/evicted pods under namespace: `kubectl -n rasabot delete pods --field-selector=status.phase=Failed`

## Notes
* The rasa infrastructure virtual machines can be resized in the Azure portal under the individual kubernetes components resource group under the heading `size`. This can be done to reduce costs, or increase size due to memory issues from training the model.
* KerasPolicy is deprecated
* EmbeddingIntentClassifier is deprecated

## More information
* https://docs.microsoft.com/en-us/azure/aks/tutorial-kubernetes-prepare-app 
