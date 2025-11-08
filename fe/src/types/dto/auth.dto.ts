import type { UserRole } from "../common";

export type LoginReqDto = {
  email: string;
  password: string;
};

export type LoginResDto = {
  accessToken: string;
  refreshToken: string;
};

export type RegisterReqDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
};
