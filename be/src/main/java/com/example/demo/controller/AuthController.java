package com.example.demo.controller;
import java.util.Map;
import com.example.demo.dto.response.ApiResponse;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class AuthController {
 @PostMapping("/register")
 public ApiResponse postRegister(@RequestBody Map<String, Object> request) {
     //TODO: process POST request
     
     return new ApiResponse(200,"","");
 }
 
}
