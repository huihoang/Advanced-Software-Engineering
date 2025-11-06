import { DATE_FORMAT_DTO } from "@/constants";
import { getFormattedDate } from "@/utils/datetime";
import { Select } from "antd";

type PropsType = {
  value: Date;
  onChange: (date: Date) => void;
  days?: number;
};

function labelFor(d: Date) {
  const weekday = d.toLocaleDateString(undefined, { weekday: "short" });
  const day = d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
  });
  return `${weekday} - ${day}`;
}

const DateFilter = ({ value, onChange, days = 7 }: PropsType) => {
  const options: { value: string; label: string }[] = [];

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
      size="middle"
      options={options}
      value={getFormattedDate(value, DATE_FORMAT_DTO)}
      onChange={(val) => onChange(new Date(val))}
      style={{ minWidth: 160 }}
      showSearch={false}
    />
  );
};

export default DateFilter;
