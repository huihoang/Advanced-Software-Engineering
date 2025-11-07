package com.example.axon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.axon.dto.response.DepartmentSearchResponse;
import com.example.axon.dto.response.DoctorSearchResponse;
import com.example.axon.dto.response.SearchResponse;
import com.example.axon.repository.DepartmentsRepository;
import com.example.axon.repository.DoctorsRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    @Autowired
    private DoctorsRepository doctorsRepository;

    @Autowired
    private DepartmentsRepository departmentsRepository;

    /**
     * Search doctors, departments hoặc cả hai
     * 
     * @param keyword Từ khóa tìm kiếm (tên bác sĩ, specialization, department name,
     *                etc.)
     * @param type    "all" (default), "doctor", hoặc "department"
     * @param page    Số trang (mặc định: 1)
     * @param limit   Số kết quả trên trang (mặc định: 10)
     */
    public SearchResponse search(String keyword, String type, int page, int limit) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return new SearchResponse(keyword, new ArrayList<>(), new ArrayList<>());
        }

        List<DoctorSearchResponse> doctors = new ArrayList<>();
        List<DepartmentSearchResponse> departments = new ArrayList<>();

        if ((type == null || type.isEmpty() || type.equals("all") || type.equals("doctor"))) {
            doctors = doctorsRepository.searchByKeyword(keyword.trim());
        }

        if ((type == null || type.isEmpty() || type.equals("all") || type.equals("department"))) {
            departments = departmentsRepository.searchByKeyword(keyword.trim());
        }

        SearchResponse response = new SearchResponse(keyword);
        response.setDoctors(doctors);
        response.setDepartments(departments);

        return response;
    }
}