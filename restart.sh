#!/bin/bash


echo -e "\033[0;31#####################starting docker containers...\033[0m"]
docker kill minio  
docker kill traefik
echo -e "\033[0;32m"
docker docker rm minio
docker rm traefik
cd docker/traefik
docker compose up -d
cd ../minio
docker compose up -d
echo -e "\033[0;32m###############################################done! \033[0m"]
