package org.example.axon.services;

import org.example.axon.dto.request.PatientProfileUpdateRequest;
import org.example.axon.dto.response.PatientProfileResponse;
import org.example.axon.exception.ResourceNotFoundException;
import org.example.axon.mapper.PatientMapper;
import org.example.axon.model.Address;
import org.example.axon.model.Patient;
import org.example.axon.model.User;
import org.example.axon.repository.AddressRepository;
import org.example.axon.repository.PatientRepository;
import org.example.axon.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    public PatientService(PatientRepository patientRepository,
                          UserRepository userRepository,
                          AddressRepository addressRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    @Transactional(readOnly = true)
    public PatientProfileResponse getPatientProfile(String patientId) {
        Patient patient = patientRepository.findWithDetailsByUserId(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", patientId));
        return PatientMapper.toPatientProfile(patient);
    }

    @Transactional
    public PatientProfileResponse updateCurrentPatient(String username, PatientProfileUpdateRequest request) {
        if (!StringUtils.hasText(username)) {
            throw new IllegalArgumentException("User is not authenticated.");
        }

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", username));

        if (user.getPatient() == null) {
            throw new IllegalArgumentException("User must have role PATIENT to perform this action.");
        }

        Patient patient = patientRepository.findWithDetailsByUserId(user.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", user.getUserId()));

        if (request.firstName() != null) {
            user.setFirstName(request.firstName());
        }
        if (request.lastName() != null) {
            user.setLastName(request.lastName());
        }
        if (request.phoneNumber() != null) {
            user.setPhoneNumber(request.phoneNumber());
        }

        if (request.dateOfBirth() != null) {
            patient.setDateOfBirth(request.dateOfBirth());
        }
        if (request.citizenId() != null) {
            patient.setCitizenId(request.citizenId());
        }
        if (request.emergencyName() != null) {
            patient.setEmergencyName(request.emergencyName());
        }
        if (request.emergencyPhone() != null) {
            patient.setEmergencyPhone(request.emergencyPhone());
        }
        if (request.gender() != null) {
            patient.setGender(request.gender());
        }

        if (request.address() != null) {
            Address address = patient.getAddress();
            if (address == null) {
                address = new Address();
            }
            address.setAddressLine(request.address().addressLine());
            address.setCity(request.address().city());
            address.setProvinceState(request.address().provinceState());
            address.setCountry(request.address().country());
            address = addressRepository.save(address);
            patient.setAddress(address);
        }

        return PatientMapper.toPatientProfile(patient);
    }
}
