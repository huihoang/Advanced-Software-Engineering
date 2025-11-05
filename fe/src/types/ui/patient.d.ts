import type { Gender } from "../common";
import type { User } from "./user";

export type Patient = User & {
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
