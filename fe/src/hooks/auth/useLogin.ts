import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { PATH, TOKEN_NAME } from "@/constants";
import type { LoginReqDto } from "@/types/dto";
import { setTokenCookie } from "@/utils/cookie-actions";

export function useLogin() {
  const navigate = useNavigate();

  const mutation = useMutation({
    // mutationFn: authAPI.login,
    mutationFn: (payload: LoginReqDto) =>
      new Promise<{ access_token: string }>((resolve) => {
        setTimeout(() => resolve({ access_token: "token" }), 1000);
      }),
    onSuccess: (data) => {
      setTokenCookie(TOKEN_NAME.ACCESS_TOKEN, data.access_token);
      navigate(PATH.HOME);
    },
  });

  return mutation;
}
