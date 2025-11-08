import type { AppointmentDto, UserDto } from ".";
import type { Gender } from "../common";

export type PatientDto = UserDto & {
  id: string;
  citizen: { id: string; name: string };
  specialization: { id: number; name: string };
  consultationFee?: number;
  emergencyName?: string;
  emergencyPhone?: string;
  gender?: Gender;
  address?: {
    addressLine: string;
    city: string;
    provinceState: string;
    country: string;
  };
};

export type PatientDetailDto = PatientDto & {
  appointments: AppointmentDto[];
};

export type UpdatePatientDto = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  emergencyName: string;
  emergencyPhone: string;
  gender: string;
};
