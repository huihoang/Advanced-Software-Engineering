package org.example.axon.controller;

import org.example.axon.dto.request.DoctorProfileUpdateRequest;
import org.example.axon.dto.response.DoctorListItemResponse;
import org.example.axon.dto.response.DoctorProfileResponse;
import org.example.axon.exception.ResourceNotFoundException;
import org.example.axon.services.DoctorService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<DoctorListItemResponse>> getDoctors(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer departmentId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate scheduleDate
    ) {
        List<DoctorListItemResponse> doctors = doctorService.getDoctors(search, departmentId, scheduleDate);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/doctors/{id}")
    public ResponseEntity<?> getDoctorProfile(@PathVariable String id) {
        try {
            DoctorProfileResponse response = doctorService.getDoctorProfile(id);
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "status", "error",
                    "message", "Unexpected error occurred: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/doctor/me")
    public ResponseEntity<?> updateCurrentDoctorProfile(
            @RequestBody DoctorProfileUpdateRequest request,
            Authentication authentication
    ) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "status", "error",
                    "message", "Authentication is required."
            ));
        }
        try {
            DoctorProfileResponse response = doctorService.updateCurrentDoctorProfile(authentication.getName(), request);
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "status", "error",
                    "message", "Unexpected error occurred: " + e.getMessage()
            ));
        }
    }
}
