package org.example.axon.repository;

import org.example.axon.dto.response.DepartmentSearchResponse;
import org.example.axon.model.MedicalDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<MedicalDepartment, Integer> {

    @Query("SELECT new org.example.axon.dto.response.DepartmentSearchResponse(" +
            "d.id, d.name, d.description, d.headOfDepartment, d.phone, d.email) " +
            "FROM MedicalDepartment d WHERE " +
            "LOWER(d.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(CAST(d.description AS string)) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.headOfDepartment) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<DepartmentSearchResponse> searchByKeyword(@Param("keyword") String keyword);
}