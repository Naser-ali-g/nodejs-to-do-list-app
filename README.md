# Node.js To-Do App with Redis

GitOps-powered To-Do List application using Node.js, Redis, Kubernetes, and ArgoCD.

## Features

- Node.js + Express backend
- Redis for data storage
- EJS templating
- Kubernetes deployment
- ArgoCD GitOps
- CI/CD with GitHub Actions

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: Redis
- **Frontend**: EJS, CSS
- **Container**: Docker
- **Orchestration**: Kubernetes (Minikube, EKS)
- **GitOps**: ArgoCD
- **CI/CD**: GitHub Actions

Perfect! Let me create a comprehensive, professional README.md for your GitHub repository! 📚

---

```bash

# 📝 Node.js To-Do Application with Kubernetes & AWS EKS

A production-ready To-Do List application built with Node.js, Redis, Docker, Kubernetes, and deployed on AWS EKS using Terraform and GitOps principles.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Redis](https://img.shields.io/badge/Redis-7.2-red)
![Kubernetes](https://img.shields.io/badge/Kubernetes-1.28-blue)
![AWS EKS](https://img.shields.io/badge/AWS-EKS-orange)
![Terraform](https://img.shields.io/badge/Terraform-1.6+-purple)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Project Structure](#project-structure)
- [CI/CD Pipeline](#cicd-pipeline)
- [Management & Operations](#management--operations)
- [Monitoring & Troubleshooting](#monitoring--troubleshooting)
- [Cost Estimation](#cost-estimation)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This project demonstrates a complete DevOps workflow for deploying a containerized Node.js application to production using modern cloud-native technologies and best practices.

**Live Demo:** [Coming Soon]

### What This Project Demonstrates

- 📦 **Containerization** with Docker (multi-stage builds)
- ☸️ **Kubernetes Orchestration** (Minikube locally, EKS in production)
- 🔄 **GitOps** with ArgoCD (for local development)
- 🏗️ **Infrastructure as Code** with Terraform (using official AWS modules)
- 🚀 **CI/CD** with GitHub Actions
- 📊 **Production-Ready** deployment with health checks, auto-scaling, and monitoring
- 🔒 **Security Best Practices** (non-root containers, resource limits, network policies)

---

## ✨ Features

### Application Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Real-time task statistics (total, completed, pending)
- ✅ Persistent data storage with Redis
- ✅ RESTful API endpoints
- ✅ Responsive web interface
- ✅ Health check endpoint (`/health`)
- ✅ Metrics endpoint (`/metrics`)

### DevOps Features

- 🐳 **Docker**: Multi-stage builds for optimized images (~200MB)
- ☸️ **Kubernetes**: Declarative deployments with self-healing
- 🔄 **Auto-scaling**: Horizontal Pod Autoscaler (HPA) based on CPU/memory
- 💾 **Persistent Storage**: Redis data persists across pod restarts
- 🌐 **Load Balancing**: AWS LoadBalancer for production traffic
- 🔐 **Security**: Non-root containers, resource limits, security contexts
- 📈 **Monitoring**: Health probes and metrics collection
- 🚀 **CI/CD**: Automated builds and deployments via GitHub Actions

---

## 🏗️ Architecture


## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js 18.x
- **Framework**: Express.js
- **Database**: Redis 7.2 (in-memory data store)
- **Template Engine**: EJS

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom styling with animations
- **JavaScript**: Vanilla JS for interactivity
- **Icons**: Font Awesome 6.0

### DevOps & Infrastructure
- **Containerization**: Docker (multi-stage builds)
- **Orchestration**: Kubernetes 1.28
- **Cloud Provider**: AWS (EKS, VPC, EBS, ELB)
- **IaC**: Terraform 1.6+ (official AWS modules)
- **CI/CD**: GitHub Actions
- **GitOps**: ArgoCD (local development)
- **Local K8s**: Minikube
- **Registry**: DockerHub

### Development Tools
- **Version Control**: Git & GitHub
- **Container Runtime**: Docker Engine
- **CLI Tools**: kubectl, terraform, aws-cli, argocd

---

## 📦 Prerequisites

### Required Software

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18.x+ | Application runtime |
| Docker | 24.x+ | Containerization |
| kubectl | 1.28+ | Kubernetes CLI |
| Terraform | 1.6+ | Infrastructure provisioning |
| AWS CLI | 2.x+ | AWS management |
| Minikube | 1.32+ | Local Kubernetes |
| Git | 2.x+ | Version control |

### AWS Requirements

- AWS Account with administrative access
- AWS Access Key ID and Secret Access Key
- IAM permissions for:
  - EKS cluster creation
  - VPC and networking
  - EC2 instances
  - IAM roles and policies

### Accounts & Services

- **GitHub Account**: For repository hosting and CI/CD
- **DockerHub Account**: For container image storage
- **AWS Account**: For production deployment

---

## 🚀 Quick Start

### Option 1: Local Development (Minikube)

```bash
# 1. Clone repository
git clone https://github.com/YOUR-USERNAME/nodejs-todo-app.git
cd nodejs-todo-app

