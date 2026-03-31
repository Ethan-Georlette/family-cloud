package com.familycloud.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.familycloud.backend.dto.AuthResponse;
import com.familycloud.backend.dto.LoginDTO;
import com.familycloud.backend.dto.UserDTO;
import com.familycloud.backend.dto.UserResponseDTO;
import com.familycloud.backend.model.RefreshToken;
import com.familycloud.backend.model.User;
import com.familycloud.backend.service.JwtService;
import com.familycloud.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    
    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping
    public UserResponseDTO createUser(@RequestBody UserDTO userDTO) {
        User user = userService.createUser(userDTO.email, userDTO.password,userDTO.fullname);
        UserResponseDTO response = new UserResponseDTO();
        response.id = user.getId();
        response.email = user.getEmail();
        response.fullname = user.getFullname();

        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDTO loginDTO) {
        User user = userService.login(loginDTO.email, loginDTO.password);
        String token = jwtService.generateToken(user);
        RefreshToken refreshToken = jwtService.createRefreshToken(user);

        AuthResponse response = new AuthResponse(
                token,
                refreshToken.getToken(),
                user.getEmail(),
                user.getFullname(),
                user.getId(),
                3600 // seconds
        );

        return ResponseEntity.ok(response);

    }
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody Map<String, String> request) {

        String requestRefreshToken = request.get("refreshToken");

        RefreshToken refreshToken = jwtService.verifyRefreshToken(requestRefreshToken);

        User user = userService.getUserByEmail(refreshToken.getEmail());

        String newAccessToken = jwtService.generateToken(user);

        AuthResponse response = new AuthResponse(
                newAccessToken,
                requestRefreshToken,
                user.getEmail(),
                user.getFullname(),
                user.getId(),
                900,
                user.getRole()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public List<UserResponseDTO> getUsers() {
        return userService.getAllUsers().stream().map(user -> {
            UserResponseDTO dto = new UserResponseDTO();
            dto.id = user.getId();
            dto.email = user.getEmail();
            dto.fullname = user.getFullname();
            return dto;
        }).toList();
    }
}
