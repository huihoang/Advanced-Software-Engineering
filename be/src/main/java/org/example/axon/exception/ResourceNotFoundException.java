package org.example.axon.exception; // (Bạn có thể đổi tên package)

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception tùy chỉnh được ném ra khi không tìm thấy một tài nguyên cụ thể.
 * Tự động ánh xạ tới HTTP 404 Not Found.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    private String resourceName;
    private String fieldName;
    private Object fieldValue;

    /**
     * Constructor để xây dựng message lỗi động và cố định (standardized).
     *
     * @param resourceName Tên của tài nguyên (ví dụ: "Patient", "Appointment").
     * @param fieldName Tên của trường dùng để tìm kiếm (ví dụ: "id", "email").
     * @param fieldValue Giá trị của trường đó (ví dụ: "123", "test@gmail.com").
     */
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        // Message cố định: "Patient not found with id : '123'"
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
        
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    // Constructor cơ bản nếu bạn chỉ muốn truyền một message tùy ý

    ///Thank you 
    public ResourceNotFoundException(String message) {
        super(message);
    }

    // Getters (hữu ích nếu bạn dùng @ControllerAdvice để xử lý lỗi)
    public String getResourceName() {
        return resourceName;
    }

    public String getFieldName() {
        return fieldName;
    }

    public Object getFieldValue() {
        return fieldValue;
    }
}