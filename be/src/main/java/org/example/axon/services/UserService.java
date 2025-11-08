package org.example.axon.services;

import java.util.UUID;

import org.example.axon.dto.request.RegisterRequest;
import org.example.axon.model.Doctor;
import org.example.axon.model.Patient;   // ✅ THÊM IMPORT NÀY
import org.example.axon.model.User; // ✅ THÊM IMPORT NÀY
import org.example.axon.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

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
        u.setPassword(encoder.encode(req.password()));
        u.setFirstName(req.firstName());
        u.setLastName(req.lastName());
        u.setPhoneNumber(req.phoneNumber());
        u.setRole(role);

        // Nếu là DOCTOR -> tạo Doctor, link với User
        if ("DOCTOR".equalsIgnoreCase(role)) {
            Doctor doctor = new Doctor();
            doctor.setUsers(u);   // set user cho doctor
            u.setDoctor(doctor); // set doctor cho user (để cascade biết)
        }

        // Nếu là USER (patient thường) -> tạo Patient, link với User
        if ("USER".equalsIgnoreCase(role)) {
            Patient patient = new Patient();
            patient.setUsers(u);
            u.setPatient(patient);
        }

        // Do có cascade nên save user sẽ save luôn doctor/patient (nếu mapping đúng)
        return userRepo.save(u);
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
