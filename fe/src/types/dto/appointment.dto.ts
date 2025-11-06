import type { AppointmentStatus } from "../common";
import type { DoctorDto, PatientDto } from ".";

export type ShiftDto = {
  id: number;
  date: string;
  time: string;
};

export type AppointmentDto = {
  id: number;
  shift: ShiftDto;
  doctorId?: number;
  patientId?: number;
  status: AppointmentStatus;
};

export type AppointmentDetailDto = {
  id: number;
  shift: ShiftDto;
  doctor?: Pick<
    DoctorDto,
    | "userId"
    | "image"
    | "firstName"
    | "lastName"
    | "consultationFee"
    | "clinicInfo"
  >;
  patient?: Pick<
    PatientDto,
    | "userId"
    | "firstName"
    | "lastName"
    | "gender"
    | "email"
    | "phoneNumber"
    | "dateOfBirth"
  >;
  status: AppointmentStatus;
};
