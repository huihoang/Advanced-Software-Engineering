package org.example.axon.services;

import org.example.axon.dto.response.DepartmentSummaryResponse;
import org.example.axon.repository.MedicalDepartmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    private final MedicalDepartmentRepository medicalDepartmentRepository;

    public DepartmentService(MedicalDepartmentRepository medicalDepartmentRepository) {
        this.medicalDepartmentRepository = medicalDepartmentRepository;
    }

    @Transactional(readOnly = true)
    public List<DepartmentSummaryResponse> getAllDepartments() {
        return medicalDepartmentRepository.findAll()
                .stream()
                .map(department -> new DepartmentSummaryResponse(department.getId(), department.getName()))
                .collect(Collectors.toList());
    }
}
