package com.example.demo.model;
import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "Hospitals")
public class Hospitals {

    @Id
    @Column(name = "HospitalID", nullable = false, updatable = false)
    private Integer hospitalId;

    @Column(name = "Name", length = 150)
    private String name;

    @Column(name = "Type", columnDefinition = "ENUM('public','private','specialized','general')")
    private String type;

    @Column(name = "Address", length = 255)
    private String address;

    @Column(name = "Hotline", length = 20)
    private String hotline;

    @Column(name = "Email", length = 100)
    private String email;

    @Column(name = "OpenTime")
    private LocalTime openTime;

    @Column(name = "CloseTime")
    private LocalTime closeTime;

    public Integer getHospitalId() { return hospitalId; }
    public void setHospitalId(Integer hospitalId) { this.hospitalId = hospitalId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getHotline() { return hotline; }
    public void setHotline(String hotline) { this.hotline = hotline; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public LocalTime getOpenTime() { return openTime; }
    public void setOpenTime(LocalTime openTime) { this.openTime = openTime; }

    public LocalTime getCloseTime() { return closeTime; }
    public void setCloseTime(LocalTime closeTime) { this.closeTime = closeTime; }

    
}
