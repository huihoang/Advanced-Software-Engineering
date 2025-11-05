package com.example.demo.model;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "Users")
public class Users {

    @Id
    @Column(name = "UserId", length = 36, nullable = false, updatable = false)
    private String userId;

    @Column(name = "FirstName", length = 100)
    private String firstName;

    @Column(name = "LastName", length = 100)
    private String lastName;

    @Column(name = "Email", length = 150, unique = true)
    private String email;

    @Column(name = "Password", length = 255)
    private String password;

    @Column(name = "PhoneNumber", length = 20)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(
        name = "Role",
        nullable = false,
        columnDefinition = "ENUM('admin','doctor','patient')"
    )
    private Role role;

    @PrePersist
    private void ensureId() {
        if (this.userId == null || this.userId.isEmpty()) {
            this.userId = UUID.randomUUID().toString();
        }
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public Role getRole() { return role; }
    public void setRole(String r) {
        if(r == "admin") this.role = Role.admin;
        else if(r == "doctor") this.role = Role.doctor; 
        else this.role = Role.patient; 
        }

    public enum Role { admin, doctor, patient }
}

