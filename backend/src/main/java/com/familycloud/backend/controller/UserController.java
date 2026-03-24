package com.familycloud.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.familycloud.backend.dto.UserDTO;
import com.familycloud.backend.dto.UserResponseDTO;
import com.familycloud.backend.model.User;
import com.familycloud.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserResponseDTO createUser(@RequestBody UserDTO userDTO) {
        User user = userService.createUser(userDTO.email, userDTO.password);
        UserResponseDTO response = new UserResponseDTO();
        response.id = user.getId();
        response.email = user.getEmail();

        return response;
    }

    @GetMapping
    public List<UserResponseDTO> getUsers() {
        return userService.getAllUsers().stream().map(user -> {
            UserResponseDTO dto = new UserResponseDTO();
            dto.id = user.getId();
            dto.email = user.getEmail();
            return dto;
        }).toList();
    }
}