# 2. Start Minikube
minikube start --cpus=4 --memory=8192

# 3. Build image in Minikube
eval $(minikube docker-env)
docker build -t nodejs-todo-app:v1.0.0 .

# 4. Deploy to Minikube
kubectl apply -f k8s/redis.yaml
kubectl apply -f k8s/deployment.yaml

# 5. Access application
minikube service nodejs-todo-app-service --url
````

### Option 2: Production Deployment (AWS EKS)

```bash
# 1. Clone repository
git clone https://github.com/YOUR-USERNAME/nodejs-todo-app.git
cd nodejs-todo-app

# 2. Configure AWS credentials
aws configure

# 3. Create EKS infrastructure
cd terraform
terraform init
terraform apply -auto-approve

# 4. Configure kubectl
aws eks update-kubeconfig --region us-east-1 --name nodejs-todo-app

# 5. Build and push image
docker build -t YOUR-DOCKERHUB-USERNAME/nodejs-todo-app:latest .
docker push YOUR-DOCKERHUB-USERNAME/nodejs-todo-app:latest

# 6. Deploy to EKS
kubectl apply -f k8s/production/

# 7. Get application URL
kubectl get svc nodejs-todo-app
```

---

## 💻 Local Development

### 1. Run Locally (Without Docker)

```bash
# Install dependencies
npm install

# Start Redis
docker run -d --name redis -p 6379:6379 redis:7.2-alpine

# Set environment variables
export REDIS_HOST=localhost
export REDIS_PORT=6379

# Start application
npm start

# Access at http://localhost:3000
```

### 2. Run with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Access at http://localhost:9898

# Stop services
docker-compose down
```

### 3. Deploy to Minikube

```bash
# Start Minikube
minikube start --cpus=4 --memory=8192

# Enable addons
minikube addons enable metrics-server
minikube addons enable ingress

# Point Docker to Minikube
eval $(minikube docker-env)

# Build image
docker build -t nodejs-todo-app:v1.0.0 .

# Deploy Redis
kubectl apply -f k8s/redis.yaml
kubectl wait --for=condition=ready pod -l app=redis --timeout=300s

# Deploy application
kubectl apply -f k8s/deployment.yaml
kubectl wait --for=condition=ready pod -l app=nodejs-todo-app --timeout=300s

# Access application
minikube service nodejs-todo-app-service --url
```

### 4. Set Up GitOps with ArgoCD (Optional)

```bash
# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for ArgoCD
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=argocd-server -n argocd --timeout=300s

# Get admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Access ArgoCD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Open https://localhost:8080
# Login: admin / [password from above]

# Create application
kubectl apply -f argocd/application.yaml
```

---

## 🌩️ Production Deployment

### Step 1: Prepare AWS Credentials

```bash
# Configure AWS CLI
aws configure
# Enter: Access Key ID
# Enter: Secret Access Key
# Region: us-east-1
# Output: json

# Verify credentials
aws sts get-caller-identity
```

### Step 2: Deploy Infrastructure with Terraform

```bash
cd terraform

# Initialize Terraform
terraform init

# Review plan
terraform plan

# Create infrastructure (10-15 minutes)
terraform apply -auto-approve

# Save outputs
terraform output
```

**What gets created:**

- VPC with public and private subnets across 2 availability zones
- Internet Gateway and NAT Gateway
- EKS cluster (control plane)
- EKS managed node group (2x t3.medium instances)
- Security groups and IAM roles
- All necessary networking components

### Step 3: Configure kubectl

```bash
# Update kubeconfig
aws eks update-kubeconfig --region us-east-1 --name nodejs-todo-app

