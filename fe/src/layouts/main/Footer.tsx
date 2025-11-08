import { Button, Col, Flex, Row, Typography, theme } from "antd";
import {
  CalendarOutlined,
  CustomerServiceOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { t } from "@/utils/i18n";

const { Title, Paragraph, Text } = Typography;

const Footer = () => {
  const { token } = theme.useToken();

  return (
    <footer className="footer">
      <div
        style={{
          backgroundColor: token.colorPrimaryBg,
          color: token.colorText,
          padding: "60px 20px 30px",
        }}
      >
        {/* FOOTER MAIN CONTENT */}
        <Row gutter={[32, 32]} style={{ maxWidth: "1300px", margin: "0 auto" }}>
          {/* COMPANY INFO */}
          <Col xs={24} sm={12} md={8}>
            <Title
              level={4}
              className="text-left !mb-4"
              style={{ color: token.colorPrimary }}
            >
              {t("footerAboutUs")}
            </Title>
            <Paragraph
              className="text-left !mb-4"
              style={{ color: token.colorTextSecondary }}
            >
              {t("footerAboutDesc")}
            </Paragraph>
            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              <Button
                type="text"
                style={{ color: token.colorPrimary }}
                size="small"
                icon={<FacebookOutlined />}
              />
              <Button
                type="text"
                style={{ color: token.colorPrimary }}
                size="small"
                icon={<TwitterOutlined />}
              />
              <Button
                type="text"
                style={{ color: token.colorPrimary }}
                size="small"
                icon={<LinkedinOutlined />}
              />
            </div>
          </Col>

          {/* QUICK LINKS */}
          <Col xs={24} sm={12} md={8}>
            <Title
              level={4}
              className="text-left"
              style={{ color: token.colorPrimary, marginBottom: 16 }}
            >
              {t("footerQuickLinks")}
            </Title>
            <Flex vertical gap={8}>
              <Button
                type="text"
                style={{
                  color: token.colorLink,
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}
              >
                {t("footerFindDoctor")}
              </Button>
              <Button
                type="text"
                style={{
                  color: token.colorLink,
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}
              >
                {t("footerBookAppointment")}
              </Button>
              <Button
                type="text"
                style={{
                  color: token.colorLink,
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}
              >
                {t("footerHelp")}
              </Button>
            </Flex>
          </Col>

          {/* CONTACT INFO */}
          <Col xs={24} sm={12} md={8}>
            <Title
              level={4}
              style={{ color: token.colorPrimary, marginBottom: 16 }}
            >
              {t("footerContact")}
            </Title>
            <Flex vertical gap={12} justify="flex-start">
              <div>
                <Text strong style={{ color: token.colorText }}>
                  <EnvironmentOutlined style={{ marginRight: "8px" }} />
                  {t("footerAddress")}:
                </Text>
                <Paragraph
                  className="mt-2"
                  style={{ color: token.colorTextSecondary }}
                >
                  {t("footerAddressValue")}
                </Paragraph>
              </div>
              <div>
                <Text strong style={{ color: token.colorText }}>
                  <PhoneOutlined style={{ marginRight: "8px" }} />
                  {t("footerHotline")}:
                </Text>
                <Paragraph
                  style={{ color: token.colorPrimary, marginTop: "4px" }}
                >
                  1900 9999
                </Paragraph>
              </div>
              <div>
                <Text strong style={{ color: token.colorText }}>
                  <MailOutlined style={{ marginRight: "8px" }} />
                  {t("footerEmail")}:
                </Text>
                <Paragraph
                  style={{ color: token.colorPrimary, marginTop: "4px" }}
                >
                  support@clinic.vn
                </Paragraph>
              </div>
            </Flex>
          </Col>
        </Row>

        {/* FOOTER BOTTOM */}
        <div
          style={{
            borderTop: `1px solid ${token.colorBorder}`,
            marginTop: "40px",
            paddingTop: "20px",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Text
                style={{ color: token.colorTextSecondary, fontSize: "13px" }}
              >
                {t("footerCopyright")}
              </Text>
            </Col>
            <Col xs={24} md={12}>
              <Text
                style={{ color: token.colorTextSecondary, fontSize: "13px" }}
              >
                {t("footerTagline")}
              </Text>
            </Col>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
