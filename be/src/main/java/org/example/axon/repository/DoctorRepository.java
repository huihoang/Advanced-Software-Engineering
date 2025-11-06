package org.example.axon.repository;

import org.example.axon.model.Doctor;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, String> {
    @EntityGraph(attributePaths = {
            "users",
            "hospitalDepartment",
            "hospitalDepartment.department",
            "hospitalDepartment.hospital",
            "doctorAvailabilities",
            "doctorAvailabilities.hospitalDepartment",
            "doctorAvailabilities.hospitalDepartment.hospital"
    })
    Optional<Doctor> findWithDetailsByUserId(String userId);
}
