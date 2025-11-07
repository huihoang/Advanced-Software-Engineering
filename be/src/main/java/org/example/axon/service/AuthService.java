package org.example.axon.service;

import org.example.axon.configuration.SecurityConfig;
import org.example.axon.dto.request.AuthRequest;
import org.example.axon.exception.AppException;
import org.example.axon.exception.ErrorCode;
import org.example.axon.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
