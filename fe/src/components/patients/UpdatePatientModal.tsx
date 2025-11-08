import { Modal, Form, Input, DatePicker, Select } from "antd";
import type { PatientDetailDto, UpdatePatientDto } from "@/types/dto";
import { useUpdatePatient } from "@/hooks/patients";
import { DATE_FORMAT_DTO, GENDER } from "@/constants";
import { t } from "@/utils/i18n";
import dayjs from "dayjs";
import { getFormattedDate } from "@/utils/datetime";

interface UpdatePatientModalProps {
  open: boolean;
  onCancel: () => void;
  patient: PatientDetailDto;
}

const UpdatePatientModal = ({
  open,
  onCancel,
  patient,
}: UpdatePatientModalProps) => {
  const [form] = Form.useForm();
  const { mutate: updatePatient, isPending } = useUpdatePatient();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const payload: UpdatePatientDto = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        dateOfBirth: getFormattedDate(values.dateOfBirth, DATE_FORMAT_DTO),
        emergencyName: values.emergencyName,
        emergencyPhone: values.emergencyPhone,
        gender: values.gender,
      };

      updatePatient(payload, {
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
          firstName: patient.firstName,
          lastName: patient.lastName,
          phoneNumber: patient.phoneNumber,
          dateOfBirth: dayjs(patient.dateOfBirth),
          emergencyName: patient.emergencyName || "",
          emergencyPhone: patient.emergencyPhone || "",
          gender: patient.gender || GENDER.MALE,
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
          name="dateOfBirth"
          label={t("dateOfBirth")}
          rules={[{ required: true, message: t("dateOfBirthRequired") }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            placeholder={t("selectDate")}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label={t("gender")}
          rules={[{ required: true, message: t("genderRequired") }]}
        >
          <Select placeholder={t("selectGender")}>
            <Select.Option value={GENDER.MALE}>{t("male")}</Select.Option>
            <Select.Option value={GENDER.FEMALE}>{t("female")}</Select.Option>
            <Select.Option value={GENDER.OTHER}>{t("other")}</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="emergencyName"
          label={t("emergencyName")}
          rules={[{ required: true, message: t("emergencyNameRequired") }]}
        >
          <Input placeholder={t("emergencyName")} />
        </Form.Item>

        <Form.Item
          name="emergencyPhone"
          label={t("emergencyPhone")}
          rules={[
            { required: true, message: t("emergencyPhoneRequired") },
            {
              pattern: /^[0-9]{10,11}$/,
              message: t("phoneInvalid"),
            },
          ]}
        >
          <Input placeholder={t("emergencyPhone")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePatientModal;
