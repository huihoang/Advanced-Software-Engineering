import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { DoctorDto } from "@/types/dto";
import { doctorsAPI } from "@/api";
import { DATE_FORMAT_DTO, QUERY_KEY } from "@/constants";
import { getFormattedDate } from "@/utils/datetime";

export const useGetAllDoctors = (
  search?: string,
  departmentId?: number | string,
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
      await doctorsAPI.getAll(
        search,
        departmentId,
        scheduleDate ? getFormattedDate(scheduleDate, DATE_FORMAT_DTO) : null
      ),

    placeholderData: keepPreviousData,
  });

  return queryObject;
};
