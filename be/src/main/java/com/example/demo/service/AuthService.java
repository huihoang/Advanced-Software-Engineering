package com.example.demo.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.configuration.SecurityConfig;
import com.example.demo.dto.request.AuthRequest;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.repository.UserRepository;

import lombok.Data;

@Service
@Data
public class AuthService {
    private UserRepository userRepository;

    public boolean authenticate(AuthRequest request) {
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        SecurityConfig securityConfig = new SecurityConfig();
        PasswordEncoder passwordEncoder = securityConfig.passwordEncoder();
        return passwordEncoder.matches(request.getPassword(), user.getPassword());
    }
}
