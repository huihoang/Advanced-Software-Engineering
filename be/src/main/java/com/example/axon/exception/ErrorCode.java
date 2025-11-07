package com.example.axon.exception;

public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(999, "Uncategorized error"),

    INVALID_KEY(1001, "Invalid message key"),
    USERNAME_ALREADY_EXISTS(1002, "User existed"),
    USERNAME_INVALID(103, "Username is invalid"),
    INVALID_PASSWORD(1004, "Invalid password"),
    USER_NOT_FOUND(1005, "User not found"),
    UNAUTHENTICATED(1006, "Unauthenticated"),
    UNAUTHORIZED(1007, "Unauthorized"),
    INVALID_DOB(1008, "Date of birth is invalid");

    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
