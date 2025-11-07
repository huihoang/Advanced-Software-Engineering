package org.example.axon.dto.response;

import java.util.List;
import lombok.Data;

@Data
public class SearchResponse {
    private String keyword;
    private List<DoctorSearchResponse> doctors;
    private List<DepartmentSearchResponse> departments;

    public SearchResponse(String keyword) {
        this.keyword = keyword;
    }

    public SearchResponse(String keyword, List<DoctorSearchResponse> doctors,
            List<DepartmentSearchResponse> departments) {
        this.keyword = keyword;
        this.doctors = doctors;
        this.departments = departments;
    }
}