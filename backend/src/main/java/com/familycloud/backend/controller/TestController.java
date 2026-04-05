package com.familycloud.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/public")
    public String publicEndpoint() {
        return "public OK";
    }

    @GetMapping("/private")
    public String privateEndpoint() {
        return "authenticated OK";
    }

    @PreAuthorize("hasRole('approved_user')")
    @GetMapping("/storage")
    public String storage() {
        return "approved user only";
    }
}
