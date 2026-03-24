package com.familycloud.backend.service;

import com.familycloud.backend.model.User;
import com.familycloud.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(String email, String password) {
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(password); // later we hash it

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
