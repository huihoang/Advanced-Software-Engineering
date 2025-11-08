package org.example.axon.controller;

import java.util.List;

import org.example.axon.dto.response.DepartmentSummaryResponse;
import org.example.axon.services.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<List<DepartmentSummaryResponse>> getAllDepartments() {
        List<DepartmentSummaryResponse> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }
}
