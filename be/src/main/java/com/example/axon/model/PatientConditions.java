package com.example.axon.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "PatientConditions", uniqueConstraints = {
        @UniqueConstraint(name = "unique_patient_condition", columnNames = { "PatientId", "ConditionID" })
})
public class PatientConditions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PatientConditionID", nullable = false, updatable = false)
    private Integer patientConditionId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "PatientId", referencedColumnName = "UserId", nullable = false)
    private Patients patient;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ConditionID", referencedColumnName = "ConditionID", nullable = false)
    private Conditions condition;

    @Column(name = "CreatedAt", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    public Integer getPatientConditionId() {
        return patientConditionId;
    }

    public void setPatientConditionId(Integer patientConditionId) {
        this.patientConditionId = patientConditionId;
    }

    public Patients getPatient() {
        return patient;
    }

    public void setPatient(Patients patient) {
        this.patient = patient;
    }

    public Conditions getCondition() {
        return condition;
    }

    public void setCondition(Conditions condition) {
        this.condition = condition;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
