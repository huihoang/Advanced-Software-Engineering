import type { UserDto } from "./user.dto";

export type DoctorDto = UserDto & {
  id: string;
  bio?: string;
  licenseNumber?: string;
  citizen: { id: string; name: string };
  department: { id: number; name: string };
  consultationFee?: number;
  clinicInfo: { id: number; name: string; address: string };
};

export type AllDoctorsDto = {
  total: number;
  doctors: DoctorDto[];
};

export type DepartmentDto = {
  id: number;
  name: string;
};
