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
    onSuccess: async (data) => {
      console.log("login data", data);
      setTokenCookie(TOKEN_NAME.ACCESS_TOKEN, data.accessToken);
      setTokenCookie(TOKEN_NAME.REFRESH_TOKEN, data.refreshToken);
      const user = await authAPI.getUser();
      setUser({ id: user.userId, role: user.role, email: user.email });
      navigate(PATH.HOME);
    },
  });

  return mutation;
}
