import type { AppointmentDto } from "./appointment.dto";
import type { UserDto } from "./user.dto";

export type DoctorDto = UserDto & {
  bio?: string;
  licenseNumber?: string;
  citizen: { id: string; name: string };
  department: { id: number; name: string };
  consultationFee?: number;
  rating?: number;
  appointments: AppointmentDto[];
  clinicInfo: { id: number; name: string; address: string };
};

export type AllDoctorsDto = {
  total: number;
  doctors: DoctorDto[];
};
