import { PATH } from "@/constants";
import { useGetAppointment } from "@/hooks/appointments";
import type { AppointmentStatus } from "@/types/common";
import { formatCurrency } from "@/utils/common";
import { t } from "@/utils/i18n";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
  theme,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  CancelAppointmentButton,
  ConfirmAppointmentButton,
  UnregisterShiftButton,
} from "@/components/appointments";

const AppointmentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const { data: appointment, isLoading, isError } = useGetAppointment(id);

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!appointment || isError) {
    return (
      <Space size="large" direction="vertical" className="mt-8 mb-20 w-full">
        <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
          {t("back")}
        </Button>
        <Card>
          <Typography.Text>{t("appointmentNotFound")}</Typography.Text>
        </Card>
      </Space>
    );
  }

  const statusConfig: Record<
    AppointmentStatus,
    { color: string; border?: string; label: string }
  > = {
    CONFIRMED: { color: "blue", label: t("confirmed") },
    PENDING: { color: "warning", label: t("pending") },
    COMPLETED: { color: "success", label: t("completed") },
    CANCELED: { color: "error", label: t("canceled") },
    AVAILABLE: { color: "default", label: t("available") },
  };

  const statusStyle = statusConfig[appointment.status] || {
    color: "default",
    label: appointment.status,
  };

  return (
    <Space size="large" direction="vertical" className="mt-8 mb-20 w-full">
      <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
        {t("back")}
      </Button>

      <Card>
        <Typography.Title level={3} style={{ color: token.colorPrimary }}>
          {t("appointmentDetails")}
        </Typography.Title>

        <Row gutter={[36, 24]} className="mt-8">
          {/* Doctor Info */}
          {appointment.doctor && (
            <Col xs={24} lg={16}>
              <Card
                title={t("doctorInformation")}
                type="inner"
                extra={
                  <Button
                    type="link"
                    className="!px-0"
                    onClick={() =>
                      navigate(PATH.DOCTOR_PROFILE(appointment.doctor?.userId))
                    }
                  >
                    {t("viewProfile")}
                  </Button>
                }
              >
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label={t("name")}>
                    {appointment.doctor.firstName} {appointment.doctor.lastName}
                  </Descriptions.Item>
                  {appointment.doctor.consultationFee && (
                    <Descriptions.Item label={t("consultationFee")}>
                      {formatCurrency(appointment.doctor.consultationFee)}
                    </Descriptions.Item>
                  )}
                  {appointment.doctor.clinicInfo && (
                    <>
                      <Descriptions.Item label={t("clinic")}>
                        {appointment.doctor.clinicInfo.name}
                      </Descriptions.Item>
                      <Descriptions.Item label={t("address")}>
                        {appointment.doctor.clinicInfo.address}
                      </Descriptions.Item>
                    </>
                  )}
                </Descriptions>
              </Card>
            </Col>
          )}

          {/* Appointment Info */}
          <Col xs={24} lg={8}>
            <Card style={{ borderColor: token.colorBorder }}>
              <Space direction="vertical" size="middle" className="w-full">
                <Typography.Title level={5} style={{ margin: 0 }}>
                  {t("appointmentInformation")}
                </Typography.Title>

                <div
                  className="flex items-center justify-between py-3 border-b"
                  style={{ borderColor: token.colorBorder }}
                >
                  <Typography.Text strong>{t("status")}</Typography.Text>
                  <Tag color={statusStyle.color}>{statusStyle.label}</Tag>
                </div>

                <div
                  className="flex items-center justify-between py-3 border-b"
                  style={{ borderColor: token.colorBorder }}
                >
                  <Typography.Text strong>
                    <CalendarOutlined className="mr-2" />
                    {t("date")}
                  </Typography.Text>
                  <Typography.Text>
                    {new Date(appointment.shift.date).toLocaleDateString()}
                  </Typography.Text>
                </div>

                <div className="flex items-center justify-between py-3">
                  <Typography.Text strong>
                    <ClockCircleOutlined className="mr-2" />
                    {t("time")}
                  </Typography.Text>
                  <Typography.Title className="!m-0" level={5}>
                    {appointment.shift.time}
                  </Typography.Title>
                </div>
              </Space>
            </Card>
            {/* Action Buttons */}
            <Flex className="!mt-5" gap={10} justify="end">
              {appointment.status === "AVAILABLE" && (
                <UnregisterShiftButton appointmentId={appointment.id} />
              )}
              {appointment.status === "PENDING" && (
                <>
                  <CancelAppointmentButton appointmentId={appointment.id} />
                  <ConfirmAppointmentButton appointmentId={appointment.id} />
                </>
              )}
            </Flex>
          </Col>

          {/* Patient Info */}
          {appointment.patient && (
            <Col xs={24} lg={16}>
              <Card
                title={t("patientInformation")}
                type="inner"
                extra={
                  <Button
                    type="link"
                    className="!px-0"
                    onClick={() =>
                      navigate(
                        PATH.PATIENT_PROFILE(appointment.patient?.userId)
                      )
                    }
                  >
                    {t("viewProfile")}
                  </Button>
                }
              >
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label={t("name")}>
                    {appointment.patient.firstName}{" "}
                    {appointment.patient.lastName}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("gender")}>
                    {appointment.patient.gender}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("email")}>
                    {appointment.patient.email}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("phone")}>
                    {appointment.patient.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label={t("dateOfBirth")}>
                    {new Date(
                      appointment.patient.dateOfBirth
                    ).toLocaleDateString()}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          )}
        </Row>
      </Card>
    </Space>
  );
};

export default AppointmentDetailPage;
