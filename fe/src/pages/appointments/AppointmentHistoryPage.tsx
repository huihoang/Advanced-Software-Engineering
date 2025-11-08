import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Space, Spin, Table, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { t } from "@/utils/i18n";
import type { AppointmentDetailDto } from "@/types/dto";
import { PATH } from "@/constants";
import { useGetAllAppointments } from "@/hooks/appointments";
import { useUser } from "@/hooks/common";

const AppointmentHistoryPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const { data: appointments = [], isLoading } = useGetAllAppointments(
    user?.id?.toString() || ""
  );

  // Filter past appointments (completed or canceled)
  const pastAppointments = appointments.filter((apt) => {
    const appointmentDate = new Date(apt.scheduleDate);
    const [hours, minutes] = apt.scheduleTime.split(":").map(Number);
    appointmentDate.setHours(hours, minutes, 0, 0);

    return (
      appointmentDate < new Date() ||
      apt.status === "COMPLETED" ||
      apt.status === "CANCELED"
    );
  });

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
      dataIndex: "scheduleDate",
      key: "scheduleDate",
      render: (date: string) => (
        <Space>
          <CalendarOutlined />
          {new Date(date).toLocaleDateString()}
        </Space>
      ),
    },
    {
      title: t("time"),
      dataIndex: "scheduleTime",
      key: "scheduleTime",
      render: (_: string, record: AppointmentDetailDto) => (
        <Space>
          <ClockCircleOutlined />
          {record.scheduleTime.slice(0, 5)} - {record.endTime.slice(0, 5)}
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
      render: (_: unknown, record: AppointmentDetailDto) => (
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

  return (
    <Space size="large" direction="vertical" className="mt-8 mb-20 w-full">
      <Card>
        <Typography.Title level={3} className="mb-4">
          {t("appointmentHistory")}
        </Typography.Title>
        {pastAppointments.length > 0 ? (
          <Table dataSource={pastAppointments} columns={columns} rowKey="id" />
        ) : (
          <Typography.Text type="secondary">
            {t("noAppointments")}
          </Typography.Text>
        )}
      </Card>
    </Space>
  );
};

export default AppointmentHistoryPage;
