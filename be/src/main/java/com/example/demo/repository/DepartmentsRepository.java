package com.example.demo.repository;

import com.example.demo.dto.response.DepartmentSearchResponse;
import com.example.demo.model.MedicalDepartments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentsRepository extends JpaRepository<MedicalDepartments, Integer> {

    @Query("SELECT new com.example.demo.dto.response.DepartmentSearchResponse(" +
            "d.departmentId, d.name, d.description, d.headOfDepartment, d.phone, d.email) " +
            "FROM MedicalDepartments d WHERE " +
            "LOWER(d.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.headOfDepartment) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<DepartmentSearchResponse> searchByKeyword(@Param("keyword") String keyword);
}