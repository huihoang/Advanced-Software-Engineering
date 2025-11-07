package com.example.axon.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TreatedById implements Serializable {
    private Integer conditionID;
    private Integer departmentID;

    public TreatedById() {
    }

    public TreatedById(Integer conditionID, Integer departmentID) {
        this.conditionID = conditionID;
        this.departmentID = departmentID;
    }

    public Integer getConditionID() {
        return conditionID;
    }

    public void setConditionID(Integer conditionID) {
        this.conditionID = conditionID;
    }

    public Integer getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(Integer departmentID) {
        this.departmentID = departmentID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        TreatedById that = (TreatedById) o;
        return Objects.equals(conditionID, that.conditionID) && Objects.equals(departmentID, that.departmentID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(conditionID, departmentID);
    }
}
