import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doctorsAPI } from "@/api/doctors";
import type { UpdateDoctorDto } from "@/types/dto";
import { QUERY_KEY } from "@/constants";
import { useMessage, useUser } from "@/hooks/common";

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  const { success, error } = useMessage();
  const { user } = useUser();

  return useMutation({
    mutationFn: (payload: UpdateDoctorDto) => doctorsAPI.updateMe(payload),
    onSuccess: () => {
      success("Profile updated successfully!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_DOCTOR, user.id],
      });
    },
    onError: () => {
      error("Failed to update profile. Please try again.");
    },
  });
};
