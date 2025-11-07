package com.example.axon.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "PatientInsurances")
public class PatientInsurances {

    @Id
    @Column(name = "InsuranceId", length = 50, nullable = false, updatable = false)
    private String insuranceId;

    @ManyToOne(optional = true)
    @JoinColumn(name = "PatientId", referencedColumnName = "UserId")
    private Patients patient;

    @Column(name = "ProviderName", length = 100)
    private String providerName;

    @Column(name = "ExpiryDate")
    private LocalDate expiryDate;

    @Column(name = "Type", length = 100)
    private String type;

    public String getInsuranceId() {
        return insuranceId;
    }

    public void setInsuranceId(String insuranceId) {
        this.insuranceId = insuranceId;
    }

    public Patients getPatient() {
        return patient;
    }

    public void setPatient(Patients patient) {
        this.patient = patient;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
