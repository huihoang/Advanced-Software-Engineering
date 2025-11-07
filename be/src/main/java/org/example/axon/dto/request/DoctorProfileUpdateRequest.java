package org.example.axon.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DoctorProfileUpdateRequest(
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        LocalDate dateOfBirth,
        String bio,
        String licenseNumber,
        BigDecimal consultationFee,
        Integer departmentId,
        Integer clinicId
) {
}
