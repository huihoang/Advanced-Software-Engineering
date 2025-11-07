package org.example.axon.repository;

import java.util.Optional;

import org.example.axon.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {
    // Custom query methods can be defined here if needed
    boolean existsByEmail(String email);

    Optional<Users> findByEmail(String email);
}