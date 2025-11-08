import { useQuery } from "@tanstack/react-query";
import { doctorsAPI } from "@/api";
import { QUERY_KEY } from "@/constants";

export function useGetAllDepartments() {
  const queryObject = useQuery({
    queryKey: [QUERY_KEY.DEPARTMENTS],
    queryFn: () => doctorsAPI.getAllDepartments(),
  });

  return queryObject;
}
