package org.example.axon.repository;

import java.util.Optional;

import org.example.axon.model.Patient;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, String> {

    @EntityGraph(attributePaths = {
            "users",
            "address"
    })
    Optional<Patient> findWithDetailsByUserId(String userId);
}
