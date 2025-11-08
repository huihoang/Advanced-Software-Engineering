import { appointmentsAPI } from "@/api";
import { QUERY_KEY } from "@/constants";
import { t } from "@/utils/i18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMessage, useUser } from "../common";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { success } = useMessage();

  const mutation = useMutation({
    mutationFn: appointmentsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_DOCTOR, user?.id],
      });
      success(t("appointmentCreatedSuccess"));
    },
  });

  return mutation;
};
