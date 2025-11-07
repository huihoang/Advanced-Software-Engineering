package org.example.axon.exception;

public class ResourceNotFoundException extends AppException {

    public ResourceNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }

    public ResourceNotFoundException(ErrorCode errorCode, Throwable cause) {
        super(errorCode, cause);
    }

    public ResourceNotFoundException(ErrorCode errorCode, String message) {
        super(errorCode.getCode(), message);
    }

    public ResourceNotFoundException(String message) {
        super(404, message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(404, message, cause);
    }
}
