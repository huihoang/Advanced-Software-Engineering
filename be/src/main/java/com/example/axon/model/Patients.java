package com.example.axon.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Patients")
public class Patients {

    @Id
    @Column(name = "UserId", length = 36, nullable = false, updatable = false)
    private String userId;

    @Column(name = "CitizenId", length = 50, unique = true)
    private String citizenId;

    @Column(name = "Age", nullable = false)
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "Gender", columnDefinition = "ENUM('male','female','other')")
    private Gender gender;

    @Column(name = "EmergencyName", length = 100)
    private String emergencyName;

    @ManyToOne(optional = true)
    @JoinColumn(name = "AddressId", referencedColumnName = "AddressID")
    private Addresses address;

    @Column(name = "EmergencyPhone", length = 20)
    private String emergencyPhone;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCitizenId() {
        return citizenId;
    }

    public void setCitizenId(String citizenId) {
        this.citizenId = citizenId;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getEmergencyName() {
        return emergencyName;
    }

    public void setEmergencyName(String emergencyName) {
        this.emergencyName = emergencyName;
    }

    public Addresses getAddress() {
        return address;
    }

    public void setAddress(Addresses address) {
        this.address = address;
    }

    public String getEmergencyPhone() {
        return emergencyPhone;
    }

    public void setEmergencyPhone(String emergencyPhone) {
        this.emergencyPhone = emergencyPhone;
    }

    public enum Gender {
        male, female, other
    }
}
