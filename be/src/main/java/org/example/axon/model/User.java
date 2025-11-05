package org.example.axon.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Users")
public class User {
    @Id
    @Column(name = "UserId", nullable = false, length = 36)
    private String userId;

    @Column(name = "FirstName", length = 100)
    private String firstName;

    @Column(name = "LastName", length = 100)
    private String lastName;

    @Column(name = "Email", length = 150)
    private String email;

    @Column(name = "Password")
    private String password;

    @Column(name = "PhoneNumber", length = 20)
    private String phoneNumber;

    @Lob
    @Column(name = "Role", nullable = false)
    private String role;

    @OneToOne
    private Doctor doctor;

    @OneToOne
    private Patient patient;


}