import { useQuery } from "@tanstack/react-query";

import type { AppointmentDetailDto } from "@/types/dto";
import { appointmentsAPI } from "@/api";

import { QUERY_KEY } from "@/constants";

export function useGetAllAppointments(
  doctorId: string = "",
  patientId: string = ""
) {
  const queryObject = useQuery<AppointmentDetailDto[]>({
    queryKey: [QUERY_KEY.GET_ALL_APPOINTMENTS, doctorId, patientId],
    queryFn: async () => await appointmentsAPI.getAll(doctorId, patientId),
  });

  return queryObject;
}
