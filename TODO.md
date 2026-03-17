Family Cloud – Project TODO
Repository Structure

 Create project root directory family-cloud

 Create directories:

 docker

 docker/compose

 docker/scripts

 backend

 frontend

 infrastructure

 docs

Infrastructure
Host Setup

 Install Docker

 Install Docker Compose

 Install Git

 Configure UFW firewall

 Allow ports:

 22

 80

 443

VPN Access

 Install Tailscale on host

 Authenticate node

 Verify connection with tailscale status

Reverse Proxy
Traefik

 Deploy Traefik container

 Configure HTTPS

 Configure routing for:

 frontend

 backend

 authentication

 MinIO

Storage
Object Storage

 Deploy MinIO container

 Configure persistent volume /data/minio

 Configure environment variables:

 MINIO_ROOT_USER

 MINIO_ROOT_PASSWORD

 Create buckets:

 family-photos

 family-videos

 family-files

 Enable bucket versioning

Database
Metadata Database

 Deploy PostgreSQL container

 Configure persistent volume /data/postgres

 Create database family_cloud

 Create tables:

 users

 files

 folders

 permissions

Authentication
Identity Provider

 Deploy Keycloak container

 Create realm family-cloud

 Create roles:

 admin

 family_user

 Configure login flow
\n\n
 Configure JWT authentication

Backend
Backend Services

 Initialize backend project

 Implement service structure:

 auth-service

 file-service

 metadata-service

File Service

 Implement POST /upload

 Implement GET /file/{id}

 Implement DELETE /file/{id}

 Store files in MinIO

 Store metadata in PostgreSQL

 Validate authentication tokens

Metadata Service

 Implement GET /files

 Implement POST /folder

 Implement GET /folders

Performance Modules

 Create C module for thumbnail generation

 Create C module for video metadata extraction

 Create C module for file hashing

Frontend
React Application

 Initialize React project

 Implement login page

 Integrate authentication

 Implement file explorer UI

 Implement file upload

 Implement image preview

 Implement video streaming

 Implement file delete

 Implement file download

Networking
Routing

 Configure Traefik routes:

 cloud.local

 api.cloud.local

 auth.cloud.local

 minio.cloud.local

Observability
Monitoring

 Deploy Prometheus

 Deploy Grafana

 Configure dashboards for:

 CPU

 RAM

 disk

 container metrics

 MinIO usage

 API latency

Logging

 Deploy Loki

 Deploy Promtail

 Collect logs from all containers

CI/CD
Pipeline

 Create pipeline with GitHub Actions

 Configure steps:

 run tests

 build docker images

 push images to registry

 deploy to Raspberry Pi

Repository Management

 Create main branch

 Create dev branch

 Enable branch protection

Maintenance Scripts
Control Scripts

 Create directory docker/scripts

 Create script start-cloud.sh

 Create script stop-cloud.sh

 Create script maintenance-mode.sh

 Ensure volumes persist after shutdown

 Ensure containers restart without data loss

Backup
Data Protection

 Deploy backup tool Restic

 Configure MinIO backup

 Configure PostgreSQL backup

 Configure configuration backup

 Schedule daily backups

Security

 Enforce HTTPS

 Store secrets in .env

 Enable rate limiting

 Install fail2ban

 Enable audit logging

Future Features

 Public file sharing links

 Photo albums

 Thumbnail generation

 Mobile-friendly UI

 File deduplication

 Multi-device sync