# Verify connection
kubectl get nodes
# Should show 2 nodes in Ready status

# Check cluster info
kubectl cluster-info
```

### Step 4: Build and Push Production Image

```bash
# Go back to project root
cd ..

# Build production image
docker build -t YOUR-DOCKERHUB-USERNAME/nodejs-todo-app:latest .

# Login to DockerHub
docker login

# Push image
docker push YOUR-DOCKERHUB-USERNAME/nodejs-todo-app:latest
```

### Step 5: Deploy Application to EKS

```bash
# Deploy Redis
kubectl apply -f k8s/production/redis.yaml

# Wait for Redis to be ready
kubectl wait --for=condition=ready pod -l app=redis --timeout=300s

# Verify Redis
kubectl get pods -l app=redis
kubectl get pvc

# Deploy application
kubectl apply -f k8s/production/app.yaml

# Wait for application
kubectl wait --for=condition=ready pod -l app=nodejs-todo-app --timeout=300s

# Verify deployment
kubectl get all
```

### Step 6: Access Production Application

```bash
# Get LoadBalancer URL (takes 2-3 minutes to provision)
kubectl get svc nodejs-todo-app

# Wait for EXTERNAL-IP (refresh with -w flag)
kubectl get svc nodejs-todo-app -w

# Once EXTERNAL-IP appears, access application
APP_URL=$(kubectl get svc nodejs-todo-app -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
echo "Application URL: http://${APP_URL}"

# Test health endpoint
curl http://${APP_URL}/health

# Open in browser
open http://${APP_URL}  # macOS
xdg-open http://${APP_URL}  # Linux
```

### Step 7: Verify Deployment

```bash
# Check all resources
kubectl get all

# Check pod logs
kubectl logs -l app=nodejs-todo-app --tail=50

# Check Redis data
REDIS_POD=$(kubectl get pod -l app=redis -o jsonpath='{.items[0].metadata.name}')
kubectl exec -it $REDIS_POD -- redis-cli ping

# Check metrics
kubectl top nodes
kubectl top pods
```

---

## 📂 Project Structure

```
nodejs-todo-app/
│
├── terraform/                      # Infrastructure as Code
│   ├── main.tf                    # Main Terraform configuration (uses official AWS modules)
│   ├── variables.tf               # Input variables
│   ├── outputs.tf                 # Output values
│   └── terraform.tfvars           # Variable values (gitignored)
│
├── k8s/                           # Kubernetes manifests
│   ├── redis.yaml                 # Redis deployment (Minikube)
│   ├── deployment.yaml            # App deployment (Minikube)
│   └── production/                # Production manifests
│       ├── redis.yaml             # Production Redis
│       └── app.yaml               # Production app
│
├── argocd/                        # ArgoCD configuration
│   ├── application.yaml           # ArgoCD app for Minikube
│   └── access-argocd.sh           # ArgoCD access script
│
├── scripts/                       # Management scripts
│   ├── deploy.sh                  # Deploy to production
│   ├── status.sh                  # Check status
│   ├── logs.sh                    # View logs
│   └── cleanup.sh                 # Cleanup resources
│
├── .github/workflows/             # CI/CD pipelines
│   └── deploy-production.yml     # GitHub Actions workflow
│
├── views/                         # EJS templates
│   └── index.ejs                  # Main application view
│
├── public/                        # Static assets
│   └── styles.css                 # Application styles
│
├── app.js                         # Main application file
├── package.json                   # Node.js dependencies
├── Dockerfile                     # Multi-stage Docker build
├── .dockerignore                  # Docker ignore rules
├── docker-compose.yml             # Local development setup
│
├── README.md                      # This file
├── PRODUCTION.md                  # Production deployment guide
├── QUICKSTART.md                  # Quick start guide
├── LICENSE                        # MIT License
└── .gitignore                     # Git ignore rules
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The project uses GitHub Actions for automated builds and deployments.

**Workflow:** `.github/workflows/deploy-production.yml`

**Triggers:**

- Push to `main` branch
- Manual workflow dispatch

**Steps:**

1. **Checkout Code**: Clone repository
2. **Login to DockerHub**: Authenticate with container registry
3. **Build Image**: Build Docker image with build cache
4. **Security Scan**: Scan with Trivy (non-blocking)
5. **Push Image**: Push to DockerHub with tags (latest, commit SHA)
6. **Generate Summary**: Create deployment summary

**Required Secrets:**

Add these to your GitHub repository (Settings → Secrets → Actions):

- `DOCKERHUB_USERNAME`: Your DockerHub username
- `DOCKERHUB_TOKEN`: DockerHub access token

**Usage:**

```bash
# Automatic trigger
git add .
git commit -m "Update application"
git push origin main

# Manual trigger
# Go to: GitHub → Actions → Deploy to Production → Run workflow

# After pipeline completes
kubectl rollout restart deployment nodejs-todo-app
```

---

## 🎮 Management & Operations

### Deployment Scripts

#### Deploy Updates

```bash
./scripts/deploy.sh
```

Builds new image, pushes to DockerHub, and restarts deployment.

#### Check Status

```bash
./scripts/status.sh
```

Shows pods, services, storage, and application URL.

#### View Logs

```bash
./scripts/logs.sh
```

Follows logs from application pods.

#### Cleanup Resources

```bash
./scripts/cleanup.sh
```

Deletes Kubernetes resources (prompts for confirmation).

### Manual Operations

#### Scaling

```bash
# Manual scaling
kubectl scale deployment nodejs-todo-app --replicas=5

# Check HPA status
kubectl get hpa

# Describe HPA
kubectl describe hpa nodejs-todo-app-hpa
```

#### Rolling Updates

```bash
# Update image
kubectl set image deployment/nodejs-todo-app app=YOUR-USERNAME/nodejs-todo-app:v2.0.0

# Check rollout status
kubectl rollout status deployment nodejs-todo-app

# Rollout history
kubectl rollout history deployment nodejs-todo-app

# Rollback
kubectl rollout undo deployment nodejs-todo-app
```

#### Resource Management

```bash
# View resource usage
kubectl top nodes
kubectl top pods

# Describe deployment
kubectl describe deployment nodejs-todo-app

# Get deployment YAML
kubectl get deployment nodejs-todo-app -o yaml

# Edit deployment live
kubectl edit deployment nodejs-todo-app
```

---

## 🔍 Monitoring & Troubleshooting

### Health Checks

The application exposes health and metrics endpoints:

```bash
# Health check
curl http://YOUR-APP-URL/health

# Expected response:
# {"status":"healthy","redis":"connected","timestamp":"..."}

# Metrics
curl http://YOUR-APP-URL/metrics

# Expected response:
# {"total_tasks":10,"completed_tasks":5,"pending_tasks":5,...}
```

### Common Issues

#### Pods Not Starting

```bash
# Check pod status
kubectl get pods

# Describe pod
kubectl describe pod POD-NAME

# Check logs
kubectl logs POD-NAME

# Check events
kubectl get events --sort-by='.lastTimestamp'
```

#### LoadBalancer Pending

```bash
# Check service
kubectl describe svc nodejs-todo-app

# Verify AWS Load Balancer
aws elbv2 describe-load-balancers

# Check security groups
kubectl get svc nodejs-todo-app -o yaml
```

#### Redis Connection Issues

```bash
# Check Redis pod
kubectl get pod -l app=redis

# Test Redis
kubectl exec -it REDIS-POD -- redis-cli ping

# Check Redis logs
kubectl logs -l app=redis

# Verify service
kubectl get svc redis-service
```

#### Image Pull Errors

```bash
# Check if image exists in DockerHub
docker pull YOUR-USERNAME/nodejs-todo-app:latest

# Verify image name in deployment
kubectl get deployment nodejs-todo-app -o yaml | grep image

# Check pod events
kubectl describe pod POD-NAME | grep -A 5 Events
```

### Debugging Commands

```bash
# Get shell in running pod
kubectl exec -it POD-NAME -- /bin/sh

# Check environment variables
kubectl exec POD-NAME -- env

# Test Redis connection from app pod
kubectl exec POD-NAME -- nc -zv redis-service 6379

# View full logs
kubectl logs POD-NAME --all-containers --previous

# Port forward for local testing
kubectl port-forward POD-NAME 3000:3000
```

### Performance Monitoring

```bash
# Node metrics
kubectl top nodes

# Pod metrics
kubectl top pods

# Detailed pod metrics
kubectl top pods --containers

# HPA metrics
kubectl get hpa nodejs-todo-app-hpa -w
```

---
