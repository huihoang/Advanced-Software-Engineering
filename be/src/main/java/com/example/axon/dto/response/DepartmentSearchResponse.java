package com.example.axon.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentSearchResponse {
    private Integer departmentId;
    private String name;
    private String description;
    private String headOfDepartment;
    private String phone;
    private String email;
}