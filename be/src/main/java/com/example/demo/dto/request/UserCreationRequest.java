package com.example.demo.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserCreationRequest {
    String firstname;
    String lastname;
    String email;

    @Size(min = 8, message = "PASSWORD_TOO_SHORT")
    String password;
    LocalDate dob;
}
