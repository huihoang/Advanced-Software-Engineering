package org.example.axon.util;

import java.util.regex.Pattern;

public class ValidationUtils {

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$");

    private static final Pattern PHONE_PATTERN =
            Pattern.compile("^0\\d{9,10}$");

    private ValidationUtils() {
        // private constructor để tránh khởi tạo
    }

    public static String checkEmailOrPhone(String input) {
        if (input == null || input.isEmpty()) return "INVALID";

        if (EMAIL_PATTERN.matcher(input).matches()) {
            return "EMAIL";
        } else if (PHONE_PATTERN.matcher(input).matches()) {
            return "PHONE";
        } else {
            return "INVALID";
        }
    }

    public static boolean isEmail(String input) {
        return input != null && EMAIL_PATTERN.matcher(input).matches();
    }

    public static boolean isPhone(String input) {
        return input != null && PHONE_PATTERN.matcher(input).matches();
    }
}
