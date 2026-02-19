#!/bin/bash


echo -e "\033[0;31#####################stopping docker containers...\033[0m"]
docker stop minio
docker stop traefik
docker ps 
docker ps -l
echo -e "\033[0;32m###############################################done! \033[0m"]
