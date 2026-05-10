# family-cloud
run ./mvnw spring-boot:run
docker exec -it postgres psql -U postgres -d family_cloud
HTTPS=true npm start

// setting the .env
set -a
source .env
set +a
./mvnw spring-boot:run

//whatttttt 
export KEYCLOAK_ADMIN_CLIENT_SECRET='your-secret-here'
./mvnw spring-boot:run

changes :


