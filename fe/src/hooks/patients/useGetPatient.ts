import { patientsAPI } from "@/api";
import { QUERY_KEY } from "@/constants";
import type { PatientDetailDto } from "@/types/dto";
import { useQuery } from "@tanstack/react-query";

export const useGetPatient = (id: string | number) => {
  const queryObject = useQuery<PatientDetailDto>({
    queryKey: [QUERY_KEY.GET_PATIENT, +id],
    queryFn: () => patientsAPI.getById(+id),
  });

  return queryObject;
};
