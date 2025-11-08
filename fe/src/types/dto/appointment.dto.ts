import type { AppointmentStatus } from "../common";
import type { DoctorDto, PatientDto } from ".";

export type AppointmentDto = {
  id: number;
  doctorId?: number;
  patientId?: number;
  scheduleDate: string;
  scheduleTime: string;
  endTime: string;
  status: AppointmentStatus;
};

export type AppointmentDetailDto = {
  id: number;
  scheduleDate: string;
  scheduleTime: string;
  endTime: string;
  note?: string;
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
    | "id"
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

export type CreateAppointmentDto = {
  scheduleDate: Date;
  scheduleTime: string;
  endTime: string;
};

export type BookAppointmentDto = {
  note?: string;
};
