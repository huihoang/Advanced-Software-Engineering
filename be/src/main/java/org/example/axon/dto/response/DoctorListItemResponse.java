package org.example.axon.dto.response;

import java.math.BigDecimal;


public record DoctorListItemResponse(
        String id,
        String firstName,
        String lastName,
        String role,
        String licenseNumber,
        String citizenId,
        DepartmentSummary department,
        BigDecimal consultationFee
) {

    public record DepartmentSummary(Integer id, String name) {
    }
}
