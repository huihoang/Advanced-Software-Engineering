import { ConfirmModal } from "@/components/common";
import { useCancelAppointment } from "@/hooks/appointments";
import { t } from "@/utils/i18n";
import { CloseOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";
import { useState } from "react";

type PropsType = {
  appointmentId: number;
};

const CancelAppointmentButton = ({ appointmentId }: PropsType) => {
  const { token } = theme.useToken();

  const [show, setShow] = useState(false);
  const { mutate, isPending } = useCancelAppointment(appointmentId);

  const handleCancelAppointment = () => {
    mutate(null, {
      onSuccess: () => setShow(false),
    });
  };

  return (
    <>
      <Button danger icon={<CloseOutlined />} onClick={() => setShow(true)}>
        {t("cancel")}
      </Button>

      <ConfirmModal
        show={show}
        primary={token.colorError}
        loading={isPending}
        title={t("cancelAppointment")}
        message={t("cancelAppointmentMessage")}
        onCancel={() => setShow(false)}
        onOk={handleCancelAppointment}
      />
    </>
  );
};

export default CancelAppointmentButton;
