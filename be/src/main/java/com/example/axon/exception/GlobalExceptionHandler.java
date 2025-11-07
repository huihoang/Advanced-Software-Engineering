package com.example.axon.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.example.axon.dto.response.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<String>> handleAppException(AppException ex, WebRequest request) {
        ApiResponse<String> response = new ApiResponse<>(ex.getCode(), ex.getMessage(), null);
        return ResponseEntity.status(HttpStatus.valueOf(ex.getCode())).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleGenericException(Exception ex, WebRequest request) {
        ApiResponse<String> response = new ApiResponse<>(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode(), ex.getMessage(),
                null);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
