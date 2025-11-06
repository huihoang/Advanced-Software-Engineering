import { useState } from "react";
import { Input, Card, Typography, Empty, Row, Col, Spin, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { DepartmentSlider } from "@/components/doctors";
import { useGetAllDoctors } from "@/hooks/doctors";
import { PATH } from "@/constants";

const { Title, Text } = Typography;

const DoctorsPage = () => {
  const [searchName, setSearchName] = useState("");
  const [page] = useState(1);
  const navigate = useNavigate();

  const { data: doctors = [], isLoading } = useGetAllDoctors({ page });

  const filteredDoctors = doctors.filter((doc) =>
    `${doc.firstName} ${doc.lastName}`
      .toLowerCase()
      .includes(searchName.toLowerCase())
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
        Tìm kiếm bác sĩ
      </Title>

      <div className="flex justify-center mb-8">
        <Input.Search
          placeholder="Nhập tên bác sĩ..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="max-w-lg w-full"
          onSearch={(value) => setSearchName(value)}
        />
      </div>

      {/* Nếu chưa tìm kiếm → hiển thị slider */}
      {searchName.trim() === "" ? (
        <Space direction="vertical" size={30} className="w-full">
          {departments.map((dept) => (
            <DepartmentSlider
              key={dept}
              dept={dept || ""}
              doctors={doctors.filter((d) => d.department?.name === dept)}
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
