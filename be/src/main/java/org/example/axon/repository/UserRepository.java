package org.example.axon.repository;

import java.util.List;
import java.util.Optional;

import org.example.axon.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> { // ✅ String, không phải Long
    Optional<User> findByUserId(String userId);
    List<User> findAllByRole(String role);
    List<User> findAllByRoleAndEmail(String role, String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);
    Optional<User> findByUserIdAndEmail(String userId, String email);
    Optional<User> findByUserIdAndPhoneNumber(String userId, String phoneNumber);
    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByUserIdAndEmail(String userId, String email);
    boolean existsByUserIdAndPhoneNumber(String userId, String phoneNumber);
}
