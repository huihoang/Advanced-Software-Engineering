import type { Shift } from "./shift";
import type { User } from "./user";

export type Doctor = User & {
  bio?: string;
  licenseNumber?: string;
  citizen: { id: string; name: string };
  specialization: { id: number; name: string };
  consultationFee?: number;
  rating?: number;
  shifts: Shift[];
  clinicInfo: { id: number; name: string; address: string };
};

export type AllDoctors = {
  total: number;
  doctors: DoctorDto[];
};
