package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "DoctorAvailabilities")
public class DoctorAvailabilities {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // tương ứng AUTO_INCREMENT
    @Column(name = "AvailabilityID", nullable = false, updatable = false)
    private Integer availabilityId;

    @ManyToOne(optional = true)
    @JoinColumn(name = "DoctorId", referencedColumnName = "UserId")
    private Doctors doctor;

    @Column(name = "AvailableDate")
    private LocalDate availableDate;

    @Column(name = "StartTime")
    private LocalTime startTime;

    @Column(name = "EndTime")
    private LocalTime endTime;

    // FK tới HospitalDepartments(HospitalDepartmentId) với ON DELETE CASCADE do DB xử lý
    @ManyToOne(optional = true)
    @JoinColumn(name = "HospitalDepartmentId", referencedColumnName = "HospitalDepartmentId")
    private HospitalDepartments hospitalDepartment;

    // ===== Getters & Setters =====
    public Integer getAvailabilityId() { return availabilityId; }
    public void setAvailabilityId(Integer availabilityId) { this.availabilityId = availabilityId; }

    public Doctors getDoctor() { return doctor; }
    public void setDoctor(Doctors doctor) { this.doctor = doctor; }

    public LocalDate getAvailableDate() { return availableDate; }
    public void setAvailableDate(LocalDate availableDate) { this.availableDate = availableDate; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public HospitalDepartments getHospitalDepartment() { return hospitalDepartment; }
    public void setHospitalDepartment(HospitalDepartments hospitalDepartment) {
        this.hospitalDepartment = hospitalDepartment;
    }
}
