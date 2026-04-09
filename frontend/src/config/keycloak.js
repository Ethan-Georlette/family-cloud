import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "https://auth.ethangeorlette.com",   // your Keycloak URL
    realm: "family-cloud",          // your Keycloak realm
    clientId: "account"
});

export default keycloak;