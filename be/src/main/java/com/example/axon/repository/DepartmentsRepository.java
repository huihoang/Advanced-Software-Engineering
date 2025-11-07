package com.example.axon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.axon.dto.response.DepartmentSearchResponse;
import com.example.axon.model.MedicalDepartments;

import java.util.List;

@Repository
public interface DepartmentsRepository extends JpaRepository<MedicalDepartments, Integer> {

    @Query("SELECT new com.example.axon.dto.response.DepartmentSearchResponse(" +
            "d.departmentId, d.name, d.description, d.headOfDepartment, d.phone, d.email) " +
            "FROM MedicalDepartments d WHERE " +
            "LOWER(d.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.headOfDepartment) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<DepartmentSearchResponse> searchByKeyword(@Param("keyword") String keyword);
}