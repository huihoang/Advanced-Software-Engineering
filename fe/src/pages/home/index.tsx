import { Typography, Button, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom"; // ✅ thêm dòng này
import "./home.css";

const { Title, Paragraph, Text } = Typography;

const HomePage = () => {
  const navigate = useNavigate(); // ✅ tạo biến điều hướng

  return (
    <div className="homepage">
      {/* 🌟 HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <Title level={1}>Nền tảng Đặt Lịch Khám Trực Tuyến Toàn Diện</Title>
          <Paragraph>
            Giúp bạn dễ dàng tìm kiếm, đặt lịch và theo dõi quá trình khám chữa bệnh —
            mọi lúc, mọi nơi. Trải nghiệm dịch vụ y tế thông minh, tiện lợi và an toàn.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/doctors")}
          >
            Bắt đầu ngay
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
            <Title level={2}>Về Chúng Tôi</Title>
            <Paragraph>
              Chúng tôi xây dựng hệ thống giúp kết nối bệnh nhân với đội ngũ bác sĩ và
              cơ sở y tế hàng đầu, tối ưu hóa quy trình đăng ký, tư vấn, và đặt lịch.
            </Paragraph>
            <Paragraph>
              Nền tảng này được thiết kế dành cho mọi người — dễ sử dụng, bảo mật và
              minh bạch.
            </Paragraph>
          </Col>
        </Row>
      </section>

      {/* ⚙️ DỊCH VỤ */}
      <section className="service-section">
        <Title level={2} className="section-title">
          Dịch vụ nổi bật
        </Title>
        <Row gutter={[24, 24]}>
          {[
            {
              title: "Đặt lịch khám trực tuyến",
              img: "/images/service-booking.png",
              desc: "Đặt lịch nhanh chóng, theo dõi thông tin bác sĩ và lịch sử khám.",
            },
            {
              title: "Tư vấn sức khỏe từ xa",
              img: "/images/service-consult.png",
              desc: "Gặp bác sĩ qua video, nhận chẩn đoán và đơn thuốc điện tử.",
            },
            {
              title: "Quản lý hồ sơ y tế",
              img: "/images/service-record.png",
              desc: "Lưu trữ, tra cứu hồ sơ y tế của bạn một cách an toàn, tiện lợi.",
            },
          ].map((item, i) => (
            <Col xs={24} md={8} key={i}>
              <Card hoverable className="service-card" onClick={() => navigate("/doctors")} >
                <img src={item.img} alt={item.title} className="service-img" />
                <Title level={4}>{item.title}</Title>
                <Text>{item.desc}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* 👩‍⚕️ ĐỘI NGŨ BÁC SĨ */}
      <section className="team-section">
        <Title level={2} className="section-title">
          Đội ngũ bác sĩ tận tâm
        </Title>
        <Paragraph className="center-text">
          Gồm các chuyên gia hàng đầu trong nhiều lĩnh vực y tế khác nhau.
        </Paragraph>
        <Row gutter={[24, 24]} justify="center">
          {[1, 2, 3, 4].map((id) => (
            <Col xs={12} md={6} key={id}>
              <Card hoverable className="doctor-card" onClick={() => navigate("/doctors")} >
                <img
                  src={`/images/doctor.png`}
                  alt={`Bác sĩ ${id}`}
                  className="doctor-img"
                />
                <Title level={5}>Bác sĩ {id}</Title>
                <Text type="secondary">Chuyên khoa nội tổng quát</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </section>


      <footer className="footer">
        {/* 📞 LIÊN HỆ */}
        <section className="contact-section">
          <Title level={2}>Liên hệ với chúng tôi</Title>
          <Paragraph>
            Địa chỉ: 268 Lý Thường Kiệt, Q.10, TP. Hồ Chí Minh <br />
            Hotline: <Text strong>1900 9999</Text> — Email:{" "}
            <Text strong>support@clinic.vn</Text>
          </Paragraph>
          <Button type="primary" size="large">
            Gửi liên hệ
          </Button>
          <Text type="secondary"> GoodLuck to you.</Text>
        </section>


      </footer>
    </div>
  );
};

export default HomePage;
