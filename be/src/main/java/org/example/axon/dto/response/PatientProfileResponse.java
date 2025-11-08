package org.example.axon.dto.response;

import java.time.LocalDate;

public record PatientProfileResponse(
        String id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        LocalDate dateOfBirth,
        String role,
        String citizenId,
        String emergencyName,
        String emergencyPhone,
        String gender,
        AddressSummary address
) {

    public record AddressSummary(
            String addressLine,
            String city,
            String provinceState,
            String country
    ) {
    }
}
