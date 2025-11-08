import { appointmentsAPI } from "@/api";
import { QUERY_KEY } from "@/constants";
import { t } from "@/utils/i18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMessage, useUser } from "../common";

export const useCancelAppointment = (id: number) => {
  const queryClient = useQueryClient();
  const { success } = useMessage();

  const mutation = useMutation({
    mutationFn: () => appointmentsAPI.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_APPOINTMENT, id],
      });
      success(t("appointmentCanceled"));
    },
  });

  return mutation;
};
