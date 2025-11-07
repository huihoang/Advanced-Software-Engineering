package org.example.axon.model;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Patients")
public class Patient {
    @Id
    @Column(name = "UserId", nullable = false, length = 36)
    private String userId;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "UserId", nullable = false)
    private User users;

    @Column(name = "CitizenId", length = 50)
    private String citizenId;

    @Column(name = "Age", nullable = true)
    private Integer age;
      @Column(name = "DateOfBirth")
    private LocalDate dateOfBirth;

    @Lob
    @Column(name = "Gender")
    private String gender;

    @Column(name = "EmergencyName", length = 100)
    private String emergencyName;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "AddressId")
    private Address address;

    @Column(name = "EmergencyPhone", length = 20)
    private String emergencyPhone;

    @OneToMany(mappedBy = "patient")
    private Set<Appointment> appointments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "patient")
    private Set<PatientCondition> patientConditions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "patient")
    private Set<PatientInsurance> patientInsurances = new LinkedHashSet<>();

    @OneToMany(mappedBy = "patient")
    private Set<Review> reviews = new LinkedHashSet<>();

}