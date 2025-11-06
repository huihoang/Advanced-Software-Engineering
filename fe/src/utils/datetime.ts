import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import { DATE_FORMAT_UI } from "@/constants";

export const getFormattedDate = (
  date: Date | string,
  format: string = DATE_FORMAT_UI
): string => dayjs(date).format(format);

export const isTimeRangeValid = (
  startTime: string | null,
  endTime: string | null
): boolean => {
  if (!startTime || !endTime) return false;
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  if (eh > sh) return true;
  if (eh === sh && em > sm) return true;
  return false;
};
