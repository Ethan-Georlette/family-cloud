package com.familycloud.backend.service;

import com.familycloud.backend.model.User;
import com.familycloud.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean matches = passwordEncoder.matches(password, user.getPasswordHash());

        if (!matches) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    public User createUser(String email, String password) {
        User user = new User();
        user.setEmail(email);
        String hashedPassword = passwordEncoder.encode(password);
        user.setPasswordHash(hashedPassword);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
