package org.example.axon.controller;

import org.example.axon.configuration.JwtUtils;
import org.example.axon.dto.request.AppointmentCreationRequest;
import org.example.axon.dto.response.AppointmentProfile;
import org.example.axon.dto.response.AppointmentResponse;
import org.example.axon.model.Appointment;
import org.example.axon.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.axon.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/appointments")
public class AppoinmentController {
    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping
    public ResponseEntity<?> getAllAppoinments(@RequestParam(required = false) String doctorId, @RequestParam(required = false) String patientId){
        try {
            return ResponseEntity.ok(appointmentService.getAllAppointmentResponse(doctorId,patientId));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "status", "error",
                    "message", "Unexpected error occurred: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable int id){
        try {
            return ResponseEntity.ok(appointmentService.getAnAppointmentById(id));
        }
        catch (ResourceNotFoundException e) {
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


    @PostMapping
    public ResponseEntity<?> registerShift(@RequestHeader("Authorization") String authHeader, @RequestBody AppointmentCreationRequest request){
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            String token = authHeader.substring(7);
            String username = jwtUtils.getSubject(token);
            return ResponseEntity.ok(appointmentService.registerShift(username,request));

        }catch (ResourceNotFoundException e) {
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


    @DeleteMapping("/{id}")
    public ResponseEntity<?> unregisterShift(@RequestHeader("Authorization") String authHeader, @PathVariable int id) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            String token = authHeader.substring(7);
            String username = jwtUtils.getSubject(token);
            appointmentService.unregisterShift(id,username);
            return ResponseEntity.ok("Unregister shift successfully!");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "status", "error",
                    "message", "Unexpected error occurred: " + e.getMessage()
            ));
        }
    }

    @PatchMapping("/{id}/book")
    public ResponseEntity<?> bookAppointment(@PathVariable int id,@RequestHeader("Authorization") String authHeader,
                                             @RequestBody AppointmentCreationRequest request){
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer " )) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            String token = authHeader.substring(7);
            String username = jwtUtils.getSubject(token);
            return ResponseEntity.ok(appointmentService.bookAppointment(id, username, request));
        }catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }

    @PatchMapping("/{id}/confirm")
    public ResponseEntity<?> confirmAppointment(@PathVariable int id){
        try {
            appointmentService.confirmAppointment(id);
            return ResponseEntity.ok("Confirm appointment successfully!");
        }catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable int id){
        try {
            appointmentService.cancelAppointment(id);
            return ResponseEntity.ok("Cancel appoinitment successfully!");
        }catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }




}
