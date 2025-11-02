import type { AppointmentStatus } from "../common";
import type { Doctor, Patient } from ".";

export type Shift = {
  id: number;
  date: Date;
  time: string;
};

export type Appointment = {
  id: number;
  shift: Shift;
  doctorId?: number;
  patientId?: number;
  status: AppointmentStatus;
};

export type AppointmentDetail = {
  id: number;
  shift: Shift;
  doctor?: Pick<
    Doctor,
    | "userId"
    | "image"
    | "firstName"
    | "lastName"
    | "consultationFee"
    | "clinicInfo"
  >;
  patient?: Pick<
    Patient,
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
