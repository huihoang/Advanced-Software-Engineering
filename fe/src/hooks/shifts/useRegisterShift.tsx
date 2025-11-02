import { shiftsAPI } from "@/api";
import { QUERY_KEY } from "@/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../common";

export const useRegisterShift = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const mutation = useMutation({
    mutationFn: shiftsAPI.register,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_DOCTOR, user?.id],
      }),
  });

  return mutation;
};
