import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "https://auth.ethangeorlette.com",
    realm: "family-cloud",
    clientId: "family-cloud-frontend"
});

export default keycloak;