import type { FormProps } from "antd";
import { useState } from "react";
import { Button, Flex, Form, Input, Typography } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants";

import type { LoginReqDto } from "@/types/dto";
import { usePatientRegister } from "@/hooks/auth";
import { t } from "@/utils/i18n";
import { summary } from "@/languages/en/summary";

type RegisterPageProps = {
  onBack?: () => void;
};

export default function RegisterPage({ onBack }: RegisterPageProps) {
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginReqDto>();
  const [error, setError] = useState<boolean>(false);

  const { mutate, isPending } = usePatientRegister();

  const onFinish: FormProps<LoginReqDto>["onFinish"] = (values) => {
    mutate({ ...values, role: "USER" } as any, {
      onError: () => setError(true),
    });
  };

  return (
    <div>
      <Typography.Title level={3} className="text-center !mb-6">
        {t("Register")}
      </Typography.Title>

      <Form form={form} disabled={isPending} onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: summary.required("email") }]}
        >
          <Input
            size="large"
            status={error ? "error" : ""}
            onChange={() => setError(false)}
            placeholder={t("Email")}
            maxLength={255}
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: summary.required("password") },
            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
          ]}
        >
          <Input.Password
            size="large"
            status={error ? "error" : ""}
            onChange={() => setError(false)}
            placeholder={t("Password")}
            maxLength={64}
            prefix={<KeyOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: summary.required("confirmPassword") },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder={t("Confirm Password")}
            prefix={<KeyOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="firstName"
          rules={[{ required: true, message: summary.required("firstName") }]}
        >
          <Input size="large" placeholder={t("Last Name")} />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: summary.required("lastName") }]}
        >
          <Input size="large" placeholder={t("First Name")} />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: summary.required("phone") }]}
        >
          <Input size="large" placeholder={t("Phone Number")} />
        </Form.Item>

        <Form.Item className="!mt-10">
          <Flex gap={12}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="flex-1"
              loading={isPending}
            >
              {t("Register")}
            </Button>

            <Button
              size="large"
              className="flex-1"
              onClick={() => {
                form.resetFields();
                setError(false);
                if (onBack) onBack();
                else navigate(PATH.LOGIN);
              }}
            >
              {t("Back to Login")}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
}
