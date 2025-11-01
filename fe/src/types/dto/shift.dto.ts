import type { AppointmentStatus } from "../common";

export type ShiftDto = {
  id: number;
  time: string;
  date: string;
  status: AppointmentStatus;
};
