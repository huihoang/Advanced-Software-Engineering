package org.example.axon.repository;

import java.util.List;

import org.example.axon.dto.request.ChatDepRequest;
import org.example.axon.model.MedicalDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface DepartmentRepository extends JpaRepository<MedicalDepartment, Integer>{
    List<ChatDepRequest> findAllBy();
}   
