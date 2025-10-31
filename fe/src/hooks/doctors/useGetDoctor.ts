import { useQuery } from "@tanstack/react-query";

import type { DoctorDto } from "@/types/dto";
import { doctorsAPI } from "@/api";

import { QUERY_KEY } from "@/constants";

export function useGetDoctor(doctorId: number | string) {
  const queryObject = useQuery<DoctorDto>({
    queryKey: [QUERY_KEY.GET_DOCTOR, doctorId],
    queryFn: async () => await doctorsAPI.getById(+doctorId),
  });

  return queryObject;
}
