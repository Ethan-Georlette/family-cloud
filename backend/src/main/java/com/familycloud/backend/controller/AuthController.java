package com.familycloud.backend.controller;

import com.familycloud.backend.dto.SignupRequest;
import com.familycloud.backend.service.KeycloakAdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final KeycloakAdminService keycloakAdminService;

    public AuthController(KeycloakAdminService keycloakAdminService) {
        this.keycloakAdminService = keycloakAdminService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        keycloakAdminService.createUser(request);
        return ResponseEntity.ok("user created");
    }
}
