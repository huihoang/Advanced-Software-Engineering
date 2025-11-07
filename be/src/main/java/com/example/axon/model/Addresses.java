package com.example.axon.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Addresses")
public class Addresses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // tương ứng AUTO_INCREMENT
    @Column(name = "AddressId", nullable = false, updatable = false)
    private Integer addressId;

    @Column(name = "AddressLine", length = 255)
    private String addressLine;

    @Column(name = "City", length = 100)
    private String city;

    @Column(name = "ProvinceState", length = 100)
    private String provinceState;

    @Column(name = "Country", length = 100)
    private String country;

    // ===== Getters & Setters =====
    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvinceState() {
        return provinceState;
    }

    public void setProvinceState(String provinceState) {
        this.provinceState = provinceState;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}