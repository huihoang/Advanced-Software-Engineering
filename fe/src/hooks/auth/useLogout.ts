import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { authAPI } from "@/api/auth";

import { PATH, TOKEN_NAME } from "@/constants";
import { removeCookie } from "@/utils/cookie-actions";

export function useLogout() {
  const navigate = useNavigate();

  const mutation = useMutation({
    // mutationFn: authAPI.logout,
    mutationFn: async () => {},
    onSuccess: () => {
      removeCookie(TOKEN_NAME.ACCESS_TOKEN);
      navigate(PATH.LOGIN);
    },
  });

  return mutation;
}
