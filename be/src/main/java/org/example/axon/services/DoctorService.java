package org.example.axon.services;

import org.example.axon.dto.request.DoctorProfileUpdateRequest;
import org.example.axon.dto.response.DoctorListItemResponse;
import org.example.axon.dto.response.DoctorProfileResponse;
import org.example.axon.exception.ResourceNotFoundException;
import org.example.axon.mapper.DoctorMapper;
import org.example.axon.model.Doctor;
import org.example.axon.model.HospitalDepartment;
import org.example.axon.model.User;
import org.example.axon.repository.DoctorRepository;
import org.example.axon.repository.HospitalDepartmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final HospitalDepartmentRepository hospitalDepartmentRepository;

    public DoctorService(DoctorRepository doctorRepository,
                         HospitalDepartmentRepository hospitalDepartmentRepository) {
        this.doctorRepository = doctorRepository;
        this.hospitalDepartmentRepository = hospitalDepartmentRepository;
    }

    @Transactional(readOnly = true)
    public List<DoctorListItemResponse> getDoctors(String search, Integer departmentId, LocalDate scheduleDate) {
        String normalizedSearch = StringUtils.hasText(search)
                ? "%" + search.trim().toLowerCase() + "%"
                : null;

        return doctorRepository.searchDoctors(normalizedSearch, departmentId, scheduleDate)
                .stream()
                .map(DoctorMapper::toDoctorListItem)
                .toList();
    }

    @Transactional(readOnly = true)
    public DoctorProfileResponse getDoctorProfile(String doctorId) {
        Doctor doctor = doctorRepository.findWithDetailsByUserId(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", doctorId));
        return DoctorMapper.toDoctorProfile(doctor);
    }

    @Transactional
    public DoctorProfileResponse updateCurrentDoctorProfile(String username, DoctorProfileUpdateRequest request) {
        if (!StringUtils.hasText(username)) {
            throw new IllegalArgumentException("User is not authenticated.");
        }

        Doctor doctor = doctorRepository.findWithDetailsByUserEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "email", username));

        User user = doctor.getUsers();
        if (user == null) {
            throw new IllegalStateException("Doctor profile is missing user information.");
        }

        if (request.firstName() != null) {
            user.setFirstName(request.firstName());
        }
        if (request.lastName() != null) {
            user.setLastName(request.lastName());
        }
        if (request.phoneNumber() != null) {
            user.setPhoneNumber(request.phoneNumber());
        }

        if (request.bio() != null) {
            doctor.setSpecialization(request.bio());
        }
        if (request.licenseNumber() != null) {
            doctor.setLicenseNumber(request.licenseNumber());
        }
        if (request.citizen() != null) {
            doctor.setCitizenId(request.citizen());
        }
        if (request.consultationFee() != null) {
            doctor.setConsultationFee(request.consultationFee());
        }

        if (request.clinicInfo() != null && request.clinicInfo().id() != null) {
            HospitalDepartment hospitalDepartment = hospitalDepartmentRepository.findById(request.clinicInfo().id())
                    .orElseThrow(() -> new ResourceNotFoundException("HospitalDepartment", "id", request.clinicInfo().id()));

            doctor.setHospitalDepartment(hospitalDepartment);
        }

        return DoctorMapper.toDoctorProfile(doctor);
    }
}
