package org.example.axon.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record DoctorProfileResponse(
        String id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String citizenId,
        LocalDate dateOfBirth,
        String role,
        String bio,
        String licenseNumber,
        BigDecimal consultationFee,
        DepartmentSummary department,
        ClinicInfo clinicInfo,
        List<ShiftSummary> shifts
) {

    public record DepartmentSummary(Integer id, String name) {
    }

    public record ShiftSummary(Integer id, LocalDate date, String time) {
    }

    public record ClinicInfo(Integer id, String name, String address) {
    }
}
