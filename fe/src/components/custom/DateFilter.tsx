import { DATE_FORMAT_DTO } from "@/constants";
import { getFormattedDate } from "@/utils/datetime";
import { Select } from "antd";
import { t } from "@/utils/i18n";

type PropsType = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  size?: "small" | "middle" | "large";
  days?: number;
  allowClear?: boolean;
  placeholder?: string;
};

function labelFor(d: Date) {
  const weekday = d.toLocaleDateString(undefined, { weekday: "short" });
  const day = d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
  });
  return `${weekday} - ${day}`;
}

const DateFilter = ({
  value,
  onChange,
  size = "middle",
  days = 7,
  allowClear = false,
}: PropsType) => {
  const options: { value: string | null; label: string }[] = [];

  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    options.push({
      value: getFormattedDate(date, DATE_FORMAT_DTO),
      label: labelFor(date),
    });
  }

  return (
    <Select
      size={size}
      options={options}
      placeholder={t("selectDate")}
      value={value ? getFormattedDate(value, DATE_FORMAT_DTO) : null}
      onChange={(val) => onChange(val ? new Date(val) : null)}
      allowClear={allowClear}
      style={{ minWidth: 160 }}
      showSearch={false}
    />
  );
};
export default DateFilter;
