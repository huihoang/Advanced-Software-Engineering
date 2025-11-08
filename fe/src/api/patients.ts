import axiosClient from "@/utils/axios-client";
import type {
  PatientDetailDto,
  PatientDto,
  UpdatePatientDto,
} from "@/types/dto";

import _ from "lodash";

export const patientsAPI = {
  getAll(): Promise<PatientDto[]> {
    return axiosClient.get("/patients");
  },
  getById(id: string): Promise<PatientDetailDto> {
    return axiosClient.get(`/patients/${id}`);
  },
  updateMe(payload: UpdatePatientDto): Promise<PatientDto> {
    return axiosClient.put("/patients/me", payload);
  },
};
