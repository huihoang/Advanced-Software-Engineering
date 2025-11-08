import { DateFilter } from "@/components/custom";
import { useCreateAppointment } from "@/hooks/appointments";
import { t } from "@/utils/i18n";
import { isTimeRangeValid } from "@/utils/datetime";
import { Button, Col, Modal, Row, Space, Typography, TimePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

type PropsType = {
  open: boolean;
  onClose: () => void;
  initialDate?: Date;
};

const CreateAppointmentModal = ({
  open,
  onClose,
  initialDate = new Date(),
}: PropsType) => {
  const [date, setDate] = useState<Date>(initialDate);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const { mutate: createAppointment, isPending: registering } =
    useCreateAppointment();

  useEffect(() => {
    setDate(initialDate);
    setStartTime(null);
    setEndTime(null);
  }, [initialDate]);

  const handleCancel = () => {
    setStartTime(null);
    setEndTime(null);
    onClose();
  };

  const handleRegister = () => {
    if (!isTimeRangeValid(startTime, endTime)) return;
    createAppointment(
      {
        scheduleDate: date,
        scheduleTime: startTime as string,
        endTime: endTime as string,
      },
      { onSuccess: handleCancel }
    );
  };

  const registerDisabled = registering || !isTimeRangeValid(startTime, endTime);

  return (
    <Modal
      title={t("addAppointment")}
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" disabled={registering} onClick={handleCancel}>
          {t("cancel")}
        </Button>,
        <Button
          key="register"
          type="primary"
          loading={registering}
          disabled={registerDisabled}
          onClick={handleRegister}
        >
          {t("create")}
        </Button>,
      ]}
    >
      <Space direction="vertical" size="middle" className="my-4 w-full">
        <Row gutter={12} align="middle">
          <Col span={8}>
            <Typography.Text strong>{t("date")}</Typography.Text>
          </Col>
          <Col span={16}>
            <DateFilter value={date} onChange={setDate} />
          </Col>
        </Row>

        <Row gutter={12} align="middle">
          <Col span={8}>
            <Typography.Text strong>{t("startTime")}</Typography.Text>
          </Col>
          <Col span={16}>
            <TimePicker
              format="HH:mm"
              value={startTime ? dayjs(startTime, "HH:mm") : null}
              onChange={(v) => setStartTime(v ? v.format("HH:mm") : null)}
              disabledTime={() => ({
                disabledHours: () => [
                  ...Array.from({ length: 7 }, (_, i) => i),
                  ...Array.from({ length: 6 }, (_, i) => i + 18),
                ],
              })}
            />
          </Col>
        </Row>

        <Row gutter={12} align="middle">
          <Col span={8}>
            <Typography.Text strong>{t("endTime")}</Typography.Text>
          </Col>
          <Col span={16}>
            <TimePicker
              format="HH:mm"
              value={endTime ? dayjs(endTime, "HH:mm") : null}
              onChange={(v) => setEndTime(v ? v.format("HH:mm") : null)}
              disabledTime={() => ({
                disabledHours: () => [
                  ...Array.from({ length: 7 }, (_, i) => i),
                  ...Array.from({ length: 6 }, (_, i) => i + 18),
                ],
              })}
            />
          </Col>
        </Row>

        {!isTimeRangeValid(startTime, endTime) && (
          <Typography.Text type="danger">
            {t("invalidTimeRange")}
          </Typography.Text>
        )}
      </Space>
    </Modal>
  );
};

export default CreateAppointmentModal;
