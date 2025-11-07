import { useState } from "react";
import { Input, Card, Typography, Empty, Row, Col, Spin, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { DepartmentSlider } from "@/components/doctors";
import { useGetAllDoctors } from "@/hooks/doctors";
import { PATH } from "@/constants";

const { Title, Text } = Typography;

const mockDoctors = [
  { id: 1, name: "Dr. Nguyen An", department: "Tim mạch", experience: 10 },
  { id: 2, name: "Dr. Tran Binh", department: "Nhi khoa", experience: 5 },
  { id: 1, name: "Dr. Nguyen An", department: "Tim mạch", experience: 10 },
  { id: 2, name: "Dr. Tran Binh", department: "Nhi khoa", experience: 5 },
  { id: 1, name: "Dr. Nguyen An", department: "Tim mạch", experience: 10 },
  { id: 2, name: "Dr. Tran Binh", department: "Nhi khoa", experience: 5 },
  { id: 1, name: "Dr. Nguyen An", department: "Tim mạch", experience: 10 },
  { id: 2, name: "Dr. Tran Binh", department: "Nhi khoa", experience: 5 },
  { id: 1, name: "Dr. Nguyen An", department: "Tim mạch", experience: 10 },
  { id: 2, name: "Dr. Tran Binh", department: "Nhi khoa", experience: 5 },
  { id: 3, name: "Dr. Le Trang", department: "Da liễu", experience: 8 },
  { id: 4, name: "Dr. Phạm Thị D", department: "Thần kinh", experience: 12 },
  { id: 5, name: "Dr. Hoàng Anh", department: "Tim mạch", experience: 7 },
  { id: 6, name: "Dr. Mai Lan", department: "Nhi khoa", experience: 6 },
  { id: 7, name: "Dr. Phạm Quang", department: "Da liễu", experience: 4 },
  { id: 8, name: "Dr. Trần Thị H", department: "Thần kinh", experience: 9 },
];
type Doctor = {
  id: number;
  name: string;
  department: string;
  experience: number;
}

interface DepartmentSliderProps {
  dept: string;
  doctors: Doctor[];
  onNavigate: (id: number) => void;
}

// 🧱 Component con: Slider cho từng chuyên khoa
const DepartmentSlider: React.FC<DepartmentSliderProps> = ({ dept, doctors, onNavigate }) => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentSlide(index),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const isAtStart = currentSlide === 0;
  const isAtEnd = currentSlide >= doctors.length - 3;

  return (
    <div key={dept} className="relative mb-12">
      <div className="flex items-center justify-between mb-4">
        <Title level={4} className="m-0">
          {dept}
        </Title>
        <div className="space-x-2">
          {!isAtStart && (
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              onClick={() => sliderRef.current?.slickPrev()}
            />
          )}
          {!isAtEnd && (
            <Button
              shape="circle"
              icon={<RightOutlined />}
              onClick={() => sliderRef.current?.slickNext()}
            />
          )}
        </div>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {doctors.map((doctor: Doctor) => (
          <div key={doctor.id} className="px-2">
            <Card
              hoverable
              onClick={() => onNavigate(doctor.id)}
              className="text-center shadow-md"
            >
              <Title level={5} className="mb-1">
                {doctor.name}
              </Title>
              <Text type="secondary">{doctor.department}</Text>
              <br />
              <Text>{doctor.experience} năm kinh nghiệm</Text>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

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
