import axiosClient from "@/utils/axios-client";
import type { LoginReqDto, LoginResDto, RegisterReqDto } from "@/types/dto";

export const authAPI = {
  login(payload: LoginReqDto): Promise<LoginResDto> {
    // return axiosClient.post("/auth/login", payload);
    return new Promise<LoginResDto>((resolve) => {
      setTimeout(
        () =>
          resolve({ accessToken: "accessToken", refreshToken: "refreshToken" }),
        1000
      );
    });
  },
  register(payload: RegisterReqDto): Promise<RegisterReqDto> {
    return axiosClient.post("/auth/register", payload);
  },
  logout(): Promise<boolean> {
    return axiosClient.post("/auth/logout");
    // logout(): Promise<any> {
    //   // return axiosClient.post("/auth/logout");
    //   return new Promise((resolve) => setTimeout(resolve, 1000));
  },
};
