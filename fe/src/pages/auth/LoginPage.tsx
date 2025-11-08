import type { FormProps } from "antd";
import { useState } from "react";
import { Button, Flex, Form, Input, Typography } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";

import type { LoginReqDto } from "@/types/dto";
import { useLogin } from "@/hooks/auth";
import { t } from "@/utils/i18n";
import { summary } from "@/languages/en/summary";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants";

export default function LoginPage() {
  const [form] = Form.useForm<LoginReqDto>();
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();

  const onFinish: FormProps<LoginReqDto>["onFinish"] = (values) => {
    mutate(values, { onError: () => setError(true) });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <Typography.Title level={3} className="text-center !mb-6">
          {t("Login")}
        </Typography.Title>

        <Form form={form} disabled={isPending} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: summary.required("username") }]}
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

          {/* <div className="text-right relative top-[-10px]">
            <button
              type="button"
              className="text-blue-500 text-sm hover:underline"
            >
              {t("Forgot Password?")}
            </button>
          </div> */}

          <Form.Item className="!mt-10">
            <Flex gap={12}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="flex-1"
                loading={isPending}
              >
                {t("Login")}
              </Button>

              <Button
                size="large"
                className="flex-1"
                onClick={() => {
                  form.resetFields();
                  setError(false);
                  navigate(PATH.REGISTER);
                }}
              >
                {t("Register")}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
