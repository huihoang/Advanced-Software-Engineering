package com.example.axon.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reviews")
public class Reviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // tương ứng AUTO_INCREMENT
    @Column(name = "ReviewID", nullable = false, updatable = false)
    private Integer reviewId;

    // Lưu đúng INT và để DB enforce CHECK (1..5)
    @Column(name = "Rating", columnDefinition = "INT CHECK (Rating BETWEEN 1 AND 5)")
    private Integer rating;

    // Giữ nguyên kiểu TEXT
    @Column(name = "Comment", columnDefinition = "TEXT")
    private String comment;

    // FK -> Patients(UserId); schema không NOT NULL
    @ManyToOne(optional = true)
    @JoinColumn(name = "PatientId", referencedColumnName = "UserId")
    private Patients patient;

    // FK -> Doctors(UserId); schema không NOT NULL
    @ManyToOne(optional = true)
    @JoinColumn(name = "DoctorId", referencedColumnName = "UserId")
    private Doctors doctor;

    // DB tự set CURRENT_TIMESTAMP
    @Column(name = "Created_at", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    // ===== Getters & Setters =====
    public Integer getReviewId() {
        return reviewId;
    }

    public void setReviewId(Integer reviewId) {
        this.reviewId = reviewId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}