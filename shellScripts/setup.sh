#!/bin/bash

#echo "Updating system..."
#sudo apt update && sudo apt upgrade -y

echo "\033[0;31m###############################################################################Installing dependencies...\033[0m"
# sudo apt install -y curl git ufw

echo "\033[0m###############################################################################Installing Docker...\033[0m"
#curl -fsSL https://get.docker.com | sudo sh
#sudo usermod -aG docker $USER

echo "\033[0;31mInstalling Docker Compose plugin...\033[0m"
#sudo apt install -y docker-compose-plugin

#echo "Configuring UFW..."
#sudo ufw allow ssh
#sudo ufw allow 80
#sudo ufw allow 443
#sudo ufw enable

#echo "Setting permissions..."
#chmod 600 docker/traefik/acme.json

echo "\033[0;31m##################################################################################Starting Traefik...\033[0m"

cd docker/traefik
docker compose up -d

echo -e "\033[0;31m##################################################################################Starting MinIO...\033[0m"
cd ../minio
docker compose up -d

echo -e "\033[0;31m####################################################################################Setup complete!\033[0m"

