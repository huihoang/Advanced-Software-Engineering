package org.example.axon.dto.request;

import jakarta.validation.constraints.*;

public record RegisterRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8) String password,
        @NotBlank String firstName,
        @NotBlank String lastName,
        @NotBlank
        @Size(min = 10, max = 10, message = "Phone number must have 10 digits")
        @Pattern(regexp = "^0[0-9]*$", message = "Phone number must start with 0")
        String phoneNumber
) {}
