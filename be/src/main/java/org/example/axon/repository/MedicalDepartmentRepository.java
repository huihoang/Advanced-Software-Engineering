package org.example.axon.repository;

import org.example.axon.model.MedicalDepartment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalDepartmentRepository extends JpaRepository<MedicalDepartment, Integer> {
}
