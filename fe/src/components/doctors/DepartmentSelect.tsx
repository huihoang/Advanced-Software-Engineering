import { Select, Spin } from "antd";
import { useGetAllDepartments } from "@/hooks/doctors";
import { t } from "@/utils/i18n";

type PropsType = {
  value?: number | string;
  onChange?: (departmentId: number) => void;
  disabled?: boolean;
  allowClear?: boolean;
};

const DepartmentSelect = ({
  value,
  onChange,
  disabled = false,
  allowClear = true,
}: PropsType) => {
  const { data: departments = [], isLoading } = useGetAllDepartments();

  const options = departments.map((dept) => ({
    label: dept.name,
    value: dept.id,
  }));

  return (
    <Select
      loading={isLoading}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={t("selectDepartment")}
      disabled={disabled || isLoading}
      allowClear={allowClear}
      size="large"
      style={{ minWidth: "200px" }}
    />
  );
};

export default DepartmentSelect;
