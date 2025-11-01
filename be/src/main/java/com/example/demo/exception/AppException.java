package com.example.demo.exception;

public class AppException extends RuntimeException {
    private int code;

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.code = errorCode.getCode();
    }

    public AppException(ErrorCode errorCode, Throwable cause) {
        super(errorCode.getMessage(), cause);
        this.code = errorCode.getCode();
    }

    public AppException(ErrorCode errorCode, String message) {
        super(message);
        this.code = errorCode.getCode();
    }

    public AppException(int code, String message) {
        super(message);
        this.code = code;
    }

    public AppException(int code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
}
