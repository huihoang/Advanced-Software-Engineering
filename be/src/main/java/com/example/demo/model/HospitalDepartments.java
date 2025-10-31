package com.example.demo.model;
import jakarta.persistence.*;

@Entity
@Table(
    name = "HospitalDepartments",
    uniqueConstraints = {
        @UniqueConstraint(name = "unique_hospital_department", columnNames = {"HospitalId", "DepartmentId"})
    }
)
public class HospitalDepartments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HospitalDepartmentId", nullable = false, updatable = false)
    private Integer hospitalDepartmentId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "HospitalId", referencedColumnName = "HospitalID", nullable = false)
    private Hospitals hospital;

    @ManyToOne(optional = false)
    @JoinColumn(name = "DepartmentId", referencedColumnName = "DepartmentID", nullable = false)
    private MedicalDepartments department;

    @Column(name = "Address", length = 255)
    private String address;

    public Integer getHospitalDepartmentId() { return hospitalDepartmentId; }
    public void setHospitalDepartmentId(Integer hospitalDepartmentId) { this.hospitalDepartmentId = hospitalDepartmentId; }

    public Hospitals getHospital() { return hospital; }
    public void setHospital(Hospitals hospital) { this.hospital = hospital; }

    public MedicalDepartments getDepartment() { return department; }
    public void setDepartment(MedicalDepartments department) { this.department = department; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
