package com.example.demo.model;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Doctors")
public class Doctors {

    @Id
    @Column(name = "UserId", length = 36, nullable = false, updatable = false)
    private String userId;

    @Column(name = "CitizenId", length = 50, unique = true)
    private String citizenId;

    @Column(name = "LicenseNumber", length = 50)
    private String licenseNumber;

    @Column(name = "ConsultationFee", precision = 10, scale = 2)
    private BigDecimal consultationFee;

    @Column(name = "Specialization", length = 100)
    private String specialization;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getCitizenId() { return citizenId; }
    public void setCitizenId(String citizenId) { this.citizenId = citizenId; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public BigDecimal getConsultationFee() { return consultationFee; }
    public void setConsultationFee(BigDecimal consultationFee) { this.consultationFee = consultationFee; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
}
