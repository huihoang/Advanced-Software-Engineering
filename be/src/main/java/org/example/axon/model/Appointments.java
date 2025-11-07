package org.example.axon.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "Appointments")
public class Appointments {

    public Appointments() {
    } // no-args constructor cho JPA

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AppointmentID", nullable = false, updatable = false)
    private Integer appointmentId;

    @ManyToOne(optional = true)
    @JoinColumn(name = "PatientId", referencedColumnName = "UserId")
    private Patients patient;

    @ManyToOne(optional = true)
    @JoinColumn(name = "DoctorId", referencedColumnName = "UserId")
    private Doctors doctor;

    @Column(name = "ScheduleDate")
    private LocalDate scheduleDate;

    @Column(name = "ScheduleTime")
    private LocalTime scheduleTime;

    @Column(name = "EndTime")
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status", columnDefinition = "ENUM('pending','confirmed','cancelled','completed') DEFAULT 'pending'")
    private AppointmentStatus status;

    @Column(name = "Note", columnDefinition = "TEXT")
    private String note;

    @Column(name = "Created_at", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @ManyToOne(optional = true)
    @JoinColumn(name = "HospitalDepartmentId", referencedColumnName = "HospitalDepartmentId")
    private HospitalDepartments hospitalDepartment;

    // ===== Getters & Setters =====
    public Integer getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Integer appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Patients getPatient() {
        return patient;
    }

    public void setPatient(Patients patient) {
        this.patient = patient;
    }

    public Doctors getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctors doctor) {
        this.doctor = doctor;
    }

    public LocalDate getScheduleDate() {
        return scheduleDate;
    }

    public void setScheduleDate(LocalDate scheduleDate) {
        this.scheduleDate = scheduleDate;
    }

    public LocalTime getScheduleTime() {
        return scheduleTime;
    }

    public void setScheduleTime(LocalTime scheduleTime) {
        this.scheduleTime = scheduleTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public HospitalDepartments getHospitalDepartment() {
        return hospitalDepartment;
    }

    public void setHospitalDepartment(HospitalDepartments hospitalDepartment) {
        this.hospitalDepartment = hospitalDepartment;
    }

    public enum AppointmentStatus {
        pending, confirmed, cancelled, completed
    }
}
