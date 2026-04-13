package com.familycloud.backend.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/public")
    public String publicEndpoint() {
        return "public ok";
    }

    @GetMapping("/api/test/user")
    public Map<String, Object> userEndpoint(Principal principal, @AuthenticationPrincipal Jwt jwt) {
        return Map.of(
                "message", "user ok",
                "username", principal.getName(),
                "subject", jwt.getSubject()
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/api/test/admin")
    public String adminEndpoint() {
        return "admin ok";
    }
}
