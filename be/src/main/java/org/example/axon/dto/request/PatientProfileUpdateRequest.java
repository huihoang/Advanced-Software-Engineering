package org.example.axon.dto.request;

import java.time.LocalDate;

public record PatientProfileUpdateRequest(
        String firstName,
        String lastName,
        String phoneNumber,
        LocalDate dateOfBirth,
        String citizenId,
        String emergencyName,
        String emergencyPhone,
        String gender,
        AddressRequest address
) {

    public record AddressRequest(
            String addressLine,
            String city,
            String provinceState,
            String country
    ) {
    }
}
