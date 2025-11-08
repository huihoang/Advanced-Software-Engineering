import axiosClient from "@/utils/axios-client";
import type {
  LoginReqDto,
  LoginResDto,
  RegisterReqDto,
  UserDto,
} from "@/types/dto";

export const authAPI = {
  login(payload: LoginReqDto): Promise<LoginResDto> {
    return axiosClient.post("/auth/login", payload);
  },
  doctorRegister(payload: RegisterReqDto): Promise<any> {
    return axiosClient.post("/auth/doctor/register", payload);
  },
  patientRegister(payload: RegisterReqDto): Promise<any> {
    return axiosClient.post("/auth/user/register", payload);
  },
  getUser(): Promise<UserDto> {
    return axiosClient.get("/auth/me");
  },
  logout(): Promise<boolean> {
    // return axiosClient.post("/auth/logout");
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
};
