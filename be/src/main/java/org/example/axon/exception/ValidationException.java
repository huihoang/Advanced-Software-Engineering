package org.example.axon.exception;

public class ValidationException extends AppException {

    public ValidationException(ErrorCode errorCode) {
        super(errorCode);
    }

    public ValidationException(ErrorCode errorCode, Throwable cause) {
        super(errorCode, cause);
    }

    public ValidationException(ErrorCode errorCode, String message) {
        super(errorCode.getCode(), message);
    }

    public ValidationException(String message) {
        super(400, message);
    }

    public ValidationException(String message, Throwable cause) {
        super(400, message, cause);
    }
}
