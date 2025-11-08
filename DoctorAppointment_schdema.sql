-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: DoctorAppointment
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2
DROP DATABASE if EXISTS DoctorAppointment;

CREATE DATABASE DoctorAppointment;

use DoctorAppointment;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `Addresses`
--

DROP TABLE IF EXISTS `Addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Addresses` (
    `AddressId` int NOT NULL AUTO_INCREMENT,
    `AddressLine` varchar(255) DEFAULT NULL,
    `City` varchar(100) DEFAULT NULL,
    `ProvinceState` varchar(100) DEFAULT NULL,
    `Country` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`AddressId`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `Appointments`
--

DROP TABLE IF EXISTS `Appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Appointments` (
    `AppointmentID` int NOT NULL AUTO_INCREMENT,
    `PatientId` varchar(36) DEFAULT NULL,
    `DoctorId` varchar(36) DEFAULT NULL,
    `ScheduleDate` date DEFAULT NULL,
    `ScheduleTime` time DEFAULT NULL,
    `EndTime` time DEFAULT NULL,
    `Status` varchar(20) DEFAULT NULL,
    `Note` tinytext,
    `Created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `HospitalDepartmentId` int DEFAULT NULL,
    PRIMARY KEY (`AppointmentID`),
    KEY `PatientId` (`PatientId`),
    KEY `DoctorId` (`DoctorId`),
    KEY `HospitalDepartmentId` (`HospitalDepartmentId`),
    CONSTRAINT `Appointments_ibfk_1` FOREIGN KEY (`PatientId`) REFERENCES `Patients` (`UserId`),
    CONSTRAINT `Appointments_ibfk_2` FOREIGN KEY (`DoctorId`) REFERENCES `Doctors` (`UserId`),
    CONSTRAINT `Appointments_ibfk_3` FOREIGN KEY (`HospitalDepartmentId`) REFERENCES `HospitalDepartments` (`HospitalDepartmentId`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `Conditions`
--

DROP TABLE IF EXISTS `Conditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Conditions` (
    `ConditionID` int NOT NULL AUTO_INCREMENT,
    `ConditionName` varchar(150) DEFAULT NULL,
    `Description` tinytext,
    `Type` tinytext,
    PRIMARY KEY (`ConditionID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `DoctorAvailabilities`
--

DROP TABLE IF EXISTS `DoctorAvailabilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `DoctorAvailabilities` (
    `AvailabilityID` int NOT NULL AUTO_INCREMENT,
    `DoctorId` varchar(36) DEFAULT NULL,
    `AvailableDate` date DEFAULT NULL,
    `StartTime` time DEFAULT NULL,
    `EndTime` time DEFAULT NULL,
    `HospitalDepartmentId` int DEFAULT NULL,
    PRIMARY KEY (`AvailabilityID`),
    KEY `DoctorId` (`DoctorId`),
    KEY `HospitalDepartmentId` (`HospitalDepartmentId`),
    CONSTRAINT `DoctorAvailabilities_ibfk_1` FOREIGN KEY (`DoctorId`) REFERENCES `Doctors` (`UserId`),
    CONSTRAINT `DoctorAvailabilities_ibfk_2` FOREIGN KEY (`HospitalDepartmentId`) REFERENCES `HospitalDepartments` (`HospitalDepartmentId`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `Doctors`
--

DROP TABLE IF EXISTS `Doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Doctors` (
    `UserId` varchar(36) NOT NULL,
    `CitizenId` varchar(50) DEFAULT NULL,
    `LicenseNumber` varchar(50) DEFAULT NULL,
    `ConsultationFee` decimal(10, 2) DEFAULT NULL,
    `Specialization` varchar(100) DEFAULT NULL,
    `HospitalDepartmentId` int DEFAULT NULL,
    PRIMARY KEY (`UserId`),
    UNIQUE KEY `CitizenId` (`CitizenId`),
    KEY `FK7ihu3iwvx1lil0mmnvm2q34gm` (`HospitalDepartmentId`),
    CONSTRAINT `Doctors_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE,
    CONSTRAINT `FK7ihu3iwvx1lil0mmnvm2q34gm` FOREIGN KEY (`HospitalDepartmentId`) REFERENCES `HospitalDepartments` (`HospitalDepartmentId`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `HospitalDepartments`
--

DROP TABLE IF EXISTS `HospitalDepartments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `HospitalDepartments` (
    `HospitalDepartmentId` int NOT NULL AUTO_INCREMENT,
    `HospitalId` int NOT NULL,
    `DepartmentId` int NOT NULL,
    `Address` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`HospitalDepartmentId`),
    UNIQUE KEY `unique_hospital_department` (`HospitalId`, `DepartmentId`),
    KEY `DepartmentId` (`DepartmentId`),
    CONSTRAINT `HospitalDepartments_ibfk_1` FOREIGN KEY (`HospitalId`) REFERENCES `Hospitals` (`HospitalID`) ON DELETE CASCADE,
    CONSTRAINT `HospitalDepartments_ibfk_2` FOREIGN KEY (`DepartmentId`) REFERENCES `MedicalDepartments` (`DepartmentID`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `Hospitals`
--

DROP TABLE IF EXISTS `Hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Hospitals` (
    `HospitalID` int NOT NULL,
    `Name` varchar(150) DEFAULT NULL,
    `Type` tinytext,
    `Address` varchar(255) DEFAULT NULL,
    `Hotline` varchar(20) DEFAULT NULL,
    `Email` varchar(100) DEFAULT NULL,
    `OpenTime` time DEFAULT NULL,
    `CloseTime` time DEFAULT NULL,
    PRIMARY KEY (`HospitalID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `MedicalDepartments`
--

DROP TABLE IF EXISTS `MedicalDepartments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `MedicalDepartments` (
    `DepartmentID` int NOT NULL,
    `Name` varchar(150) DEFAULT NULL,
    `Description` tinytext,
    `HeadOfDepartment` varchar(100) DEFAULT NULL,
    `Phone` varchar(20) DEFAULT NULL,
    `Email` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`DepartmentID`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `PatientConditions`
--

DROP TABLE IF EXISTS `PatientConditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `PatientConditions` (
    `PatientConditionID` int NOT NULL AUTO_INCREMENT,
    `PatientId` varchar(36) NOT NULL,
    `ConditionID` int NOT NULL,
    `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`PatientConditionID`),
    UNIQUE KEY `unique_patient_condition` (`PatientId`, `ConditionID`),
    KEY `ConditionID` (`ConditionID`),
    CONSTRAINT `PatientConditions_ibfk_1` FOREIGN KEY (`PatientId`) REFERENCES `Patients` (`UserId`) ON DELETE CASCADE,
    CONSTRAINT `PatientConditions_ibfk_2` FOREIGN KEY (`ConditionID`) REFERENCES `Conditions` (`ConditionID`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `PatientInsurances`
--

DROP TABLE IF EXISTS `PatientInsurances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `PatientInsurances` (
    `InsuranceId` varchar(50) NOT NULL,
    `PatientId` varchar(36) DEFAULT NULL,
    `ProviderName` varchar(100) DEFAULT NULL,
    `ExpiryDate` date DEFAULT NULL,
    `Type` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`InsuranceId`),
    KEY `PatientId` (`PatientId`),
    CONSTRAINT `PatientInsurances_ibfk_1` FOREIGN KEY (`PatientId`) REFERENCES `Patients` (`UserId`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `Patients`
--

DROP TABLE IF EXISTS `Patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Patients` (
    `UserId` varchar(36) NOT NULL,
    `CitizenId` varchar(50) DEFAULT NULL,
    `AGE` int DEFAULT NULL,
    `Gender` tinytext,
    `EmergencyName` varchar(100) DEFAULT NULL,
    `AddressId` int DEFAULT NULL,
    `EmergencyPhone` varchar(20) DEFAULT NULL,
    `DateOfBirth` date DEFAULT NULL,
    PRIMARY KEY (`UserId`),
    UNIQUE KEY `CitizenId` (`CitizenId`),
    KEY `AddressId` (`AddressId`),
    CONSTRAINT `Patients_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE,
    CONSTRAINT `Patients_ibfk_2` FOREIGN KEY (`AddressId`) REFERENCES `Addresses` (`AddressId`) ON DELETE SET NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Reviews` (
    `ReviewID` int NOT NULL AUTO_INCREMENT,
    `Rating` int DEFAULT NULL,
    `Comment` tinytext,
    `PatientId` varchar(36) DEFAULT NULL,
    `DoctorId` varchar(36) DEFAULT NULL,
    `Created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ReviewID`),
    KEY `PatientId` (`PatientId`),
    KEY `DoctorId` (`DoctorId`),
    CONSTRAINT `Reviews_ibfk_1` FOREIGN KEY (`PatientId`) REFERENCES `Patients` (`UserId`),
    CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`DoctorId`) REFERENCES `Doctors` (`UserId`),
    CONSTRAINT `Reviews_chk_1` CHECK ((`Rating` between 1 and 5))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `TreatedBy`
--

DROP TABLE IF EXISTS `TreatedBy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `TreatedBy` (
    `ConditionID` int NOT NULL,
    `DepartmentID` int NOT NULL,
    PRIMARY KEY (`ConditionID`, `DepartmentID`),
    KEY `DepartmentID` (`DepartmentID`),
    CONSTRAINT `TreatedBy_ibfk_1` FOREIGN KEY (`ConditionID`) REFERENCES `Conditions` (`ConditionID`) ON DELETE CASCADE,
    CONSTRAINT `TreatedBy_ibfk_2` FOREIGN KEY (`DepartmentID`) REFERENCES `MedicalDepartments` (`DepartmentID`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `Users` (
    `UserId` varchar(36) NOT NULL DEFAULT(uuid()),
    `FirstName` varchar(100) DEFAULT NULL,
    `LastName` varchar(100) DEFAULT NULL,
    `Email` varchar(150) DEFAULT NULL,
    `Password` varchar(255) DEFAULT NULL,
    `PhoneNumber` varchar(20) DEFAULT NULL,
    `Role` tinytext NOT NULL,
    PRIMARY KEY (`UserId`),
    UNIQUE KEY `Email` (`Email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-11-07 23:49:11

-- Insert sample Vietnamese data

-- Insert sample users'

-- mật khẩu là 12345678 đã được băm bằng bcrypt
INSERT INTO
    `Users` (
        `UserId`,
        `FirstName`,
        `LastName`,
        `Email`,
        `Password`,
        `PhoneNumber`,
        `Role`
    )
VALUES (
        '123e4567-e89b-12d3-a456-426614174000',
        'Nguyễn Văn',
        'An',
        'nguyenvanan@email.com',
        '$2a$10$uoFlu1wCn9crWU7G/I2WYOXEdNGfRoI7PgUp2OgBCNwwIET0yQHaq',
        '0901234567',
        'USER'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174001',
        'Trần Thị',
        'Bình',
        'tranthibinh@email.com',
        '$2a$10$uoFlu1wCn9crWU7G/I2WYOXEdNGfRoI7PgUp2OgBCNwwIET0yQHaq',
        '0902345678',
        'USER'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174002',
        'Lê Hoàng',
        'Cường',
        'lehoangcuong@email.com',
        '$2a$10$uoFlu1wCn9crWU7G/I2WYOXEdNGfRoI7PgUp2OgBCNwwIET0yQHaq',
        '0903456789',
        'USER'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174003',
        'Phạm Thị',
        'Dung',
        'phamthidung@email.com',
        '$2a$10$uoFlu1wCn9crWU7G/I2WYOXEdNGfRoI7PgUp2OgBCNwwIET0yQHaq',
        '0904567890',
        'USER'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174004',
        'Hoàng Văn',
        'Em',
        'hoangvanem@email.com',
        '$2a$10$uoFlu1wCn9crWU7G/I2WYOXEdNGfRoI7PgUp2OgBCNwwIET0yQHaq',
        '0905678901',
        'USER'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174005',
        'Đỗ Thị',
        'Hoa',
        'dothihoa@email.com',
        '$2a$10$uoFlu1wCn9crWU7G/I2WYOXEdNGfRoI7PgUp2OgBCNwwIET0yQHaq',
        '0906789012',
        'DOCTOR'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174006',
        'Vũ Văn',
        'Phong',
        'vuvanphong@email.com',
        '$2a$10$uoFlu1wCn9crWU7G/I2WYOXEdNGfRoI7PgUp2OgBCNwwIET0yQHaq',
        '0907890123',
        'DOCTOR'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174007',
        'Bùi Thị',
        'Yến',
        'buithiyen@email.com',
        '$2a$10$uoFlu1wCn9crWU7G/I2WYOXEdNGfRoI7PgUp2OgBCNwwIET0yQHaq',
        '0908901234',
        'DOCTOR'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174008',
        'Phan Văn',
        'Tài',
        'phanvantai@email.com',
        '$2a$10$uoFlu1wCn9crWU7G/I2WYOXEdNGfRoI7PgUp2OgBCNwwIET0yQHaq',
        '0909012345',
        'DOCTOR'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174009',
        'Nguyễn Thị',
        'Mai',
        'nguyenthimai@email.com',
        '$2a$10$uoFlu1wCn9crWU7G/I2WYOXEdNGfRoI7PgUp2OgBCNwwIET0yQHaq',
        '090123456',
        'DOCTOR'
    );

-- Insert sample addresses
INSERT INTO
    `Addresses` (
        `AddressLine`,
        `City`,
        `ProvinceState`,
        `Country`
    )
VALUES (
        '123 Đường Lê Lợi',
        'Hà Nội',
        'Thủ đô',
        'Việt Nam'
    ),
    (
        '456 Phố Trần Hưng Đạo',
        'Hồ Chí Minh',
        'TP',
        'Việt Nam'
    ),
    (
        '789 Đường Nguyễn Trãi',
        'Đà Nẵng',
        'TP',
        'Việt Nam'
    ),
    (
        '321 Phố Lý Thường Kiệt',
        'Hải Phòng',
        'TP',
        'Việt Nam'
    ),
    (
        '654 Đường Hùng Vương',
        'Cần Thơ',
        'TP',
        'Việt Nam'
    ),
    (
        '987 Phố Nguyễn Huệ',
        'Nha Trang',
        'Khánh Hòa',
        'Việt Nam'
    ),
    (
        '147 Đường Pasteur',
        'Vũng Tàu',
        'Bà Rịa - Vũng Tàu',
        'Việt Nam'
    ),
    (
        '258 Phố Lê Duẩn',
        'Huế',
        'Thừa Thiên Huế',
        'Việt Nam'
    ),
    (
        '369 Đường 3/2',
        'Biên Hòa',
        'Đồng Nai',
        'Việt Nam'
    ),
    (
        '741 Phố Quang Trung',
        'Thanh Hóa',
        'TP',
        'Việt Nam'
    );

-- Insert sample patients
INSERT INTO
    `Patients` (
        `UserId`,
        `CitizenId`,
        `AGE`,
        `Gender`,
        `EmergencyName`,
        `AddressId`,
        `EmergencyPhone`,
        `DateOfBirth`
    )
VALUES (
        '123e4567-e89b-12d3-a456-426614174000',
        '012345678901',
        35,
        'Nam',
        'Nguyễn Thị Mai',
        1,
        '0912345678',
        '1988-05-15'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174001',
        '012345678902',
        28,
        'Nữ',
        'Trần Văn Bắc',
        2,
        '0923456789',
        '1995-11-2'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174002',
        '012345678903',
        42,
        'Nam',
        'Lê Thị Nga',
        3,
        '0934567890',
        '1981-03-08'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174003',
        '012345678904',
        31,
        'Nữ',
        'Phạm Văn Cường',
        4,
        '0945678901',
        '1992-09-17'
    ),
    (
        '123e4567-e89b-12d3-a456-426614174004',
        '012345678905',
        55,
        'Nam',
        'Hoàng Thị Lan',
        5,
        '0956789012',
        '1968-12-03'
    );

-- Insert sample doctors
INSERT INTO
    `Doctors` (
        `UserId`,
        `CitizenId`,
        `LicenseNumber`,
        `ConsultationFee`,
        `Specialization`,
        `HospitalDepartmentId`
    )
VALUES (
        '123e4567-e89b-12d3-a456-426614174005',
        '012345678906',
        'BS001234',
        30000.00,
        'Nội khoa',
        1
    ),
    (
        '123e4567-e89b-12d3-a456-426614174006',
        '012345678907',
        'BS002345',
        350000.00,
        'Ngoại khoa',
        2
    ),
    (
        '123e4567-e89b-12d3-a456-426614174007',
        '012345678908',
        'BS003456',
        400000.00,
        'Nhi khoa',
        3
    ),
    (
        '123e4567-e89b-12d3-a456-426614174008',
        '012345678909',
        'BS004567',
        320000.00,
        'Sản phụ khoa',
        4
    ),
    (
        '123e4567-e89b-12d3-a456-426614174009',
        '012345678910',
        'BS005678',
        280000.00,
        'Tai mũi họng',
        5
    );

-- Insert sample hospitals
INSERT INTO
    `Hospitals` (
        `HospitalID`,
        `Name`,
        `Type`,
        `Address`,
        `Hotline`,
        `Email`,
        `OpenTime`,
        `CloseTime`
    )
VALUES (
        1,
        'Bệnh viện Bạch Mai',
        'Công lập',
        '78 Giải Phóng, Phương Mai, Đống Đa, Hà Nội',
        '19001533',
        'benhvienbachmai@hanoi.vn',
        '06:00:00',
        '22:00:00'
    ),
    (
        2,
        'Bệnh viện Chợ Rẫy',
        'Công lập',
        '201B Nguyễn Chí Thanh, Phường 12, Quận 5, TP.HCM',
        '0283854137',
        'benhvienchoray@tphcm.vn',
        '05:30:00',
        '22:30:00'
    ),
    (
        3,
        'Bệnh viện Đà Nẵng',
        'Công lập',
        '124 Hùng Vương, Hải Châu, Đà Nẵng',
        '02363822000',
        'benhviendanang@danang.vn',
        '06:00:00',
        '21:00:00'
    ),
    (
        4,
        'Bệnh viện Hữu Nghị Việt Đức',
        'Công lập',
        '16 Phủ Doãn, Hàng Bông, Hoàn Kiếm, Hà Nội',
        '02438211595',
        'benhvienhieunghi@hanoi.vn',
        '05:30:00',
        '22:00:00'
    ),
    (
        5,
        'Bệnh viện Nhi Đồng 1',
        'Công lập',
        '341 Sư Vạn Hạnh, Phường 10, Quận 10, TP.HCM',
        '02838667127',
        'benhviennhidong1@tphcm.vn',
        '06:00:00',
        '20:00:00'
    );

-- Insert sample medical departments
INSERT INTO
    `MedicalDepartments` (
        `DepartmentID`,
        `Name`,
        `Description`,
        `HeadOfDepartment`,
        `Phone`,
        `Email`
    )
VALUES (
        1,
        'Nội khoa',
        'Khoa chuyên điều trị các bệnh nội khoa như tim mạch, tiêu hóa, hô hấp...',
        'GS.TS Nguyễn Văn A',
        '02438693824',
        'noikhoa@benhvienbachmai.vn'
    ),
    (
        2,
        'Ngoại khoa',
        'Khoa chuyên phẫu thuật và điều trị các bệnh lý ngoại khoa',
        'PGS.TS Trần Thị B',
        '02438693825',
        'ngoikhoa@benhvienbachmai.vn'
    ),
    (
        3,
        'Nhi khoa',
        'Khoa chuyên chăm sóc và điều trị cho trẻ em',
        'TS.BS Lê Văn C',
        '02838667128',
        'nhikhoa@benhviennhidong1.vn'
    ),
    (
        4,
        'Sản phụ khoa',
        'Khoa chuyên chăm sóc sức khỏe sinh sản và sản khoa',
        'GS.BS Phạm Thị D',
        '02838554138',
        'sanphukhoa@benhvienchoray.vn'
    ),
    (
        5,
        'Tai mũi họng',
        'Khoa chuyên điều trị các bệnh lý về tai mũi họng',
        'TS.BS Hoàng Văn E',
        '02363822001',
        'taimuihong@benhviendanang.vn'
    ),
    (
        6,
        'Mắt',
        'Khoa chuyên điều trị các bệnh lý về mắt',
        'PGS.BS Đỗ Thị F',
        '02438693826',
        'mat@benhvienbachmai.vn'
    ),
    (
        7,
        'Da liễu',
        'Khoa chuyên điều trị các bệnh lý về da',
        'TS.BS Vũ Văn G',
        '02838554139',
        'dalieu@benhvienchoray.vn'
    ),
    (
        8,
        'Răng hàm mặt',
        'Khoa chuyên điều trị các bệnh lý về răng miệng',
        'BS.CKII Bùi Thị H',
        '02363822002',
        'ranghammat@benhviendanang.vn'
    );

-- Insert sample hospital departments
INSERT INTO
    `HospitalDepartments` (
        `HospitalDepartmentId`,
        `HospitalId`,
        `DepartmentId`,
        `Address`
    )
VALUES (
        1,
        1,
        1,
        'Tầng 3, Khoa Nội, Bệnh viện Bạch Mai'
    ),
    (
        2,
        1,
        2,
        'Tầng 4, Khoa Ngoại, Bệnh viện Bạch Mai'
    ),
    (
        3,
        5,
        3,
        'Tầng 2, Khoa Nhi, Bệnh viện Nhi Đồng 1'
    ),
    (
        4,
        2,
        4,
        'Tầng 5, Khoa Sản, Bệnh viện Chợ Rẫy'
    ),
    (
        5,
        3,
        5,
        'Tầng 3, Khoa Tai Mũi Họng, Bệnh viện Đà Nẵng'
    ),
    (
        6,
        1,
        6,
        'Tầng 2, Khoa Mắt, Bệnh viện Bạch Mai'
    ),
    (
        7,
        2,
        7,
        'Tầng 6, Khoa Da Liễu, Bệnh viện Chợ Rẫy'
    ),
    (
        8,
        3,
        8,
        'Tầng 4, Khoa Răng Hàm Mặt, Bệnh viện Đà Nẵng'
    );

-- Insert sample appointments
INSERT INTO
    `Appointments` (
        `AppointmentID`,
        `PatientId`,
        `DoctorId`,
        `ScheduleDate`,
        `ScheduleTime`,
        `EndTime`,
        `Status`,
        `Note`,
        `HospitalDepartmentId`
    )
VALUES (
        1,
        '123e4567-e89b-12d3-a456-42661417400',
        '123e4567-e89b-12d3-a456-426614174005',
        '2025-11-15',
        '09:00:00',
        '09:30:00',
        'Scheduled',
        'Khám tổng quát',
        1
    ),
    (
        2,
        '123e4567-e89b-12d3-a456-426614174001',
        '123e4567-e89b-12d3-a456-426614174006',
        '2025-11-16',
        '10:00:00',
        '10:30:00',
        'Scheduled',
        'Tái khám sau phẫu thuật',
        2
    ),
    (
        3,
        '123e4567-e89b-12d3-a456-426614174002',
        '123e4567-e89b-12d3-a456-426614174007',
        '2025-11-17',
        '14:00',
        '14:30:00',
        'Scheduled',
        'Trẻ bị sốt cao',
        3
    ),
    (
        4,
        '123e4567-e89b-12d3-a456-426614174003',
        '123e4567-e89b-12d3-a456-426614174008',
        '2025-11-18',
        '15:00:00',
        '15:30:00',
        'Scheduled',
        'Khám thai định kỳ',
        4
    ),
    (
        5,
        '123e4567-e89b-12d3-a456-426614174004',
        '123e4567-e89b-12d3-a456-426614174009',
        '2025-11-19',
        '08:00:00',
        '08:30:00',
        'Scheduled',
        'Đau họng kéo dài',
        5
    );

-- Insert sample conditions
INSERT INTO
    `Conditions` (
        `ConditionName`,
        `Description`,
        `Type`
    )
VALUES (
        'Cảm cúm',
        'Bệnh nhiễm virus đường hô hấp',
        'Bệnh thông thường'
    ),
    (
        'Viêm họng',
        'Viêm nhiễm ở cổ họng',
        'Bệnh tai mũi họng'
    ),
    (
        'Viêm phổi',
        'Nhiễm trùng phổi',
        'Bệnh hô hấp'
    ),
    (
        'Tiểu đường',
        'Bệnh rối loạn chuyển hóa glucose',
        'Bệnh mãn tính'
    ),
    (
        'Tăng huyết áp',
        'Huyết áp cao',
        'Bệnh tim mạch'
    ),
    (
        'Viêm gan B',
        'Viêm gan do virus B',
        'Bệnh gan'
    ),
    (
        'Viêm khớp',
        'Viêm ở các khớp',
        'Bệnh xương khớp'
    ),
    (
        'Viêm dạ dày',
        'Viêm niêm mạc dạ dày',
        'Bệnh tiêu hóa'
    ),
    (
        'Viêm da',
        'Viêm nhiễm da',
        'Bệnh da liễu'
    ),
    (
        'Viêm amidan',
        'Viêm amidan',
        'Bệnh tai mũi họng'
    );

-- Insert sample patient conditions
INSERT INTO
    `PatientConditions` (`PatientId`, `ConditionID`)
VALUES (
        '123e4567-e89b-12d3-a456-426614174000',
        1
    ),
    (
        '123e4567-e89b-12d3-a456-426614174001',
        2
    ),
    (
        '123e4567-e89b-12d3-a456-426614174002',
        3
    ),
    (
        '123e4567-e89b-12d3-a456-426614174003',
        4
    ),
    (
        '123e4567-e89b-12d3-a456-426614174004',
        5
    );

-- Insert sample doctor availabilities
INSERT INTO
    `DoctorAvailabilities` (
        `DoctorId`,
        `AvailableDate`,
        `StartTime`,
        `EndTime`,
        `HospitalDepartmentId`
    )
VALUES (
        '123e4567-e89b-12d3-a456-426614174005',
        '2025-11-15',
        '08:00:00',
        '17:00:00',
        1
    ),
    (
        '123e4567-e89b-12d3-a456-426614174006',
        '2025-11-16',
        '09:00:00',
        '18:00:00',
        2
    ),
    (
        '123e4567-e89b-12d3-a456-426614174007',
        '2025-11-17',
        '08:30:00',
        '16:30:00',
        3
    ),
    (
        '123e4567-e89b-12d3-a456-426614174008',
        '2025-11-18',
        '10:00:00',
        '19:00:00',
        4
    ),
    (
        '123e4567-e89b-12d3-a456-426614174009',
        '2025-11-19',
        '07:00:00',
        '15:00:00',
        5
    );

-- Insert sample reviews
INSERT INTO
    `Reviews` (
        `Rating`,
        `Comment`,
        `PatientId`,
        `DoctorId`
    )
VALUES (
        5,
        'Bác sĩ rất tận tâm và chuyên nghiệp',
        '123e4567-e89b-12d3-a456-426614174000',
        '123e4567-e89b-12d3-a456-426614174005'
    ),
    (
        4,
        'Khá hài lòng với dịch vụ khám bệnh',
        '123e4567-e89b-12d3-a456-426614174001',
        '123e4567-e89b-12d3-a456-426614174006'
    ),
    (
        5,
        'Bác sĩ rất nhẹ nhàng và chu đáo với trẻ nhỏ',
        '123e4567-e89b-12d3-a456-426614174002',
        '123e4567-e89b-12d3-a456-426614174007'
    ),
    (
        4,
        'Khám kỹ lưỡng, tư vấn chu đáo',
        '123e4567-e89b-12d3-a456-426614174003',
        '123e4567-e89b-12d3-a456-426614174008'
    ),
    (
        5,
        'Chuẩn đoán chính xác, điều trị hiệu quả',
        '123e4567-e89b-12d3-a456-426614174004',
        '123e4567-e89b-12d3-a456-426614174009'
    );

-- Insert sample patient insurances
INSERT INTO
    `PatientInsurances` (
        `InsuranceId`,
        `PatientId`,
        `ProviderName`,
        `ExpiryDate`,
        `Type`
    )
VALUES (
        'BH00123456',
        '123e4567-e89b-12d3-a456-426614174000',
        'Bảo hiểm xã hội Việt Nam',
        '2026-12-31',
        'Bảo hiểm y tế'
    ),
    (
        'BH00234567',
        '123e4567-e89b-12d3-a456-426614174001',
        'Bảo hiểm xã hội Việt Nam',
        '2026-11-30',
        'Bảo hiểm y tế'
    ),
    (
        'BH00345678',
        '123e4567-e89b-12d3-a456-426614174002',
        'Bảo hiểm xã hội Việt Nam',
        '2027-01-31',
        'Bảo hiểm y tế'
    ),
    (
        'BH00456789',
        '123e4567-e89b-12d3-a456-426614174003',
        'Bảo hiểm xã hội Việt Nam',
        '2026-10-31',
        'Bảo hiểm y tế'
    ),
    (
        'BH00567890',
        '123e4567-e89b-12d3-a456-426614174004',
        'Bảo hiểm xã hội Việt Nam',
        '2027-02-28',
        'Bảo hiểm y tế'
    );

-- Insert sample treated by relationships
INSERT INTO
    `TreatedBy` (`ConditionID`, `DepartmentID`)
VALUES (1, 1), -- Cảm cúm - Nội khoa
    (2, 5), -- Viêm họng - Tai mũi họng
    (3, 1), -- Viêm phổi - Nội khoa
    (4, 1), -- Tiểu đường - Nội khoa
    (5, 1), -- Tăng huyết áp - Nội khoa
    (6, 1), -- Viêm gan B - Nội khoa
    (7, 2), -- Viêm khớp - Ngoại khoa
    (8, 1), -- Viêm dạ dày - Nội khoa
    (9, 6), -- Viêm da - Da liễu
    (10, 5);
-- Viêm amidan - Tai mũi họng