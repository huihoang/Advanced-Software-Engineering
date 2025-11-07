package com.example.axon.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Conditions")
public class Conditions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ConditionID", nullable = false, updatable = false)
    private Integer conditionId;

    @Column(name = "ConditionName", length = 150)
    private String conditionName;

    @Column(name = "Description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "Type", columnDefinition = "ENUM('symptom','injury','disease')")
    private ConditionType type;

    public Integer getConditionId() {
        return conditionId;
    }

    public void setConditionId(Integer conditionId) {
        this.conditionId = conditionId;
    }

    public String getConditionName() {
        return conditionName;
    }

    public void setConditionName(String conditionName) {
        this.conditionName = conditionName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ConditionType getType() {
        return type;
    }

    public void setType(ConditionType type) {
        this.type = type;
    }

    public enum ConditionType {
        symptom, injury, disease
    }
}
