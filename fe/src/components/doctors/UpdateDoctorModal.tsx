import { Modal, Form, Input, InputNumber } from "antd";
import type { DoctorDto, UpdateDoctorDto } from "@/types/dto";
import { useUpdateDoctor } from "@/hooks/doctors";
import { t } from "@/utils/i18n";

interface UpdateDoctorModalProps {
  open: boolean;
  onCancel: () => void;
  doctor: DoctorDto;
}

const UpdateDoctorModal = ({
  open,
  onCancel,
  doctor,
}: UpdateDoctorModalProps) => {
  const [form] = Form.useForm();
  const { mutate: updateDoctor, isPending } = useUpdateDoctor();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const payload: UpdateDoctorDto = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        bio: values.bio,
        consultationFee: values.consultationFee,
      };

      updateDoctor(payload, {
        onSuccess: () => {
          onCancel();
          form.resetFields();
        },
      });
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      open={open}
      title={t("updateProfile")}
      okText={t("update")}
      cancelText={t("cancel")}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={isPending}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          phoneNumber: doctor.phoneNumber,
          bio: doctor.bio || "",
          consultationFee: doctor.consultationFee || 0,
        }}
      >
        <Form.Item
          name="firstName"
          label={t("firstName")}
          rules={[{ required: true, message: t("firstNameRequired") }]}
        >
          <Input placeholder={t("firstName")} />
        </Form.Item>

        <Form.Item
          name="lastName"
          label={t("lastName")}
          rules={[{ required: true, message: t("lastNameRequired") }]}
        >
          <Input placeholder={t("lastName")} />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label={t("phone")}
          rules={[
            { required: true, message: t("phoneRequired") },
            {
              pattern: /^[0-9]{10,11}$/,
              message: t("phoneInvalid"),
            },
          ]}
        >
          <Input placeholder={t("phone")} />
        </Form.Item>

        <Form.Item
          name="bio"
          label={t("bio")}
          rules={[{ required: true, message: t("bioRequired") }]}
        >
          <Input.TextArea
            rows={4}
            placeholder={t("bioPlaceholder")}
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="consultationFee"
          label={t("consultationFee")}
          rules={[
            { required: true, message: t("consultationFeeRequired") },
            {
              type: "number",
              min: 0,
              message: t("consultationFeeInvalid"),
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder={t("consultationFee")}
            min={0}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateDoctorModal;
