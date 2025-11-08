import { useQuery } from "@tanstack/react-query";

import type { AppointmentDetailDto } from "@/types/dto";
import { appointmentsAPI } from "@/api";

import { QUERY_KEY } from "@/constants";

export function useGetAppointment(id: number | string) {
  const queryObject = useQuery<AppointmentDetailDto>({
    queryKey: [QUERY_KEY.GET_APPOINTMENT, id],
    queryFn: async () => await appointmentsAPI.getById(+id),
  });

  return queryObject;
}
