import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { authAPI } from "@/api";
import { PATH, TOKEN_NAME } from "@/constants";
import { useUser } from "@/hooks/common";
import { setTokenCookie } from "@/utils/cookie-actions";
import { authAPI } from "@/api";
export function useLogin() {
  const navigate = useNavigate();

  const { setUser } = useUser();

  const mutation = useMutation({
    // Giả lập API login
    mutationFn: (payload: LoginReqDto) =>
      new Promise<{ access_token: string; role: "doctor" | "patient" }>((resolve) => {
        setTimeout(() => {
          if (payload.username.toLowerCase().includes("doc"))
            resolve({ access_token: "doctor_token", role: "doctor" });
          else
            resolve({ access_token: "patient_token", role: "patient" });
        }, 1000);
      }),

    onSuccess: (data) => {
      // Lưu token và role
      setTokenCookie(TOKEN_NAME.ACCESS_TOKEN, data.access_token);
      localStorage.setItem("role", data.role);

      // Điều hướng theo quyền
      if (data.role === "doctor") navigate(PATH.HOME || "/");
      else navigate(PATH.HOME || "/");
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return mutation;
}
