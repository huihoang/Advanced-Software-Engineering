import { Typography, Button, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { t } from "@/utils/i18n";
import "./home.css";

const { Title, Paragraph, Text } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* 🌟 HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <Title level={1}>{t("heroTitle")}</Title>
          <Paragraph>{t("heroDescription")}</Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/doctors")}
          >
            {t("getStarted")}
          </Button>
        </div>
        <img
          src="/images/hero-healthcare.png"
          alt="Healthcare illustration"
          className="hero-img"
        />
      </section>

      {/* ❤️ GIỚI THIỆU */}
      <section className="intro-section">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={12}>
            <img src="/images/dn.png" alt="Doctor team" className="intro-img" />
          </Col>
          <Col xs={24} md={12}>
            <Title level={2}>{t("aboutUs")}</Title>
            <Paragraph>{t("aboutDescription1")}</Paragraph>
            <Paragraph>{t("aboutDescription2")}</Paragraph>
          </Col>
        </Row>
      </section>

      {/* ⚙️ DỊCH VỤ */}
      <section className="service-section">
        <Title level={2} className="section-title">
          {t("featuredServices")}
        </Title>
        <Row gutter={[24, 24]}>
          {[
            {
              title: t("onlineBooking"),
              img: "/images/service-booking.png",
              desc: t("onlineBookingDesc"),
            },
            {
              title: t("telehealth"),
              img: "/images/service-consult.png",
              desc: t("telehealthDesc"),
            },
            {
              title: t("medicalRecords"),
              img: "/images/service-record.png",
              desc: t("medicalRecordsDesc"),
            },
          ].map((item, i) => (
            <Col xs={24} md={8} key={i}>
              <Card
                hoverable
                className="service-card"
                onClick={() => navigate("/doctors")}
              >
                <img src={item.img} alt={item.title} className="service-img" />
                <Title level={4}>{item.title}</Title>
                <Text>{item.desc}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default HomePage;
