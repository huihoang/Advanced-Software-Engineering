import axiosClient from "@/utils/axios-client";
import type { LoginReqDto, LoginResDto } from "@/types/dto";

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
  logout(): Promise<any> {
    // return axiosClient.post("/auth/logout");
    return new Promise((resolve) => setTimeout(resolve, 1000));
  },
};
