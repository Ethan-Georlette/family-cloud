#  Family Cloud – TODO

##  PHASE 1 — Core Auth + Upload (CURRENT)

###  Auth (Keycloak Integration)

* [x] Keycloak login works
* [x] Backend validates JWT
* [x] Axios sends token automatically

#### Polish

* [ ] Add logout button

  * [ ] Call `keycloak.logout()`
* [ ] Protect frontend routes

  * [ ] Redirect to login if not authenticated
* [ ] Show user info in UI

  * [ ] Username
  * [ ] Roles (ADMIN / USER)

---

###  File Upload (MinIO)

* [x] Upload endpoint works
* [x] File stored in MinIO

#### Improve upload

* [ ] Prevent file overwrite

  * [ ] Generate UUID filename
  * [ ] Append original filename

---

###  Metadata 

#### Database

* [ ] Create `StoredFile` entity

  * [ ] id
  * [ ] originalFileName
  * [ ] storedFileName
  * [ ] contentType
  * [ ] size
  * [ ] uploadedBy
  * [ ] uploadedAt

* [ ] Create repository

  * [ ] `findByUploadedBy(username)`

#### Upload flow

* [ ] Update upload service

  * [ ] Save metadata after MinIO upload
  * [ ] Extract username from JWT

#### API

* [ ] Create endpoint `GET /api/files/my-files`

  * [ ] Return only current user files

---

##  PHASE 2 — File Management

### Backend

* [ ] Delete file

  * [ ] Remove from MinIO
  * [ ] Remove from DB

* [ ] Download file

  * [ ] Generate presigned URL

### Frontend

* [ ] File list UI

  * [ ] Show filename
  * [ ] Show upload date

* [ ] File actions

  * [ ] Download button
  * [ ] Delete button

---

##  PHASE 3 — Folders

### Backend

* [ ] Create `Folder` entity
* [ ] Link files → folders

### API

* [ ] POST `/api/folders`
* [ ] GET `/api/folders`

### Frontend

* [ ] Folder navigation UI
* [ ] Upload into folder

---

##  PHASE 4 — Sharing

* [ ] Share file with another user

  * [ ] Add permission table
* [ ] Public share link (optional)

---

##  PHASE 5 — Infrastructure (devops)

### Backend

* [ ] Dockerize backend
* [ ] Add Traefik route

### Domains

* [ ] api.ethangeorlette.com
* [ ] auth.ethangeorlette.com
* [ ] minio.ethangeorlette.com

---

##  PHASE 6 — DevOps

* [ ] Dockerize frontend
* [ ] Create full docker-compose
* [ ] CI/CD (GitHub Actions)

---

##  PHASE 7 — Monitoring

* [ ] Prometheus
* [ ] Grafana
* [ ] Loki logs

---

##  PHASE 8 — Advanced Features

* [ ] Thumbnail generation
* [ ] Video metadata
* [ ] File deduplication
* [ ] Albums
* [ ] Mobile UI

