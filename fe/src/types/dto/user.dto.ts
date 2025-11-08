import type { UserRole } from "../common";

export type UserDto = {
  userId: number;
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: string;
  role: UserRole;
};
