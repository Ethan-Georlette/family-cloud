package com.familycloud.backend.service;

import com.familycloud.backend.dto.SignupRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class KeycloakAdminService {

    @Value("${keycloak.server-url}")
    private String serverUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.admin-client-id}")
    private String clientId;

    @Value("${keycloak.admin-client-secret}")
    private String clientSecret;

    private final RestTemplate restTemplate = new RestTemplate();

    public void createUser(SignupRequest request) {
        String adminToken = getAdminAccessToken();

        String userId = createKeycloakUser(request, adminToken);
        setPassword(userId, request.getPassword(), adminToken);
        assignUserRole(userId, adminToken);
    }

    private String getAdminAccessToken() {
        String tokenUrl = serverUrl + "/realms/" + realm + "/protocol/openid-connect/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String body
                = "grant_type=client_credentials"
                + "&client_id=" + clientId
                + "&client_secret=" + clientSecret;

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, entity, Map.class);
        return (String) response.getBody().get("access_token");
    }

    private String createKeycloakUser(SignupRequest request, String token) {
        String url = serverUrl + "/admin/realms/" + realm + "/users";

        Map<String, Object> user = new HashMap<>();
        user.put("username", request.getUsername());
        user.put("email", request.getEmail());
        user.put("firstName", request.getFirstName());
        user.put("lastName", request.getLastName());
        user.put("enabled", true);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(user, headers);

        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.POST, entity, Void.class);

        String location = response.getHeaders().getFirst("Location");
        if (location == null || !location.contains("/")) {
            throw new RuntimeException("Could not get created user id");
        }

        return location.substring(location.lastIndexOf('/') + 1);
    }

    private void setPassword(String userId, String password, String token) {
        String url = serverUrl + "/admin/realms/" + realm + "/users/" + userId + "/reset-password";

        Map<String, Object> cred = new HashMap<>();
        cred.put("type", "password");
        cred.put("value", password);
        cred.put("temporary", false);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(cred, headers);
        restTemplate.exchange(url, HttpMethod.PUT, entity, Void.class);
    }

    private void assignUserRole(String userId, String token) {
        String roleUrl = serverUrl + "/admin/realms/" + realm + "/roles/USER";
        String mappingUrl = serverUrl + "/admin/realms/" + realm + "/users/" + userId + "/role-mappings/realm";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        ResponseEntity<Map> roleResponse = restTemplate.exchange(
                roleUrl,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Map.class
        );

        List<Map<String, Object>> roles = List.of(roleResponse.getBody());

        HttpHeaders postHeaders = new HttpHeaders();
        postHeaders.setBearerAuth(token);
        postHeaders.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<List<Map<String, Object>>> entity = new HttpEntity<>(roles, postHeaders);
        restTemplate.exchange(mappingUrl, HttpMethod.POST, entity, Void.class);
    }
}
