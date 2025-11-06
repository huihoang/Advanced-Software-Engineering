import { appointmentsAPI } from "@/api";
import { QUERY_KEY } from "@/constants";
import { t } from "@/utils/i18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMessage, useUser } from "../common";

export const useCancelAppointment = (appointmentId: number) => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { success } = useMessage();

  const mutation = useMutation({
    mutationFn: () => appointmentsAPI.cancel(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_DOCTOR, user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_APPOINTMENT, appointmentId],
      });
      success(t("appointmentCanceled"));
    },
  });

  return mutation;
};
