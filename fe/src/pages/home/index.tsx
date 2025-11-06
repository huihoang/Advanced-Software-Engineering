import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { Typography, Button, Input, Card, Rate } from "antd";
import { LeftOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import { homeAPI } from "@/api/homePage";
import type { DoctorDto } from "@/types/dto";
import "./home.css";

const { Title, Text } = Typography;

const HomePage = () => {
  const [departments, setDepartments] = useState<{ id: number; name: string }[]>([]);
  const [clinics, setClinics] = useState<{ id: number; name: string; address: string }[]>([]);
  const [doctors, setDoctors] = useState<DoctorDto[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const sliderDept = useRef<Slider>(null);
  const sliderClinic = useRef<Slider>(null);
  const sliderDoctor = useRef<Slider>(null);

  useEffect(() => {
    (async () => {
      const [dept, clinic, featured] = await Promise.all([
        homeAPI.getDepartments(),
        homeAPI.getClinics(),
        homeAPI.getFeaturedDoctors(),
      ]);
      setDepartments(dept);
      setClinics(clinic);
      setDoctors(featured.doctors);
    })();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const filteredDepartments = departments.filter((d) =>
    d.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredClinics = clinics.filter((c) =>
    c.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredDoctors = doctors.filter((doc) =>
    `${doc.firstName} ${doc.lastName}`.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="homepage">
      {/* 🌟 HERO SECTION */}
      <div className="hero">
        <Title level={2}>
          Nền tảng đặt lịch khám bệnh
        </Title>
        <Input.Search
          placeholder="Tìm bác sỹ, chuyên khoa, cơ sở y tế..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="max-w-lg w-full"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* 🔹 Chuyên khoa */}
      <section className="section">
        <div className="section-header">
          <Title level={3}>Chuyên khoa</Title>
          <div className="nav-btns">
            <Button shape="circle" icon={<LeftOutlined />} onClick={() => sliderDept.current?.slickPrev()} />
            <Button shape="circle" icon={<RightOutlined />} onClick={() => sliderDept.current?.slickNext()} />
          </div>
        </div>
        <Slider ref={sliderDept} {...sliderSettings}>
          {filteredDepartments.map((dept) => (
            <div key={dept.id} className="slide-item">
              {/* <img src={`/images/departments/${dept.id}.png`} alt={dept.name} /> */}
              <img src={`/public/images/dep.png`} alt={dept.name} />
              <Text>{dept.name}</Text>
            </div>
          ))}
        </Slider>
      </section>

      {/* 🔹 Cơ sở y tế */}
      <section className="section">
        <div className="section-header">
          <Title level={3}>Cơ sở y tế</Title>
          <div className="nav-btns">
            <Button shape="circle" icon={<LeftOutlined />} onClick={() => sliderClinic.current?.slickPrev()} />
            <Button shape="circle" icon={<RightOutlined />} onClick={() => sliderClinic.current?.slickNext()} />
          </div>
        </div>
        <Slider ref={sliderClinic} {...sliderSettings}>
          {filteredClinics.map((clinic) => (
            <div key={clinic.id} className="slide-item">
              {/* <img src={`/images/clinics/${clinic.id}.png`} alt={clinic.name} /> */}
              <img src={`/public/images/csyt.png`} alt={clinic.name} />
              <Text>{clinic.name}</Text>
              <p className="address">{clinic.address}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* 🔹 Bác sĩ nổi bật */}
      <section className="section">
        <div className="section-header">
          <Title level={3}>Bác sĩ nổi bật</Title>
          <div className="nav-btns">
            <Button shape="circle" icon={<LeftOutlined />} onClick={() => sliderDoctor.current?.slickPrev()} />
            <Button shape="circle" icon={<RightOutlined />} onClick={() => sliderDoctor.current?.slickNext()} />
          </div>
        </div>
        <Slider ref={sliderDoctor} {...sliderSettings}>
          {filteredDoctors.map((doc) => (
            <div key={doc.userId} className="slide-item doctor-card">
              <Card hoverable bordered={false}>
                <img
                  // src={`/images/doctors/${doc.userId}.png`}
                  src={`/public/images/doctor.png`}
                  alt={`${doc.firstName} ${doc.lastName}`}
                  className="doctor-img"
                />
                <Title level={5}>
                  {doc.firstName} {doc.lastName}
                </Title>
                <Text type="secondary">{doc.department?.name}</Text>
              </Card>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default HomePage;
