import type { ShiftDto } from "./shift.dto";
import type { UserDto } from "./user.dto";

export type DoctorDto = UserDto & {
  bio?: string;
  licenseNumber?: string;
  citizen: { id: string; name: string };
  specialization: { id: number; name: string };
  consultationFee?: number;
  rating?: number;
  shifts: ShiftDto[];
  clinicInfo: { id: number; name: string; address: string };
};

export type AllDoctorsDto = {
  total: number;
  doctors: DoctorDto[];
};
