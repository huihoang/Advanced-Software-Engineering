import axiosClient from "@/utils/axios-client";
import type { ShiftDto } from "@/types/dto";

import _ from "lodash";

const mockShifts: ShiftDto[] = [
  { id: 1, date: "2025-11-03", time: "09:00 - 10:00" },
  { id: 2, date: "2025-11-03", time: "10:00 - 11:00" },
  { id: 3, date: "2025-11-03", time: "11:00 - 12:00" },
  { id: 4, date: "2025-11-03", time: "14:00 - 15:00" },
  { id: 5, date: "2025-11-03", time: "15:00 - 16:00" },
  { id: 6, date: "2025-11-03", time: "16:00 - 17:00" },
  { id: 7, date: "2025-11-04", time: "09:00 - 10:00" },
  { id: 8, date: "2025-11-04", time: "10:00 - 11:00" },
  { id: 9, date: "2025-11-04", time: "11:00 - 12:00" },
  { id: 10, date: "2025-11-04", time: "14:00 - 15:00" },
  { id: 11, date: "2025-11-04", time: "15:00 - 16:00" },
  { id: 12, date: "2025-11-04", time: "16:00 - 17:00" },
  { id: 13, date: "2025-11-05", time: "09:00 - 10:00" },
  { id: 14, date: "2025-11-05", time: "10:00 - 11:00" },
  { id: 15, date: "2025-11-05", time: "11:00 - 12:00" },
  { id: 16, date: "2025-11-05", time: "14:00 - 15:00" },
  { id: 17, date: "2025-11-05", time: "15:00 - 16:00" },
  { id: 18, date: "2025-11-05", time: "16:00 - 17:00" },
  { id: 19, date: "2025-11-06", time: "09:00 - 10:00" },
  { id: 20, date: "2025-11-06", time: "10:00 - 11:00" },
  { id: 21, date: "2025-11-06", time: "11:00 - 12:00" },
  { id: 22, date: "2025-11-06", time: "14:00 - 15:00" },
  { id: 23, date: "2025-11-06", time: "15:00 - 16:00" },
  { id: 24, date: "2025-11-06", time: "16:00 - 17:00" },
];

export const shiftsAPI = {
  getAll(date: Date): Promise<ShiftDto[]> {
    // return axiosClient.get("/shifts");
    return new Promise((resolve) => setTimeout(() => resolve(mockShifts), 500));
  },
  register(id: number): Promise<any> {
    // return axiosClient.post("/appointments", { shiftId: id });
    return new Promise((resolve) =>
      setTimeout(() => resolve("Shift registered successfully"), 500)
    );
  },
  unregister(id: number): Promise<any> {
    // return axiosClient.delete("/appointments", { params: { shiftId: id } });
    return new Promise((resolve) =>
      setTimeout(() => resolve("Shift unregistered"), 500)
    );
  },
};
