package org.example.axon.services;

import lombok.RequiredArgsConstructor;
import org.example.axon.dto.request.RegisterRequest;
import org.example.axon.model.User;
import org.example.axon.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    @Transactional
    public User register(RegisterRequest req, String role) {
        if (userRepo.existsByEmail(req.email()))
            throw new IllegalArgumentException("Email already used");

        User u = new User();
        u.setUserId(UUID.randomUUID().toString());
        u.setEmail(req.email());
        u.setPassword(encoder.encode(req.password())); // hash vào field 'password'
        u.setFirstName(req.firstName());
        u.setLastName(req.lastName());
        u.setPhoneNumber(req.phoneNumber());
        u.setRole(role); // "USER" hoặc "DOCTOR"
        return userRepo.save(u);
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
