package com.example.demo.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

// import java.time.LocalDate;

import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserCreationRequest {
    @NotBlank(message = "First Name cannot be blank")
    String firstName;
    @NotBlank(message = "Last Name cannot be blank")
    String lastName;
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "User must have a valid email format")
    String email;

    @Size(min = 8, message = "PASSWORD_TOO_SHORT")
    String password;

    @Size(min = 10, max = 10, message = "Phone number must have 10 digits")
    @Pattern(regexp = "^0[0-9]*$", message = "Phone number must start with 0")
    String phoneNumber;
}
