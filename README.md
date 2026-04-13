# family-cloud
run ./mvnw spring-boot:run
docker exec -it postgres psql -U postgres -d family_cloud
HTTPS=true npm start
