package com.familycloud.backend.controller;

import com.familycloud.backend.dto.UserDTO;
import com.familycloud.backend.model.User;
import com.familycloud.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody UserDTO userDTO) {
        return userService.createUser(userDTO.email, userDTO.password);
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
}
