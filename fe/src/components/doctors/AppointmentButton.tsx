import { PATH, USER_ROLE } from "@/constants";
import { useUser } from "@/hooks/common";
import type { AppointmentDto } from "@/types/dto/appointment.dto";
import type { Appointment } from "@/types/ui/appointment";
import { Card, Tag, theme, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { t } from "@/utils/i18n";

type Props = {
  appointment: Appointment | AppointmentDto;
};

const AppointmentButton = ({ appointment }: Props) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { token } = theme.useToken();

  const role = user?.role;

  const isShiftPast = () => {
    const shiftDate = new Date(appointment.shift.date);
    const shiftTime = appointment.shift.time;
    const startTime = shiftTime.split("-")[0].trim();
    const [hours, minutes] = startTime.split(":").map(Number);
    shiftDate.setHours(hours, minutes, 0, 0);
    return new Date() > shiftDate;
  };

  const isPast = isShiftPast();
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
    if (!disabled) navigate(PATH.APPOINTMENT_DETAIL(appointment.id));
  };

  return (
    <Card
      onClick={handleClick}
      className={`duration-200 relative !mb-4 ${
        disabled
          ? "!bg-gray-50 cursor-not-allowed"
          : "hover:shadow-md cursor-pointer"
      }`}
      styles={role === USER_ROLE.DOCTOR ? { body: { paddingBottom: 20 } } : {}}
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
        {appointment.shift.time}
      </Typography.Text>
    </Card>
  );
};

export default AppointmentButton;
