import { DateFilter } from "@/components/custom";
import { DepartmentSelect, DepartmentSlider } from "@/components/doctors";
import { useGetAllDoctors } from "@/hooks/doctors";
import { t } from "@/utils/i18n";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Flex, Input, Space, Spin, theme, Typography } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const { Title, Text } = Typography;

const DoctorsPage = () => {
  const [searchParams] = useSearchParams();
  const departmentIdFromQuery = searchParams.get("departmentId");
  const { token } = theme.useToken();
  const [searchName, setSearchName] = useState("");
  const [filterDate, setFilterDate] = useState<Date | null>();
  const [filterDepartmentId, setFilterDepartmentId] = useState<number | string>(
    departmentIdFromQuery ? +departmentIdFromQuery : undefined
  );

  const { data: doctors = [], isLoading } = useGetAllDoctors(
    searchName,
    filterDepartmentId,
    filterDate
  );

  const departments = Array.from(
    new Set(doctors.map((d) => d.department?.name).filter(Boolean))
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <Title level={2} className="text-center mb-8">
        {t("searchDoctors")}
      </Title>

      <Card className="!mb-8 !rounded-2xl shadow-sm border-0">
        <Flex gap="middle" wrap="wrap" justify="center" align="center">
          <div>
            <Text type="secondary" className="block mb-2">
              {t("selectAppointmentDate")}
            </Text>
            <DateFilter
              value={filterDate}
              onChange={setFilterDate}
              size="large"
              allowClear
            />
          </div>

          <div>
            <Text type="secondary" className="block mb-2">
              {t("departmentSpecialty")}
            </Text>
            <DepartmentSelect
              value={filterDepartmentId}
              onChange={setFilterDepartmentId}
              allowClear
            />
          </div>

          <div
            className="flex-1"
            style={{ minWidth: "300px", maxWidth: "500px" }}
          >
            <Text type="secondary" className="block mb-2">
              {t("searchDoctors")}
            </Text>
            <Input.Search
              placeholder={t("searchDoctorPlaceholder")}
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
        </Flex>
      </Card>

      <Space direction="vertical" size={30} className="w-full">
        {departments.map((dept) => (
          <DepartmentSlider
            key={dept}
            dept={dept || ""}
            doctors={doctors.filter((d) => d.department?.name === dept)}
          />
        ))}
      </Space>
    </div>
  );
};

export default DoctorsPage;
