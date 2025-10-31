import axiosClient from "@/utils/axios-client";
import type { DoctorDto, AllDoctorsDto } from "@/types/dto";

import _ from "lodash";

export const doctorsAPI = {
  getAll(page: number, limit: number): Promise<AllDoctorsDto> {
    return axiosClient.get("/doctors", {
      params: { page, limit },
    });
  },
  getById(doctorId: number): Promise<DoctorDto> {
    return axiosClient.get(`/doctors/${doctorId}`);
  },
};
