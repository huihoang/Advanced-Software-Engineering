import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
  theme,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { t } from "@/utils/i18n";
import { useGetPatient } from "@/hooks/patients";
import type { AppointmentDto } from "@/types/dto";
import { PATH } from "@/constants";

const PatientProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const { data: patient, isLoading } = useGetPatient(id);

  const getStatusTag = (status: string) => {
    const statusConfig = {
      CONFIRMED: { color: "blue", label: t("confirmed") },
      PENDING: { color: "orange", label: t("pending") },
      COMPLETED: { color: "green", label: t("completed") },
      CANCELED: { color: "red", label: t("canceled") },
      AVAILABLE: { color: "default", label: t("available") },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      color: "default",
      label: status,
    };

    return <Tag color={config.color}>{config.label}</Tag>;
  };

  const columns = [
    {
      title: t("date"),
      dataIndex: ["shift", "date"],
      key: "date",
      render: (date: string) => (
        <Space>
          <CalendarOutlined />
          {new Date(date).toLocaleDateString()}
        </Space>
      ),
    },
    {
      title: t("time"),
      dataIndex: ["shift", "time"],
      key: "time",
      render: (time: string) => (
        <Space>
          <ClockCircleOutlined />
          {time}
        </Space>
      ),
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (status: string) => getStatusTag(status),
    },
    {
      title: "",
      key: "action",
      width: 100,
      render: (_: unknown, record: AppointmentDto) => (
        <Button
          type="link"
          onClick={() => navigate(PATH.APPOINTMENT_DETAIL(record.id))}
        >
          {t("viewDetails")}
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!patient) {
    return (
      <Space size="large" direction="vertical" className="mt-8 mb-20 w-full">
        <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
          {t("back")}
        </Button>
        <Card>
          <Typography.Text>{t("patientNotFound")}</Typography.Text>
        </Card>
      </Space>
    );
  }

  return (
    <Space size="large" direction="vertical" className="mt-8 mb-20 w-full">
      <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
        {t("back")}
      </Button>

      <Card>
        <Row gutter={24} className="py-2">
          <Col xs={24} sm={8} md={6} lg={6}>
            <div className="flex flex-col items-center">
              <div
                className="rounded-full flex items-center justify-center mb-4"
                style={{
                  width: 160,
                  height: 160,
                  background: token.colorPrimaryBg,
                  border: `2px solid ${token.colorPrimary}`,
                }}
              >
                <UserOutlined
                  style={{ fontSize: 64, color: token.colorPrimary }}
                />
              </div>
              <Typography.Title
                level={4}
                style={{ color: token.colorPrimary }}
                className="mt-4"
              >
                {patient.firstName} {patient.lastName}
              </Typography.Title>
              {patient.gender && (
                <Typography.Text type="secondary">
                  {t(patient.gender)}
                </Typography.Text>
              )}
            </div>
          </Col>

          <Col xs={24} sm={16} md={18} lg={18}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Row gutter={20}>
                <Col xs={24} sm={12}>
                  <Typography.Title level={5}>{t("contact")}</Typography.Title>
                  <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label={t("email")}>
                      <MailOutlined className="mr-2" /> {patient.email}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("phone")}>
                      <PhoneOutlined className="mr-2" /> {patient.phoneNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("dateOfBirth")}>
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("citizen")}>
                      {patient.citizen?.name ?? "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>

                <Col xs={24} sm={12}>
                  <Typography.Title level={5}>
                    {t("emergencyContact")}
                  </Typography.Title>
                  <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label={t("emergencyName")}>
                      {patient.emergencyName ?? "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("emergencyPhone")}>
                      {patient.emergencyPhone ?? "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>

              {patient.address && (
                <div>
                  <Typography.Title level={5}>{t("address")}</Typography.Title>
                  <Descriptions column={1} bordered size="small">
                    <Descriptions.Item label={t("addressLine")}>
                      {patient.address.addressLine}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("city")}>
                      {patient.address.city}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("provinceState")}>
                      {patient.address.provinceState}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("country")}>
                      {patient.address.country}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Appointment History */}
      <Card>
        <Typography.Title level={4} className="mb-4">
          {t("appointmentHistory")}
        </Typography.Title>
        {patient.appointments && patient.appointments.length > 0 ? (
          <Table
            dataSource={patient.appointments}
            columns={columns}
            rowKey="id"
          />
        ) : (
          <Typography.Text type="secondary">
            {t("noAppointments")}
          </Typography.Text>
        )}
      </Card>
    </Space>
  );
};

export default PatientProfilePage;
