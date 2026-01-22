# Kubernetes Deployment Commands

## Deploy Everything

```bash
# Deploy Redis
kubectl apply -f k8s/redis.yaml

# Deploy Application
kubectl apply -f k8s/deployment.yaml
```

## Access Application

```bash
minikube service nodejs-todo-app-service --url

# Or port-forward
kubectl port-forward svc/nodejs-todo-app-service 9898:80
```

## View Resources

```bash
# All resources
kubectl get all

# Pods
kubectl get pods

# Services
kubectl get svc

# HPA
kubectl get hpa
```

## View Logs

```bash
# Application logs
kubectl logs -l app=nodejs-todo-app --tail=50

# Redis logs
kubectl logs -l app=redis --tail=50

# Follow logs
kubectl logs -l app=nodejs-todo-app -f
```

## Debugging

```bash
# Describe pod
kubectl describe pod <pod-name>

# Execute command in pod
kubectl exec -it <pod-name> -- /bin/sh

# Check events
kubectl get events --sort-by=.metadata.creationTimestamp
```

## Scaling

```bash
# Scale manually
kubectl scale deployment nodejs-todo-app --replicas=5

# Check HPA
kubectl get hpa
```

## Cleanup

```bash
# Delete application
kubectl delete -f k8s/deployment.yaml

# Delete Redis
kubectl delete -f k8s/redis.yaml

# Or delete everything
kubectl delete all --all
```
