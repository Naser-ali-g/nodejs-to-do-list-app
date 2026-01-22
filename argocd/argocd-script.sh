#!/bin/bash
# Script to display ArgoCD access information

echo "🔐 ArgoCD Access Information"
echo "============================"
echo ""

# Get ArgoCD URL
ARGOCD_URL=$(minikube service argocd-server -n argocd --url 2>/dev/null)
echo "🌐 ArgoCD URL: https://$ARGOCD_URL"
echo ""

# Get admin password
ARGOCD_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" 2>/dev/null | base64 -d)
echo "👤 Username: admin"
echo "🔑 Password: $ARGOCD_PASSWORD"
echo ""

echo "📝 To access ArgoCD:"
echo "1. Open: https://$ARGOCD_URL"
echo "2. Accept the security warning"
echo "3. Login with credentials above"
echo ""

echo "🚀 Or use CLI:"
echo "argocd login $ARGOCD_URL --username admin --password '$ARGOCD_PASSWORD' --insecure"
echo ""

# Open in browser
read -p "Open ArgoCD in browser? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    minikube service argocd-server -n argocd
fi
