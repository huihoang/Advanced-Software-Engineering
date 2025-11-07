import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { DoctorDto } from "@/types/dto";
import { doctorsAPI } from "@/api";
import { PAGE_LIMIT, QUERY_KEY } from "@/constants";

const useGetAllDoctors = (pagination: { page: number; limit?: number }) => {
  const page = pagination.page ?? 1;
  const limit = pagination.limit ?? PAGE_LIMIT;

  const queryObject = useQuery<DoctorDto[]>({
    queryKey: [QUERY_KEY.GET_ALL_DOCTORS, { page, limit }],
    queryFn: async () => await doctorsAPI.getAll(page, limit),

    placeholderData: keepPreviousData,
  });

  return queryObject;
};

export default useGetAllDoctors;
