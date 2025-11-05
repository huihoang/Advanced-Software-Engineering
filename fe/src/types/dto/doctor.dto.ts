import type { UserDto } from "./user.dto";

export type DoctorDto = UserDto & {
  bio?: string;
  licenseNumber?: string;
  citizen: { id: string; name: string };
  specialization: { id: number; name: string };
  consultationFee?: number;
  rating?: number;
};

export type AllDoctorsDto = {
  total: number;
  doctors: DoctorDto[];
};
