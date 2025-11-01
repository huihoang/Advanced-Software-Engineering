import type { AppointmentStatus } from "../common";

export type Shift = {
  id: number;
  time: string;
  date: string;
  status: AppointmentStatus;
};
