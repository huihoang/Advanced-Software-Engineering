import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { DoctorDto } from "@/types/dto";
import { doctorsAPI } from "@/api";
import { QUERY_KEY } from "@/constants";
import { getFormattedDate } from "@/utils/datetime";

export const useGetAllDoctors = (
  search?: string,
  departmentId?: string,
  scheduleDate?: Date
) => {
  const queryObject = useQuery<DoctorDto[]>({
    queryKey: [
      QUERY_KEY.GET_ALL_DOCTORS,
      search,
      departmentId,
      getFormattedDate(scheduleDate),
    ],
    queryFn: async () =>
      await doctorsAPI.getAll(search, departmentId, scheduleDate),

    placeholderData: keepPreviousData,
  });

  return queryObject;
};
