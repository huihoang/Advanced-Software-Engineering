import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { AllDoctorsDto } from "@/types/dto";
import { doctorsAPI } from "@/api";
import { PAGE_LIMIT, QUERY_KEY } from "@/constants";

const useGetAllDoctor = (pagination: { page: number; limit?: number }) => {
  const page = pagination.page ?? 1;
  const limit = pagination.limit ?? PAGE_LIMIT;

  const queryObject = useQuery<AllDoctorsDto>({
    queryKey: [QUERY_KEY.GET_ALL_DOCTORS, { page, limit }],
    queryFn: async () => await doctorsAPI.getAll(page, limit),

    placeholderData: keepPreviousData,
  });

  return queryObject;
};

export default useGetAllDoctor;
