import axiosClient from "@/utils/axios-client";
import type { LoginReqDto, LoginResDto, RegisterReqDto } from "@/types/dto";
import { register } from "module";

export const authAPI = {
  login(payload: LoginReqDto): Promise<LoginResDto> {
    return axiosClient.post("/auth/login", payload);
  },
  register(payload: RegisterReqDto): Promise<RegisterReqDto> {
    return axiosClient.post("/auth/register", payload);
  },
  logout(): Promise<boolean> {
    return axiosClient.post("/auth/logout");
  },
};
