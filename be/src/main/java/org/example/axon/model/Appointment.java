package org.example.axon.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "Appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AppointmentID", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PatientId")
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DoctorId")
    private Doctor doctor;

    @Column(name = "ScheduleDate")
    private LocalDate scheduleDate;

    @Column(name = "ScheduleTime")
    private LocalTime scheduleTime;

    @Column(name = "EndTime")
    private LocalTime endTime;

    @ColumnDefault("'pending'")
    @Lob
    @Column(name = "Status")
    private String status;

    @Lob
    @Column(name = "Note")
    private String note;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "Created_at")
    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HospitalDepartmentId")
    private HospitalDepartment hospitalDepartment;

}