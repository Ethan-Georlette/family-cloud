import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8180",   // your Keycloak URL
    realm: "family-cloud",          // your Keycloak realm
    clientId: "account"
});

export default keycloak;