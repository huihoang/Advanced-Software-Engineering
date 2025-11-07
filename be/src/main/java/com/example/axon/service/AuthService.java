package com.example.axon.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.axon.configuration.SecurityConfig;
import com.example.axon.dto.request.AuthRequest;
import com.example.axon.exception.AppException;
import com.example.axon.exception.ErrorCode;
import com.example.axon.repository.UserRepository;

import lombok.Data;

@Service
@Data
public class AuthService {
    private UserRepository userRepository;

    public boolean authenticate(AuthRequest request) {
        var user = userRepository.findByEmail(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        SecurityConfig securityConfig = new SecurityConfig();
        PasswordEncoder passwordEncoder = securityConfig.passwordEncoder();
        return passwordEncoder.matches(request.getPassword(), user.getPassword());
    }
}
