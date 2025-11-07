package org.example.axon.exception;

import org.example.axon.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

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
