import { authAPI } from "@/api/auth";
import { PATH, TOKEN_NAME } from "@/constants";
import { removeCookie } from "@/utils/cookie-actions";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "../common";

export function useLogout() {
  const navigate = useNavigate();
  const { clearUser } = useUser();

  const mutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      removeCookie(TOKEN_NAME.ACCESS_TOKEN);
      clearUser();
      navigate(PATH.LOGIN);
    },
  });

  return mutation;
}
