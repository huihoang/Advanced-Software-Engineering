export type DoctorDto = {
  id: number;
  image?: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  bio?: string;
  province: string;
  rating?: number;
};

export type AllDoctorsDto = {
  total: number;
  doctors: DoctorDto[];
};
