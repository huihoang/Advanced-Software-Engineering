import { shiftsAPI } from "@/api";
import { QUERY_KEY } from "@/constants";
import type { ShiftDto } from "@/types/dto";
import { getFormattedDate } from "@/utils/datetime";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAllShifts = (date: Date) => {
  const queryObject = useQuery<ShiftDto[]>({
    queryKey: [QUERY_KEY.GET_ALL_SHIFTS, getFormattedDate(date)],
    queryFn: () => shiftsAPI.getAll(date),
    placeholderData: keepPreviousData,
  });

  return queryObject;
};
