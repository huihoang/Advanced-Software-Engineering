import { ConfirmModal } from "@/components/common";
import { useDeleteAppointment } from "@/hooks/appointments";
import { t } from "@/utils/i18n";
import { Button, theme } from "antd";
import { useState } from "react";

type PropsType = {
  appointmentId: number;
};

const DeleteAppointmentButton = ({ appointmentId }: PropsType) => {
  const { token } = theme.useToken();

  const [show, setShow] = useState(false);
  const { mutate, isPending } = useDeleteAppointment(appointmentId);

  const handleUnregisterShift = () => {
    mutate(null, {
      onSuccess: () => setShow(false),
    });
  };

  return (
    <>
      <Button danger onClick={() => setShow(true)}>
        {t("deleteAppointment")}
      </Button>

      <ConfirmModal
        show={show}
        primary={token.colorError}
        loading={isPending}
        title={t("deleteAppointment")}
        message={t("deleteAppointmentConfirm")}
        onCancel={() => setShow(false)}
        onOk={handleUnregisterShift}
      />
    </>
  );
};

export default DeleteAppointmentButton;
