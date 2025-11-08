package org.example.axon.mapper;

import org.example.axon.dto.response.PatientProfileResponse;
import org.example.axon.model.Address;
import org.example.axon.model.Patient;
import org.example.axon.model.User;

public final class PatientMapper {

    private PatientMapper() {
    }

    public static PatientProfileResponse toPatientProfile(Patient patient) {
        if (patient == null) {
            return null;
        }

        User user = patient.getUsers();
        Address address = patient.getAddress();

        return new PatientProfileResponse(
                patient.getUserId(),
                user != null ? user.getFirstName() : null,
                user != null ? user.getLastName() : null,
                user != null ? user.getEmail() : null,
                user != null ? user.getPhoneNumber() : null,
                patient.getDateOfBirth(),
                user != null ? user.getRole() : null,
                patient.getCitizenId(),
                patient.getEmergencyName(),
                patient.getEmergencyPhone(),
                patient.getGender(),
                buildAddressSummary(address)
        );
    }

    private static PatientProfileResponse.AddressSummary buildAddressSummary(Address address) {
        if (address == null) {
            return null;
        }
        return new PatientProfileResponse.AddressSummary(
                address.getAddressLine(),
                address.getCity(),
                address.getProvinceState(),
                address.getCountry()
        );
    }
}
