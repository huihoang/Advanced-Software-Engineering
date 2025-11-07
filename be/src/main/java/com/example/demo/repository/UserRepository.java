package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {
    // Custom query methods can be defined here if needed
    boolean existsByEmail(String email);

    Optional<Users> findByEmail(String email);
}