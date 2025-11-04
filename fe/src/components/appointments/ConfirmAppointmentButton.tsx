import { ConfirmModal } from "@/components/common";
import { useConfirmAppointment } from "@/hooks/appointments";
import { t } from "@/utils/i18n";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

type PropsType = {
  appointmentId: number;
};

const ConfirmAppointmentButton = ({ appointmentId }: PropsType) => {
  const [show, setShow] = useState(false);
  const { mutate, isPending } = useConfirmAppointment(appointmentId);

  const handleConfirmAppointment = () => {
    mutate(null, {
      onSuccess: () => setShow(false),
    });
  };

  return (
    <>
      <Button
        type="primary"
        icon={<CheckOutlined />}
        onClick={() => setShow(true)}
      >
        {t("confirm")}
      </Button>

      <ConfirmModal
        show={show}
        loading={isPending}
        title={t("confirmAppointment")}
        message={t("confirmAppointmentMessage")}
        onCancel={() => setShow(false)}
        onOk={handleConfirmAppointment}
      />
    </>
  );
};

export default ConfirmAppointmentButton;
