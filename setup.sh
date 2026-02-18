#!/bin/bash

echo "Updating system..."
sudo apt update && sudo apt upgrade -y

echo "Installing dependencies..."
sudo apt install -y curl git ufw

echo "Installing Docker..."
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER

echo "Installing Docker Compose plugin..."
sudo apt install -y docker-compose-plugin

echo "Configuring UFW..."
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

echo "Setting permissions..."
chmod 600 docker/traefik/acme.json

echo "Starting Traefik..."
cd docker/traefik
docker compose up -d

echo "Starting MinIO..."
cd ../minio
docker compose up -d

echo "Setup complete!"

