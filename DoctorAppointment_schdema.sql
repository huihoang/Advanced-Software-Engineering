-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: DoctorAppointment
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Addresses`
--

DROP TABLE IF EXISTS `Addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Addresses` (
  `AddressId` int NOT NULL AUTO_INCREMENT,
  `AddressLine` varchar(255) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `ProvinceState` varchar(100) DEFAULT NULL,
  `Country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`AddressId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Appointments`
--

DROP TABLE IF EXISTS `Appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Conditions`
--

DROP TABLE IF EXISTS `Conditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Conditions` (
  `ConditionID` int NOT NULL AUTO_INCREMENT,
  `ConditionName` varchar(150) DEFAULT NULL,
  `Description` tinytext,
  `Type` tinytext,
  PRIMARY KEY (`ConditionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `DoctorAvailabilities`
--

DROP TABLE IF EXISTS `DoctorAvailabilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Doctors`
--

DROP TABLE IF EXISTS `Doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Doctors` (
  `UserId` varchar(36) NOT NULL,
  `CitizenId` varchar(50) DEFAULT NULL,
  `LicenseNumber` varchar(50) DEFAULT NULL,
  `ConsultationFee` decimal(10,2) DEFAULT NULL,
  `Specialization` varchar(100) DEFAULT NULL,
  `HospitalDepartmentId` int DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `CitizenId` (`CitizenId`),
  KEY `FK7ihu3iwvx1lil0mmnvm2q34gm` (`HospitalDepartmentId`),
  CONSTRAINT `Doctors_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE,
  CONSTRAINT `FK7ihu3iwvx1lil0mmnvm2q34gm` FOREIGN KEY (`HospitalDepartmentId`) REFERENCES `HospitalDepartments` (`HospitalDepartmentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `HospitalDepartments`
--

DROP TABLE IF EXISTS `HospitalDepartments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HospitalDepartments` (
  `HospitalDepartmentId` int NOT NULL AUTO_INCREMENT,
  `HospitalId` int NOT NULL,
  `DepartmentId` int NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`HospitalDepartmentId`),
  UNIQUE KEY `unique_hospital_department` (`HospitalId`,`DepartmentId`),
  KEY `DepartmentId` (`DepartmentId`),
  CONSTRAINT `HospitalDepartments_ibfk_1` FOREIGN KEY (`HospitalId`) REFERENCES `Hospitals` (`HospitalID`) ON DELETE CASCADE,
  CONSTRAINT `HospitalDepartments_ibfk_2` FOREIGN KEY (`DepartmentId`) REFERENCES `MedicalDepartments` (`DepartmentID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Hospitals`
--

DROP TABLE IF EXISTS `Hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MedicalDepartments`
--

DROP TABLE IF EXISTS `MedicalDepartments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MedicalDepartments` (
  `DepartmentID` int NOT NULL,
  `Name` varchar(150) DEFAULT NULL,
  `Description` tinytext,
  `HeadOfDepartment` varchar(100) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`DepartmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PatientConditions`
--

DROP TABLE IF EXISTS `PatientConditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PatientConditions` (
  `PatientConditionID` int NOT NULL AUTO_INCREMENT,
  `PatientId` varchar(36) NOT NULL,
  `ConditionID` int NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`PatientConditionID`),
  UNIQUE KEY `unique_patient_condition` (`PatientId`,`ConditionID`),
  KEY `ConditionID` (`ConditionID`),
  CONSTRAINT `PatientConditions_ibfk_1` FOREIGN KEY (`PatientId`) REFERENCES `Patients` (`UserId`) ON DELETE CASCADE,
  CONSTRAINT `PatientConditions_ibfk_2` FOREIGN KEY (`ConditionID`) REFERENCES `Conditions` (`ConditionID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PatientInsurances`
--

DROP TABLE IF EXISTS `PatientInsurances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PatientInsurances` (
  `InsuranceId` varchar(50) NOT NULL,
  `PatientId` varchar(36) DEFAULT NULL,
  `ProviderName` varchar(100) DEFAULT NULL,
  `ExpiryDate` date DEFAULT NULL,
  `Type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`InsuranceId`),
  KEY `PatientId` (`PatientId`),
  CONSTRAINT `PatientInsurances_ibfk_1` FOREIGN KEY (`PatientId`) REFERENCES `Patients` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Patients`
--

DROP TABLE IF EXISTS `Patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TreatedBy`
--

DROP TABLE IF EXISTS `TreatedBy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TreatedBy` (
  `ConditionID` int NOT NULL,
  `DepartmentID` int NOT NULL,
  PRIMARY KEY (`ConditionID`,`DepartmentID`),
  KEY `DepartmentID` (`DepartmentID`),
  CONSTRAINT `TreatedBy_ibfk_1` FOREIGN KEY (`ConditionID`) REFERENCES `Conditions` (`ConditionID`) ON DELETE CASCADE,
  CONSTRAINT `TreatedBy_ibfk_2` FOREIGN KEY (`DepartmentID`) REFERENCES `MedicalDepartments` (`DepartmentID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `UserId` varchar(36) NOT NULL DEFAULT (uuid()),
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `Email` varchar(150) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `Role` tinytext NOT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-07 23:49:11
