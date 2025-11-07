package org.example.axon.mapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.example.axon.dto.response.DoctorListItemResponse;
import org.example.axon.dto.response.DoctorProfileResponse;
import org.example.axon.model.Doctor;
import org.example.axon.model.DoctorAvailability;
import org.example.axon.model.Hospital;
import org.example.axon.model.HospitalDepartment;
import org.example.axon.model.MedicalDepartment;
import org.example.axon.model.User;

/**
 * Utility mapper for converting {@link Doctor} entities into response DTOs.
 */
///Thank for chatgpt for helping me write this class
/// i love chatgpt
/// its so smart
/// thank you chatgpt
public final class DoctorMapper {

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    private DoctorMapper() {
    }

    public static DoctorListItemResponse toDoctorListItem(Doctor doctor) {
        if (doctor == null) {
            return null;
        }

        User user = doctor.getUsers();
        HospitalDepartment hospitalDepartment = doctor.getHospitalDepartment();
        MedicalDepartment medicalDepartment = hospitalDepartment != null ? hospitalDepartment.getDepartment() : null;

        DoctorListItemResponse.DepartmentSummary departmentSummary = null;
        if (medicalDepartment != null) {
            departmentSummary = new DoctorListItemResponse.DepartmentSummary(
                    medicalDepartment.getId(),
                    medicalDepartment.getName()
            );
        }

        return new DoctorListItemResponse(
                doctor.getUserId(),
                user != null ? user.getFirstName() : null,
                user != null ? user.getLastName() : null,
                user != null ? user.getRole() : null,
                doctor.getLicenseNumber(),
                doctor.getCitizenId(),
                departmentSummary,
                doctor.getConsultationFee()
        );
    }

    public static DoctorProfileResponse toDoctorProfile(Doctor doctor) {
        if (doctor == null) {
            return null;
        }

        User user = doctor.getUsers();
        HospitalDepartment hospitalDepartment = doctor.getHospitalDepartment();
        MedicalDepartment medicalDepartment = hospitalDepartment != null ? hospitalDepartment.getDepartment() : null;
        Hospital hospital = hospitalDepartment != null ? hospitalDepartment.getHospital() : null;

        DoctorProfileResponse.DepartmentSummary departmentSummary = buildDepartmentSummary(medicalDepartment);
        DoctorProfileResponse.ClinicInfo clinicInfo = buildClinicInfo(hospitalDepartment, hospital);
        List<DoctorProfileResponse.ShiftSummary> shifts = buildShifts(doctor.getDoctorAvailabilities());

        return new DoctorProfileResponse(
                doctor.getUserId(),
                user != null ? user.getFirstName() : null,
                user != null ? user.getLastName() : null,
                user != null ? user.getEmail() : null,
                user != null ? user.getPhoneNumber() : null,
                null,
                user != null ? user.getRole() : null,
                doctor.getSpecialization(),
                doctor.getLicenseNumber(),
                doctor.getConsultationFee(),
                departmentSummary,
                clinicInfo,
                shifts
        );
    }

    private static DoctorProfileResponse.DepartmentSummary buildDepartmentSummary(MedicalDepartment medicalDepartment) {
        if (medicalDepartment == null) {
            return null;
        }
        return new DoctorProfileResponse.DepartmentSummary(
                medicalDepartment.getId(),
                medicalDepartment.getName()
        );
    }

    private static DoctorProfileResponse.ClinicInfo buildClinicInfo(HospitalDepartment hospitalDepartment, Hospital hospital) {
        if (hospitalDepartment == null) {
            return null;
        }
        Integer id = hospitalDepartment.getId();
        String name = hospital != null ? hospital.getName() : null;
        String address = hospitalDepartment.getAddress() != null
                ? hospitalDepartment.getAddress()
                : hospital != null ? hospital.getAddress() : null;
        return new DoctorProfileResponse.ClinicInfo(id, name, address);
    }

    private static List<DoctorProfileResponse.ShiftSummary> buildShifts(Iterable<DoctorAvailability> doctorAvailabilities) {
        if (doctorAvailabilities == null) {
            return List.of();
        }

        List<DoctorAvailability> availabilityList = new ArrayList<>();
        doctorAvailabilities.forEach(availabilityList::add);

        availabilityList.sort(
                Comparator.comparing(DoctorAvailability::getAvailableDate,
                                Comparator.nullsLast(LocalDate::compareTo))
                        .thenComparing(DoctorAvailability::getStartTime,
                                Comparator.nullsLast(LocalTime::compareTo))
        );

        List<DoctorProfileResponse.ShiftSummary> shiftSummaries = new ArrayList<>();
        for (DoctorAvailability availability : availabilityList) {
            shiftSummaries.add(
                    new DoctorProfileResponse.ShiftSummary(
                            availability.getId(),
                            availability.getAvailableDate(),
                            buildShiftTime(availability.getStartTime(), availability.getEndTime())
                    )
            );
        }

        return shiftSummaries;
    }

    private static String buildShiftTime(LocalTime startTime, LocalTime endTime) {
        if (startTime == null && endTime == null) {
            return null;
        }
        if (startTime != null && endTime != null) {
            return TIME_FORMATTER.format(startTime) + " - " + TIME_FORMATTER.format(endTime);
        }
        if (startTime != null) {
            return TIME_FORMATTER.format(startTime);
        }
        return TIME_FORMATTER.format(endTime);
    }
}
