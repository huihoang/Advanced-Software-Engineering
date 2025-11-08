import { PATH } from "@/constants";
import type { DoctorDto } from "@/types/dto";
import { t } from "@/utils/i18n";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Rate,
  Space,
  Typography,
  theme,
} from "antd";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const { Title, Text } = Typography;

type PropsType = {
  dept: string;
  doctors: DoctorDto[];
};

const DepartmentSlider = ({ dept, doctors }: PropsType) => {
  const navigate = useNavigate();
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { token } = theme.useToken();

  const isAtStart = currentSlide === 0;
  const isAtEnd = currentSlide >= doctors.length - 4;

  return (
    <Card className="mb-8 !rounded-3xl shadow-sm border-0">
      <Flex align="center" justify="space-between" className="!mb-2">
        <Title level={3} className="m-0" style={{ color: token.colorPrimary }}>
          {dept}
        </Title>
        <Space>
          <Button
            shape="circle"
            size="large"
            icon={<LeftOutlined />}
            disabled={isAtStart}
            onClick={() => sliderRef.current?.slickPrev()}
            style={{
              opacity: isAtStart ? 0.3 : 1,
            }}
          />
          <Button
            shape="circle"
            size="large"
            icon={<RightOutlined />}
            disabled={isAtEnd}
            onClick={() => sliderRef.current?.slickNext()}
            style={{
              opacity: isAtEnd ? 0.3 : 1,
            }}
          />
        </Space>
      </Flex>

      <Slider
        ref={sliderRef}
        dots={false}
        infinite={false}
        slidesToShow={4}
        slidesToScroll={1}
        afterChange={(index: number) => setCurrentSlide(index)}
        responsive={[
          { breakpoint: 1280, settings: { slidesToShow: 3 } },
          { breakpoint: 1024, settings: { slidesToShow: 2 } },
          { breakpoint: 768, settings: { slidesToShow: 1 } },
        ]}
      >
        {doctors.map((doctor) => (
          <div key={doctor.userId} className="p-6">
            <Card
              hoverable
              onClick={() => navigate(PATH.DOCTOR_PROFILE(doctor.userId))}
              className="rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-1 !transition-all !duration-300 border-0 cursor-pointer"
              styles={{ body: { padding: "24px" } }}
            >
              <Space
                direction="vertical"
                size="middle"
                className="w-full"
                align="center"
              >
                <Avatar
                  size={100}
                  src={doctor.image || "/images/doctor.png"}
                  alt={`${doctor.firstName} ${doctor.lastName}`}
                  style={{
                    border: `4px solid ${token.colorPrimary}`,
                    boxShadow: `0 4px 12px ${token.colorPrimary}33`,
                  }}
                />

                <div className="text-center w-full">
                  <Title
                    level={5}
                    className="mb-1 !mt-0"
                    style={{ color: token.colorText }}
                  >
                    Dr. {doctor.firstName} {doctor.lastName}
                  </Title>

                  {doctor.consultationFee && (
                    <div
                      className="mt-3 pt-3"
                      style={{ borderTop: `1px solid ${token.colorBorder}` }}
                    >
                      <Text type="secondary" className="text-xs">
                        {t("consultationFee")}
                      </Text>
                      <div>
                        <Text
                          strong
                          style={{ color: token.colorPrimary, fontSize: 16 }}
                        >
                          ${doctor.consultationFee}
                        </Text>
                      </div>
                    </div>
                  )}
                </div>
              </Space>
            </Card>
          </div>
        ))}
      </Slider>
    </Card>
  );
};

export default DepartmentSlider;
