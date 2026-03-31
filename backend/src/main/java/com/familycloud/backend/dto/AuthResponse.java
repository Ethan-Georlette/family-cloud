package com.familycloud.backend.dto;

import java.util.UUID;

public class AuthResponse {

    private final String role;
    private final String token;
    private final String refreshToken;
    private final String email;
    private final String fullName;
    private final UUID userId;
    private final long expiresIn;

    public AuthResponse(String token, String refreshToken, String email, String fullName, UUID userId, long expiresIn, String role ) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.email = email;
        this.fullName = fullName;
        this.userId = userId;
        this.expiresIn = expiresIn;
        this.role = role;

    }

    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getFullName() {
        return fullName;
    }

    public UUID getUserId() {
        return userId;
    }

    public long getExpiresIn() {
        return expiresIn;
    }
}
