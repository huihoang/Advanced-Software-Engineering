package com.example.axon.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "TreatedBy")
public class TreatedBy {

    @EmbeddedId
    private TreatedById id = new TreatedById();

    // FK -> Conditions(ConditionID)
    @ManyToOne(optional = false)
    @MapsId("conditionId")
    @JoinColumn(name = "ConditionID", referencedColumnName = "ConditionID", nullable = false)
    private Conditions condition;

    // FK -> MedicalDepartments(DepartmentID)
    @ManyToOne(optional = false)
    @MapsId("departmentId")
    @JoinColumn(name = "DepartmentID", referencedColumnName = "DepartmentID", nullable = false)
    private MedicalDepartments department;

    // ===== Getters & Setters =====
    public TreatedById getId() {
        return id;
    }

    public void setId(TreatedById id) {
        this.id = id;
    }

    public Conditions getCondition() {
        return condition;
    }

    public void setCondition(Conditions condition) {
        this.condition = condition;
        if (condition != null)
            this.id.setConditionId(condition.getConditionId());
    }

    public MedicalDepartments getDepartment() {
        return department;
    }

    public void setDepartment(MedicalDepartments department) {
        this.department = department;
        if (department != null)
            this.id.setDepartmentId(department.getDepartmentId());
    }

    @Embeddable
    public static class TreatedById implements Serializable {
        @Column(name = "ConditionID", nullable = false)
        private Integer conditionId;

        @Column(name = "DepartmentID", nullable = false)
        private Integer departmentId;

        public TreatedById() {
        }

        public TreatedById(Integer conditionId, Integer departmentId) {
            this.conditionId = conditionId;
            this.departmentId = departmentId;
        }

        public Integer getConditionId() {
            return conditionId;
        }

        public void setConditionId(Integer conditionId) {
            this.conditionId = conditionId;
        }

        public Integer getDepartmentId() {
            return departmentId;
        }

        public void setDepartmentId(Integer departmentId) {
            this.departmentId = departmentId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (!(o instanceof TreatedById))
                return false;
            TreatedById that = (TreatedById) o;
            return Objects.equals(conditionId, that.conditionId)
                    && Objects.equals(departmentId, that.departmentId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(conditionId, departmentId);
        }
    }
}