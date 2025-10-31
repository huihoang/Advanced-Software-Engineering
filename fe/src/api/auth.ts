import axiosClient from "@/utils/axios-client";
import type { LoginReqDto, LoginResDto } from "@/types/dto";

export const authAPI = {
  login(payload: LoginReqDto): Promise<LoginResDto> {
    return axiosClient.post("/auth/login", payload);
  },
  logout(): Promise<boolean> {
    return axiosClient.post("/auth/logout");
  },
};
