package org.example.axon.repository;

import org.example.axon.model.HospitalDepartment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalDepartmentRepository extends JpaRepository<HospitalDepartment, Integer> {
}
