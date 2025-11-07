package org.example.axon.dto.request;

import java.math.BigDecimal;

public record DoctorProfileUpdateRequest(
        String firstName,
        String lastName,
        String phoneNumber,
        String bio,
        String licenseNumber,
        String citizen,
        BigDecimal consultationFee,
        DepartmentSummary department,
        ClinicInfo clinicInfo
) {

    public record DepartmentSummary(Integer id, String name) {
    }

    public record ClinicInfo(Integer id, String name, String address) {
    }
}
