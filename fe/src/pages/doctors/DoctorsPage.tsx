import { useState } from "react";
import {
  Input,
  Card,
  Typography,
  Empty,
  Row,
  Col,
  Spin,
  Space,
  Flex,
} from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { DepartmentSlider, DepartmentSelect } from "@/components/doctors";
import { DateFilter } from "@/components/custom";
import { useGetAllDoctors } from "@/hooks/doctors";
import { PATH } from "@/constants";

const { Title, Text } = Typography;

const DoctorsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const departmentIdFromQuery = searchParams.get("departmentId");
  const [searchName, setSearchName] = useState("");
  const [filterDate, setFilterDate] = useState<Date | null>();
  const [filterDepartmentId, setFilterDepartmentId] = useState<number>(
    departmentIdFromQuery ? +departmentIdFromQuery : undefined
  );

  const { data: doctors = [], isLoading } = useGetAllDoctors(
    searchName,
    null,
    filterDate
  );

  const filteredDoctors = doctors.filter((doc) => {
    const matchesName = `${doc.firstName} ${doc.lastName}`
      .toLowerCase()
      .includes(searchName.toLowerCase());

    const matchesDepartmentFromQuery = departmentIdFromQuery
      ? doc.department?.id === parseInt(departmentIdFromQuery)
      : true;

    const matchesDepartmentFromSelect = filterDepartmentId
      ? doc.department?.id === filterDepartmentId
      : true;

    return (
      matchesName && matchesDepartmentFromQuery && matchesDepartmentFromSelect
    );
  });
  const departments = Array.from(
    new Set(filteredDoctors.map((d) => d.department?.name).filter(Boolean))
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
        Tìm kiếm bác sĩ
      </Title>

      <Card className="!mb-8 !rounded-2xl shadow-sm border-0">
        <Flex gap="middle" wrap="wrap" justify="center" align="center">
          <div>
            <Text type="secondary" className="block mb-2">
              Chọn ngày khám
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
              Khoa / Chuyên khoa
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
              Tìm kiếm bác sĩ
            </Text>
            <Input.Search
              placeholder="Nhập tên bác sĩ..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={(value) => setSearchName(value)}
            />
          </div>
        </Flex>
      </Card>

      {/* Nếu chưa tìm kiếm → hiển thị slider */}
      {searchName.trim() === "" ? (
        <Space direction="vertical" size={30} className="w-full">
          {departments.map((dept) => (
            <DepartmentSlider
              key={dept}
              dept={dept || ""}
              doctors={filteredDoctors.filter(
                (d) => d.department?.name === dept
              )}
            />
          ))}
        </Space>
      ) : (
        <>
          {filteredDoctors.length > 0 ? (
            <Row gutter={[16, 16]}>
              {filteredDoctors.map((doctor) => (
                <Col xs={24} sm={12} md={8} lg={6} key={doctor.userId}>
                  <Card
                    hoverable
                    onClick={() => navigate(PATH.DOCTOR_PROFILE(doctor.userId))}
                    className="text-center shadow"
                  >
                    <Title level={5}>
                      {doctor.firstName} {doctor.lastName}
                    </Title>
                    <Text type="secondary">{doctor.department?.name}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty description="Không tìm thấy bác sĩ nào" className="mt-10" />
          )}
        </>
      )}
    </div>
  );
};

export default DoctorsPage;
