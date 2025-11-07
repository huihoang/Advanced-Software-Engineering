package org.example.axon.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.example.axon.model.Doctor;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DoctorRepository extends JpaRepository<Doctor, String> {
    @EntityGraph(attributePaths = {
            "users",
            "hospitalDepartment",
            "hospitalDepartment.department",
            "hospitalDepartment.hospital",
            "doctorAvailabilities",
            "doctorAvailabilities.hospitalDepartment",
            "doctorAvailabilities.hospitalDepartment.hospital"
    })
    Optional<Doctor> findWithDetailsByUserId(String userId);
////Thank for ChatGPT's help to generate the below complex query
    @EntityGraph(attributePaths = {
            "users",
            "hospitalDepartment",
            "hospitalDepartment.department"
    })
    @Query("""
            select distinct d from Doctor d
            left join d.users u
            left join d.hospitalDepartment hd
            left join hd.department md
            left join d.doctorAvailabilities da
            where (:search is null
                or lower(u.firstName) like :search
                or lower(u.lastName) like :search
                or lower(concat(coalesce(u.firstName, ''), ' ', coalesce(u.lastName, ''))) like :search
                or lower(d.licenseNumber) like :search
                or lower(d.citizenId) like :search
            )
            and (:departmentId is null or md.id = :departmentId)
            and (:scheduleDate is null or da.availableDate = :scheduleDate)
            """)
    List<Doctor> searchDoctors(
            @Param("search") String search,
            @Param("departmentId") Integer departmentId,
            @Param("scheduleDate") LocalDate scheduleDate
    );
}
