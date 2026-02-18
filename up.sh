#!/bin/bash


echo -e "\033[0;31#####################starting docker containers...\033[0m"]
docker start minio
docker start traefik
echo -e "\033[0;32m"
docker ps 
docker ps -l
echo -e "\033[0;32m###############################################done! \033[0m"]
