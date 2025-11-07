package com.example.demo.repository;

import com.example.demo.dto.response.DoctorSearchResponse;
import com.example.demo.model.Doctors;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorsRepository extends JpaRepository<Doctors, String> {

    @Query("SELECT new com.example.demo.dto.response.DoctorSearchResponse(" +
            "d.licenseNumber, d.specialization, d.consultationFee, " +
            "u.firstName, u.lastName) " +
            "FROM Doctors d " +
            "LEFT JOIN Users u ON d.userId = u.userId " +
            "WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.specialization) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(d.licenseNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<DoctorSearchResponse> searchByKeyword(@Param("keyword") String keyword);
}