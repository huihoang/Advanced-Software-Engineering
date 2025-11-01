package com.example.demo.exception;

public class BusinessLogicException extends AppException {

    public BusinessLogicException(ErrorCode errorCode) {
        super(errorCode);
    }

    public BusinessLogicException(ErrorCode errorCode, Throwable cause) {
        super(errorCode, cause);
    }

    public BusinessLogicException(ErrorCode errorCode, String message) {
        super(errorCode.getCode(), message);
    }

    public BusinessLogicException(int code, String message) {
        super(code, message);
    }

    public BusinessLogicException(int code, String message, Throwable cause) {
        super(code, message, cause);
    }
}
