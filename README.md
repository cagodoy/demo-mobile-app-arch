# Tenpo Challenge

Solution proposal with microservice oriented architecture. The mobile application is implemented by [React Native](https://facebook.github.io/react-native/) and in it users can search for nearby restaurants according to the GPS coordinate.

The backend architecture depends on a network of microservices that communicate through [GraphQL](https://graphql.org/) for external access, [Grpc](https://grpc.io/) for internal back-end communications and [NATS](https://nats.io/) for asynchronous communication processes.

The infrastructure was implemented with [Terraform](https://www.terraform.io/), using recipes associated with the implementation of a [Kubernetes](https://kubernetes.io/) cluster through the [Azure Kubernetes Service](https://azure.microsoft.com/services/kubernetes-service/) (AKS). On the other hand, there is also a service mesh implemented in [Linkerd](https://linkerd.io/) that allows you to manage package tracking between microservices, service logs, infrastructure metrics with [Prometheus](https://prometheus.io/)/[Grafana](https://grafana.com/) and other things.

It is possible to use [Skaffold](https://skaffold.dev/) to run a cluster through [Minikube](https://github.com/kubernetes/minikube). In this way, each functionality will be tested in the most similar way to the production environment.

## Screenshots

In progress...

## Service Architecture

The solution is composed of 5 microservices written in various languages. The main repository (where we are now) is a monorepo but each of the services has its respective repository and everything is linked through the Git sub-modules.

[![Architecture of
microservices](./docs/images/architecture.png)](./docs/images/architecture.png)

Find **Protocol Buffers Descriptions** at the [`./lib/proto/demo.proto` file](./lib/proto/demo.proto).

| Service                                                                  | Language   | Description                                                                                                                                                      |
| ------------------------------------------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Mobile App](./src/mobile-app)                                           | Javascript | Mobile application with login, signup, search and history screens.                                                                                               |
| [Gateway Service](https://github.com/cagodoy/tenpo-gateway-api/)         | Typescript | service that acts as a 'data aggregation layer' through GraphQL. Through it you can access the resources provided by the back-end microservices.                 |
| [Users Service](https://github.com/cagodoy/tenpo-users-api/)             | Golang     | Microservice implemented in Golang that stores user information into postgres DB.                                                                                |
| [Auth Service](https://github.com/cagodoy/tenpo-auth-api/)               | Golang     | Microservice implemented in Typecript that allows authenticating access to the backend through a JWT token. On the other hand, it manages user signup and login. |
| [Restaurants Service](https://github.com/cagodoy/tenpo-restaurants-api/) | Golang     | Microservice implemented in Golang that get nearby restaurants from Google Places API.                                                                           |
| [History Service](https://github.com/cagodoy/tenpo-history-api/)         | Golang     | The microservice implemented in Golang saves the history associated with searches performed in the restaurant service.                                           |
| [NATS Server](https://hub.docker.com/_/nats)                             | -          | NATS is an open-source, high-performance, cloud native messaging system.                                                                                         |

## Production links

- GraphQL Backend: [http://tenpo-aks-ingress.centralus.cloudapp.azure.com/graphql](http:/tenpo-aks-ingress.centralus.cloudapp.azure.com/graphql)
- Mobile: [https://expo.io/@cagodoy/tenpo-challenge-mobile](https://expo.io/@cagodoy/tenpo-challenge-mobile) (in progress...)
- Linkerd Dashboard: [http://localhost:50750](http://localhost:50750)

## Prepare Project

- Clone repo: `git clone git@github.com:cagodoy/tenpo-challenge.git`.
- Prepare lib folder: inside [`./lib` directory](./lib) folder.
  - Run `make prepare`: Install NodeJS dependencies used by js clients.
  - Run `make typescript`: Transpile `auth`, `users`, `restaurants`, `history` typescript clients files.
- Initialize sub modules: `git submodule update --init`.
  - Run `make prepare` inside `auth-api` folder.

## Docker Commands (Development)

- `make compose`: start docker-compose in local with all services.
- `make stop`: stop docker-compose.

## Skaffold Commands (Pre Production)

- `brew install skaffold`: install skaffold dependency.
- `brew install kubectl`: install kubectl cli.
- `brew install minikube`: install minikube.
- `minikube start`: start minikube.
- `skaffold run`: start skaffold.

## Infrastructure Terraform Commands

1. Configure Terraform with azure in our machine. [[Link]](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/terraform-install-configure)
2. Set up Azure storage to store Terraform state. [[Link]](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/terraform-install-configure#set-up-azure-storage-to-store-terraform-state)
3. Run `az storage container create -n tfstate --account-name <YourAzureStorageAccountName> --account-key <YourAzureStorageAccountKey>`
4. Run `terraform init -backend-config="storage_account_name=<YourAzureStorageAccountName>" -backend-config="container_name=tfstate" -backend-config="access_key=<YourStorageAccountAccessKey>" -backend-config="key=codelab.microsoft.tfstate"`
5. Configure ENV values in shell:
   - `export TF_VAR_client_id=<service-principal-appid>`
   - `export TF_VAR_client_secret=<service-principal-password>`
6. Run inside `./infra/terraform` the following commands.
   - `terraform plan -out out.plan` for generate tf plan file. (Wait 3 minutes approximately)
   - `terraform apply out.plan` for apply plan directly azure provider. (Wait 15 minutes approximately)
7. Check cluster with `kubectl get nodes`.
8. Configure Static Ip to use with HTTPS. [[Link]](https://docs.microsoft.com/en-us/azure/aks/ingress-static-ip)

## Deploy services to Kubernetes cluster

- Run inside `./infra/kubernetes` the following commands.
  - `kubectl apply -f ingress` for deploy `yaml` ingress files.
  - `kubectl apply -f services` for deploy `yaml` services files.

## Deploy Linkerd mesh service to Kubernetes cluster.

- `brew install linkerd`: install linkerd dependency.
- `linkerd check --pre`: checks to determine if the control plane can be installed on our cluster.
- `linkerd install | kubectl apply -f -`: install Linkerd to cluster.
- `kubectl get svc/pod --namespace linkerd --output wide`: confirm that the svc/pod resources are created.
- `linkerd check`: check cluster before Linkerd installation.
- `kubectl get deploy -o yaml | linkerd inject - | kubectl apply -f -`: inject all the deployments in the default namespace.
- `linkerd dashboard`: open linkerd web dashboard.

## TODO

- [ ] Implements CI/CD for each service. (check `/src` folder)
- [ ] Integration test for `auth` service for check GraphQL responses.
- [ ] Integration test for `restaurants` service for check GraphQL responses.
- [ ] Integration test for `history` service for check GraphQL responses.
