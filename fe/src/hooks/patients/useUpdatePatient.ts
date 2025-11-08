import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patientsAPI } from "@/api/patients";
import type { UpdatePatientDto } from "@/types/dto";
import { QUERY_KEY } from "@/constants";
import { useMessage, useUser } from "@/hooks/common";

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  const { success, error } = useMessage();
  const { user } = useUser();

  return useMutation({
    mutationFn: (payload: UpdatePatientDto) => patientsAPI.updateMe(payload),
    onSuccess: () => {
      success("Profile updated successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_PATIENT, user.id],
      });
    },
    onError: () => {
      error("Failed to update profile. Please try again.");
    },
  });
};
