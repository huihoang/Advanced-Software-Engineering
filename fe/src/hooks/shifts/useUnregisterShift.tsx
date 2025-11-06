import { shiftsAPI } from "@/api";
import { QUERY_KEY } from "@/constants";
import { t } from "@/utils/i18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMessage, useUser } from "../common";
import { useNavigate } from "react-router-dom";

export const useUnregisterShift = (appointmentId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { success } = useMessage();

  const mutation = useMutation({
    mutationFn: () => shiftsAPI.unregister(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_DOCTOR, user?.id],
      });
      success(t("shiftUnregistered"));
      navigate(-1);
    },
  });

  return mutation;
};
