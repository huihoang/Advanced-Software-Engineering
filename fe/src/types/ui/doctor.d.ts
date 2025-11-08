import type { Appointment } from "./appointment";
import type { User } from "./user";

export type Doctor = User & {
  bio?: string;
  licenseNumber?: string;
  citizen: { id: string; name: string };
  department: { id: number; name: string };
  consultationFee?: number;
  rating?: number;
  appointments: Appointment[];
  clinicInfo: { id: number; name: string; address: string };
};

export type AllDoctors = {
  total: number;
  doctors: DoctorDto[];
};
