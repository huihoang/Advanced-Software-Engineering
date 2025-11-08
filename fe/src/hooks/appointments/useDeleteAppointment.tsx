import { appointmentsAPI } from "@/api";
import { QUERY_KEY } from "@/constants";
import { t } from "@/utils/i18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useMessage, useUser } from "../common";

export const useDeleteAppointment = (appointmentId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { success } = useMessage();

  const mutation = useMutation({
    mutationFn: () => appointmentsAPI.delete(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_DOCTOR, user?.id],
      });
      success(t("appointmentDeleted"));
      navigate(-1);
    },
  });

  return mutation;
};
