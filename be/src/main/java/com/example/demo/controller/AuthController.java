package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.AuthRequest;
import com.example.demo.dto.request.UserCreationRequest;
import com.example.demo.dto.response.ApiResponse;
import com.example.demo.dto.response.AuthResponse;
import com.example.demo.exception.AppException;
import com.example.demo.service.AuthService;
import com.example.demo.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.net.Authenticator;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequiredArgsConstructor
public class AuthController {
    // private AuthService authService; 
    @Autowired
    private UserService registerService;
    // private 
    @PostMapping("/register")
    public ApiResponse<AuthResponse> postRegister(@RequestBody @Valid UserCreationRequest request) {
    try {
        registerService.createRequest(request);
        return ApiResponse.<AuthResponse>builder()
            .code(200)
            .message("Register success")
            .result(AuthResponse.builder().build())
            .build();
    } catch (AppException e) {
        return ApiResponse.<AuthResponse>builder()
            .code(e.getCode())
            .message(e.getMessage())
            .result(AuthResponse.builder().build())
            .build();
    }    
 }
      

    // @PostMapping("/login")
    // public ApiResponse<AuthResponse> authenticate(@RequestBody AuthRequest request) {
    //     boolean result = authService.authenticate(request);

    //     return ApiResponse.<AuthResponse>builder()
    //     .result(AuthResponse.builder().build())
    //     .build();
    // }
    
}
