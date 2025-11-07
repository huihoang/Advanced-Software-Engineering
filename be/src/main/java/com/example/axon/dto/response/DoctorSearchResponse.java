package com.example.axon.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorSearchResponse {
    private String licenseNumber;
    private String specialization;
    private BigDecimal consultationFee;
    private String firstName;
    private String lastName;

    public DoctorSearchResponse(String userId, String licenseNumber, String specialization,
            BigDecimal consultationFee) {
        this.licenseNumber = licenseNumber;
        this.specialization = specialization;
        this.consultationFee = consultationFee;
    }

    public String getFullName() {
        if (firstName != null && lastName != null) {
            return firstName.trim() + " " + lastName.trim();
        } else if (firstName != null) {
            return firstName;
        } else if (lastName != null) {
            return lastName;
        }
        return "";
    }
}