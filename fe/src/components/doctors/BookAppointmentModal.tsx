import { useBookAppointment } from "@/hooks/appointments";
import { getFormattedDate } from "@/utils/datetime";
import { t } from "@/utils/i18n";
import { Button, Descriptions, Input, Modal, Space, Typography } from "antd";
import { useState } from "react";

type BookAppointmentModalProps = {
  open: boolean;
  onClose: () => void;
  appointmentId: number;
  appointmentTime: string;
  appointmentDate: string;
};

const BookAppointmentModal = ({
  open,
  onClose,
  appointmentId,
  appointmentTime,
  appointmentDate,
}: BookAppointmentModalProps) => {
  const [note, setNote] = useState("");
  const { mutate: bookAppointment, isPending } =
    useBookAppointment(appointmentId);

  const handleCancel = () => {
    if (isPending) return;
    setNote("");
    onClose();
  };

  const handleSubmit = () => {
    bookAppointment({ note: note || undefined }, { onSuccess: handleCancel });
  };

  return (
    <Modal
      title={t("bookAppointment")}
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" disabled={isPending} onClick={handleCancel}>
          {t("cancel")}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isPending}
          onClick={handleSubmit}
        >
          {t("confirm")}
        </Button>,
      ]}
    >
      <Space direction="vertical" size="large" className="w-full mt-4 mb-6">
        <Descriptions column={1} bordered>
          <Descriptions.Item label={t("date")}>
            {getFormattedDate(appointmentDate)}
          </Descriptions.Item>
          <Descriptions.Item label={t("time")}>
            {appointmentTime}
          </Descriptions.Item>
        </Descriptions>

        <div>
          <Typography.Text strong>{t("note")}</Typography.Text>
          <Input.TextArea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("notePlaceholder")}
            maxLength={500}
            showCount
            className="mt-2"
          />
        </div>
      </Space>
    </Modal>
  );
};

export default BookAppointmentModal;
