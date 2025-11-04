import { ConfirmModal } from "@/components/common";
import { useUnregisterShift } from "@/hooks/shifts";
import { t } from "@/utils/i18n";
import { Button, theme } from "antd";
import { useState } from "react";

type PropsType = {
  appointmentId: number;
};

const UnregisterShiftButton = ({ appointmentId }: PropsType) => {
  const { token } = theme.useToken();

  const [show, setShow] = useState(false);
  const { mutate, isPending } = useUnregisterShift(appointmentId);

  const handleUnregisterShift = () => {
    mutate(null, {
      onSuccess: () => setShow(false),
    });
  };

  return (
    <>
      <Button danger onClick={() => setShow(true)}>
        {t("unregisterShift")}
      </Button>

      <ConfirmModal
        show={show}
        primary={token.colorError}
        loading={isPending}
        title={t("unregisterShift")}
        message={t("unregisterShiftConfirm")}
        onCancel={() => setShow(false)}
        onOk={handleUnregisterShift}
      />
    </>
  );
};

export default UnregisterShiftButton;
