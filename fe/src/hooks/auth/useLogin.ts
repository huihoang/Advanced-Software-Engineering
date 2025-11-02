import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { authAPI } from "@/api";
import { PATH, TOKEN_NAME } from "@/constants";
import { useUser } from "@/hooks/common";
import { setTokenCookie } from "@/utils/cookie-actions";

export function useLogin() {
  const navigate = useNavigate();

  const { setUser } = useUser();

  const mutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      setTokenCookie(TOKEN_NAME.ACCESS_TOKEN, data.accessToken);
      setUser({ id: 1, email: "a@gmail.com", role: "DOCTOR" });
      navigate(PATH.HOME);
    },
  });

  return mutation;
}
