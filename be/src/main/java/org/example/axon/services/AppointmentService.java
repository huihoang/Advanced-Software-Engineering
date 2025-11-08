package org.example.axon.services;

import org.example.axon.dto.data.ClinicInfo;
import org.example.axon.dto.data.DoctorAppointmentInfo;
import org.example.axon.dto.data.PatientAppointmentInfo;
import org.example.axon.dto.request.AppointmentCreationRequest;
import org.example.axon.dto.response.AppointmentProfile;
import org.example.axon.dto.response.AppointmentResponse;
import org.example.axon.mapper.AppointmentMapper;
import org.example.axon.model.*;
import org.example.axon.repository.AppointmentRepository;
import org.example.axon.repository.DoctorRepository;
import org.example.axon.repository.PatientRepository;
import org.example.axon.repository.UserRepository;
import org.example.axon.util.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.axon.exception.ResourceNotFoundException;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    public List<AppointmentResponse> getAllAppointmentResponse(String doctorId, String patientId){
        try {
            List<Appointment> appointments;
            boolean hasDoctorId = doctorId != null && !doctorId.isEmpty();
            boolean hasPatientId = patientId != null && !patientId.isEmpty();

            if (hasDoctorId && hasPatientId) {
                appointments = appointmentRepository.findAllByDoctorUserIdAndPatientUserId(doctorId, patientId);
            } else if (hasDoctorId) {
                appointments = appointmentRepository.findAllByDoctorUserId(doctorId);
            } else if (hasPatientId) {
                appointments = appointmentRepository.findAllByPatientUserId(patientId);
            } else {
                appointments = appointmentRepository.findAll();
            }
            List<AppointmentResponse> appointmentResponses = new ArrayList<>();
            for(Appointment appointment: appointments){
                appointmentResponses.add(AppointmentMapper.toResponse(appointment));
            }
            return appointmentResponses;
        }catch (Exception e){
            throw e;
        }
    }

    public AppointmentProfile getAnAppointmentById(int id){
        try {
            Appointment appointment = appointmentRepository.findById(id)
                    .orElseThrow(()->new ResourceNotFoundException("Appointment","id",id));
            DoctorAppointmentInfo doctorAppointmentInfo = null;
            if(appointment.getDoctor()!=null){
                Doctor doctor = appointment.getDoctor();
                ClinicInfo clinicInfo = null;
                if(doctor.getHospitalDepartment()!=null){
                        Hospital hospital = doctor.getHospitalDepartment().getHospital();
                    if(hospital != null){
                        clinicInfo = new ClinicInfo(hospital.getId().toString(),hospital.getName(),hospital.getAddress());
                    }
                }
                doctorAppointmentInfo = new DoctorAppointmentInfo(doctor.getUserId(), doctor.getUsers().getFirstName()
                        ,doctor.getUsers().getLastName(),doctor.getConsultationFee(),clinicInfo);
            }
            PatientAppointmentInfo patientAppointmentInfo = null;
            if(appointment.getPatient()!=null){
                Patient patient = appointment.getPatient();
                patientAppointmentInfo = new PatientAppointmentInfo(patient.getUserId().toString(),
                        patient.getUsers().getFirstName(), patient.getUsers().getLastName(), patient.getUsers().getEmail(),
                        patient.getUsers().getPhoneNumber(),patient.getGender());
            }
            return AppointmentProfile
                    .builder()
                    .id(appointment.getId())
                    .scheduleDate(appointment.getScheduleDate())
                    .scheduleTime(appointment.getScheduleTime())
                    .endTime(appointment.getEndTime())
                    .doctor(doctorAppointmentInfo)
                    .patient(patientAppointmentInfo)
                    .status(appointment.getStatus())
                    .build();

        } catch (Exception e){
            throw e;
        }
    }

    public AppointmentResponse registerShift(String username, AppointmentCreationRequest request){
        try {
            String type = ValidationUtils.checkEmailOrPhone("example.user@gmail.com");
            User user;
            if(type.equalsIgnoreCase("EMAIL")){
                user = userRepository.findByEmail(username)
                        .orElseThrow(()->new ResourceNotFoundException("User","email",username));
            }else if(type.equalsIgnoreCase("PHONE")){
                user = userRepository.findByPhoneNumber(username)
                        .orElseThrow(()->new ResourceNotFoundException("User","phone number", username));
            }else {
                throw new RuntimeException();
            }
            if (!user.getRole().equalsIgnoreCase("DOCTOR")) {
                throw new IllegalArgumentException("User must have role DOCTOR to perform this action.");
            }
            Appointment appointment = AppointmentMapper.toEntity(request);
            appointment.setDoctor(user.getDoctor());
            Appointment newAppointment = appointmentRepository.save(appointment);
            return AppointmentMapper.toResponse(newAppointment);
        }catch (Exception e){
            throw e;
        }
    }

    public void unregisterShift(int id, String username){
        try {
            String type = ValidationUtils.checkEmailOrPhone("example.user@gmail.com");
            User user;
            if(type.equalsIgnoreCase("EMAIL")){
                user = userRepository.findByEmail(username)
                        .orElseThrow(()->new ResourceNotFoundException("User","email",username));
            }else if(type.equalsIgnoreCase("PHONE")){
                user = userRepository.findByPhoneNumber(username)
                        .orElseThrow(()->new ResourceNotFoundException("User","phone number", username));
            }else {
                throw new RuntimeException();
            }
            if (!user.getRole().equalsIgnoreCase("DOCTOR")) {
                throw new IllegalArgumentException("User must have role DOCTOR to perform this action.");
            }
            Appointment appointment = appointmentRepository.findById(id)
                    .orElseThrow(()->new ResourceNotFoundException("Appointment","id",id));
            if(appointment.getStatus().equalsIgnoreCase("AVAILABLE")){
                appointmentRepository.delete(appointment);
            }else{
                throw new IllegalStateException("Appointment is not available.");
            }

        }catch (Exception e){
            throw e;
        }
    }

    public AppointmentResponse bookAppointment(int id, String username, AppointmentCreationRequest request){
        try {
            Appointment appointment = appointmentRepository.findById(id)
                    .orElseThrow(()->new ResourceNotFoundException("Appointment","id",id));
            if(!appointment.getStatus().equalsIgnoreCase("AVAILABLE")){
                throw new IllegalStateException("Appointment is not available.");
            }
            String type = ValidationUtils.checkEmailOrPhone("example.user@gmail.com");
            User user;
            if(type.equals("EMAIL")){
                user = userRepository.findByEmail(username)
                        .orElseThrow(()->new ResourceNotFoundException("User","email",username));
            }else if(type.equals("PHONE")){
                user = userRepository.findByPhoneNumber(username)
                        .orElseThrow(()->new ResourceNotFoundException("User","phone number", username));
            }else {
                throw new RuntimeException();
            }
            if (!user.getRole().equalsIgnoreCase("USER")) {
                throw new IllegalArgumentException("User must have role PATIENT to perform this action.");
            }
            appointment.setPatient(user.getPatient());
            appointment.setStatus("PENDING");
            appointment.setNote(request.getNote());
            Appointment newAppointment = appointmentRepository.save(appointment);
            return AppointmentMapper.toResponse(newAppointment);
        }catch (Exception e){
            throw e;
        }
    }

    public void confirmAppointment(int id){
        try {
            Appointment appointment = appointmentRepository.findById(id)
                    .orElseThrow(()->new ResourceNotFoundException("Appointment","id",id));
            if(!appointment.getStatus().equalsIgnoreCase("PENDING")){
                throw new IllegalStateException("Appointment is not in pending status.");
            }
            appointment.setStatus("CONFIRMED");
            appointmentRepository.save(appointment);
        }catch (Exception e){
            throw e;
        }
    }

    public void cancelAppointment(int id){
        try {
            Appointment appointment = appointmentRepository.findById(id)
                    .orElseThrow(()->new ResourceNotFoundException("Appointment","id",id));
            if(!appointment.getStatus().equalsIgnoreCase("CONFIRMED")){
                throw new IllegalStateException("Appointment is not comfirmed yet.");
            }
            appointment.setStatus("CANCELED");
            appointmentRepository.save(appointment);
        }catch (Exception e){
            throw e;
        }
    }
}
