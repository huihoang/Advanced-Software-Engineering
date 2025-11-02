import { DateFilter } from "@/components/custom";
import { useGetAllShifts, useRegisterShift } from "@/hooks/shifts";
import type { ShiftDto } from "@/types/dto";
import { t } from "@/utils/i18n";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Space, Spin, Typography } from "antd";
import { useEffect, useState } from "react";

type PropsType = {
  open: boolean;
  onClose: () => void;
  initialDate?: Date;
};

const RegisterShiftModal = ({
  open,
  onClose,
  initialDate = new Date(),
}: PropsType) => {
  const [selectedShift, setSelectedShift] = useState<ShiftDto | null>(null);
  const [filterDate, setFilterDate] = useState<Date>(initialDate);

  const { data: shifts = [], isLoading: loading } = useGetAllShifts(filterDate);
  const { mutate: registerShift, isPending: registering } = useRegisterShift();

  const isShiftPast = (date: Date, time: string) => {
    const startTime = time.split("-")[0].trim();
    const [hours, minutes] = startTime.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
    return new Date() > date;
  };

  const handleCancel = () => {
    setSelectedShift(null);
    onClose();
  };

  const handleRegister = () =>
    selectedShift &&
    registerShift(selectedShift.id, { onSuccess: handleCancel });

  useEffect(() => {
    setFilterDate(initialDate);
  }, [initialDate]);

  return (
    <Modal
      title={t("registerShift")}
      open={open}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button key="cancel" disabled={registering} onClick={handleCancel}>
          {t("cancel")}
        </Button>,
        <Button
          key="register"
          type="primary"
          loading={registering}
          disabled={!selectedShift}
          onClick={handleRegister}
        >
          {t("register")}
        </Button>,
      ]}
    >
      {loading ? (
        <div className="flex justify-center p-8">
          <Spin size="large" />
        </div>
      ) : (
        <Space direction="vertical" size="middle" className="my-3">
          <DateFilter value={filterDate} onChange={setFilterDate} />
          <Row gutter={[12, 12]}>
            {shifts.map((shift) => (
              <Col key={shift.id} xs={12} sm={8} md={6}>
                <Button
                  block
                  size="middle"
                  color="primary"
                  variant={
                    selectedShift?.id === shift.id ? "filled" : undefined
                  }
                  className="!py-6"
                  disabled={
                    isShiftPast(new Date(shift.date), shift.time) || registering
                  }
                  onClick={() => setSelectedShift(shift)}
                  icon={<ClockCircleOutlined />}
                >
                  {shift.time}
                </Button>
              </Col>
            ))}
          </Row>
          {shifts.length === 0 && (
            <Typography.Text type="secondary">{t("noShifts")}</Typography.Text>
          )}
        </Space>
      )}
    </Modal>
  );
};

export default RegisterShiftModal;
