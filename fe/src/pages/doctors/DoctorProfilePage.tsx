import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Image,
  Rate,
  Row,
  Space,
  Spin,
  Typography,
  theme,
  Tag,
  Flex,
} from "antd";
import {
  ArrowLeftOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Descriptions } from "antd";
import { useGetDoctor } from "@/hooks/doctors";
import { formatCurrency } from "@/utils/common";
import { t } from "@/utils/i18n";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const { data: doctor, isLoading, isError } = useGetDoctor(id || "");

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
        {t("back")}
      </Button>

      {isError || !doctor ? (
        <Card className="!mt-4">{t("doctorNotFound")}</Card>
      ) : (
        <Card className="!mt-4">
          <Row gutter={24}>
            <Col xs={24} sm={8} md={6} lg={6}>
              <Flex vertical align="center" className="items-center">
                <Image
                  src={doctor.image || "/images/doctor.png"}
                  width={160}
                  height={160}
                  preview={false}
                  className="rounded-full object-cover"
                />
                <Typography.Title
                  level={4}
                  style={{ color: token.colorPrimary }}
                  className="mt-4"
                >
                  {doctor.firstName} {doctor.lastName}
                </Typography.Title>
                <Typography.Text type="secondary">
                  {doctor.specialization?.name}
                </Typography.Text>

                <div className="mt-3">
                  <Rate disabled allowHalf defaultValue={doctor.rating ?? 0} />
                </div>

                {doctor.consultationFee != null && (
                  <Tag color="gold" className="mt-3">
                    {t("consultationFee")}:{" "}
                    {formatCurrency(doctor.consultationFee)}
                  </Tag>
                )}
              </Flex>
            </Col>

            <Col xs={24} sm={16} md={18} lg={18}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <div>
                  <Typography.Title level={5}>{t("about")}</Typography.Title>
                  <Typography.Paragraph>
                    {doctor.bio ?? t("noBiography")}
                  </Typography.Paragraph>
                </div>

                <Row gutter={20}>
                  <Col xs={24} sm={12}>
                    <Typography.Title level={5}>
                      {t("professionalInfo")}
                    </Typography.Title>
                    <Descriptions column={1} bordered size="small">
                      <Descriptions.Item label={t("license")}>
                        {doctor.licenseNumber ?? "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("citizen")}>
                        {doctor.citizen?.name ?? "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("department")}>
                        {doctor.specialization?.name ?? "N/A"}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Typography.Title level={5}>
                      {t("contact")}
                    </Typography.Title>
                    <Descriptions column={1} bordered size="small">
                      <Descriptions.Item label={t("email")}>
                        <MailOutlined className="mr-2" /> {doctor.email}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("phone")}>
                        <PhoneOutlined className="mr-2" /> {doctor.phoneNumber}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Space>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default DoctorProfilePage;
