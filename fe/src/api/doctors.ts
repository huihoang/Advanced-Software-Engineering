import type { DepartmentDto, DoctorDto, UpdateDoctorDto } from "@/types/dto";
import axiosClient from "@/utils/axios-client";

export const doctorsAPI = {
  getAll(
    search?: string,
    departmentId?: number | string,
    scheduleDate?: string
  ): Promise<DoctorDto[]> {
    return axiosClient.get("/doctors", {
      params: { search, departmentId, scheduleDate },
    });
  },
  getById(id: number | string): Promise<DoctorDto> {
    return axiosClient.get(`/doctors/${id}`);
  },
  getAllDepartments(): Promise<DepartmentDto[]> {
    return axiosClient.get("/departments");
  },
  updateMe(payload: UpdateDoctorDto): Promise<DoctorDto> {
    return axiosClient.put("/doctor/me", payload);
  },
};
