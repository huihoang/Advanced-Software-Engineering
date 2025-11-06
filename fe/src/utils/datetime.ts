import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

import { DATE_FORMAT_UI } from "@/constants";

export const getFormattedDate = (
  date: Date | string,
  format: string = DATE_FORMAT_UI
): string => dayjs(date).format(format);
