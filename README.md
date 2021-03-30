# Kubernetes example of a web application

Example of a deploy a web application on kubernetes based on 3 services:

- api
- gui
- db postgres

## Usage

```bash
$ helm install db bitnami/postgresql -n codemotion
$ kubectl apply -f k8s/client.yaml
$ kubectl apply -f k8s/service.yaml
$ kubectl apply -f k8s/ingress.yaml
```
