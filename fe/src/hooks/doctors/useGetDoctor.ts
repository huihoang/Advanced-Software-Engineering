import { useQuery } from "@tanstack/react-query";

import type { DoctorDto } from "@/types/dto";
import { doctorsAPI } from "@/api";

import { QUERY_KEY } from "@/constants";

export function useGetDoctor(id: number | string) {
  const queryObject = useQuery<DoctorDto>({
    queryFn: () => doctorsAPI.getById(+id),
    queryKey: [QUERY_KEY.GET_DOCTOR, id],
  });

  return queryObject;
}
