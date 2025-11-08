import { authAPI } from "@/api";
import { PATH } from "@/constants";
import { t } from "@/utils/i18n";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export function useDoctorRegister() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: authAPI.doctorRegister,
    onSuccess: (data) => {
      message.success(t("registerSuccess"));
      navigate(PATH.LOGIN);
    },
  });

  return mutation;
}
