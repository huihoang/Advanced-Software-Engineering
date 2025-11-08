import { PATH, USER_ROLE } from "@/constants";
import { useUser } from "@/hooks/common";
import type { AppointmentDto } from "@/types/dto/appointment.dto";
import { Card, Tag, theme, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { t } from "@/utils/i18n";
import { useState } from "react";
import BookAppointmentModal from "./BookAppointmentModal";

type Props = {
  appointment: AppointmentDto;
};

const AppointmentButton = ({ appointment }: Props) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { token } = theme.useToken();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const role = user?.role;

  const isPast = (() => {
    const shiftDate = new Date(appointment.scheduleDate);
    const [hours, minutes] = appointment.scheduleTime.split(":").map(Number);
    shiftDate.setHours(hours, minutes, 0, 0);
    return new Date() > shiftDate;
  })();

  const disabled =
    role === USER_ROLE.PATIENT
      ? appointment.status !== "AVAILABLE" || isPast
      : isPast;

  const getStatusDisplay = () => {
    switch (appointment.status) {
      case "CONFIRMED":
        return {
          icon: <CheckCircleOutlined />,
          label: t("confirmed"),
          tagColor: "blue",
          textColor: disabled ? token.colorTextDisabled : token.colorText,
        };
      case "PENDING":
        return {
          icon: <ClockCircleOutlined />,
          label: t("pending"),
          tagColor: "warning",
          textColor: disabled ? token.colorTextDisabled : token.colorText,
        };
      case "COMPLETED":
        return {
          icon: <CheckOutlined />,
          label: t("completed"),
          tagColor: "success",
          textColor: token.colorTextDisabled,
        };
      case "CANCELED":
        return {
          icon: <CloseCircleOutlined />,
          label: t("canceled"),
          tagColor: "error",
          textColor: token.colorTextDisabled,
        };
      default:
        return {
          icon: null,
          label: t("available"),
          tagColor: "default",
          textColor: disabled ? token.colorTextDisabled : token.colorText,
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  const handleClick = () => {
    if (disabled) return;

    if (role === USER_ROLE.PATIENT) {
      setIsModalOpen(true);
    } else {
      navigate(PATH.APPOINTMENT_DETAIL(appointment.id));
    }
  };

  return (
    <>
      <Card
        onClick={handleClick}
        className={`duration-200 relative !mb-4 ${
          disabled
            ? "!bg-gray-50 cursor-not-allowed"
            : "hover:shadow-md cursor-pointer"
        }`}
        styles={
          role === USER_ROLE.DOCTOR ? { body: { paddingBottom: 20 } } : {}
        }
      >
        {role !== USER_ROLE.PATIENT && (
          <div className="absolute top-2 left-2">
            <Tag
              icon={statusDisplay.icon}
              color={statusDisplay.tagColor}
              bordered={false}
              className="m-0"
            >
              {statusDisplay.label}
            </Tag>
          </div>
        )}
        <Typography.Text
          className={`block font-medium text-lg text-center${
            role === USER_ROLE.DOCTOR ? " pt-4" : ""
          }`}
          style={{ color: statusDisplay.textColor }}
        >
          {appointment.scheduleTime} - {appointment.endTime}
        </Typography.Text>
      </Card>

      <BookAppointmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointmentId={appointment.id}
        appointmentTime={`${appointment.scheduleTime} - ${appointment.endTime}`}
        appointmentDate={appointment.scheduleDate}
      />
    </>
  );
};

export default AppointmentButton;
