import type { FormProps } from "antd";
import { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";

import type { LoginReqDto } from "@/types/dto";
import { useLogin } from "@/hooks/auth";
import { useRegister } from "@/hooks/auth/userRegister";
import { t } from "@/utils/i18n";
import { summary } from "@/languages/en/summary";

export default function LoginPage() {
  const [form] = Form.useForm<LoginReqDto>();
  const [error, setError] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState(false);

  // ✅ Chỉ cần khai báo thế này thôi
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const onFinish: FormProps<LoginReqDto>["onFinish"] = (values) => {
    if (isRegister) {
      registerMutation.mutate({ ...values, role: "patient" } as any, {
        onError: () => setError(true),
      });
    } else {
      loginMutation.mutate(values, { onError: () => setError(true) });
    }
  };

  // ✅ Tổng trạng thái pending
  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <Typography.Title level={3} className="text-center !mb-6">
          {isRegister ? t("Register") : t("Login")}
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

          {isRegister && (
            <>
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
                name="phone"
                rules={[{ required: true, message: summary.required("phone") }]}
              >
                <Input size="large" placeholder={t("Phone Number")} />
              </Form.Item>
            </>
          )}

          {!isRegister && (
            <div className="text-right relative top-[-10px]">
              <button
                type="button"
                className="text-blue-500 text-sm hover:underline"
              >
                {t("Forgot Password?")}
              </button>
            </div>
          )}

          <Form.Item className="flex justify-center gap-4 mt-6 mb-0">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-1/2 "
              loading={isPending}
            >
              {isRegister ? t("Register") : t("Login")}
            </Button>

            <Button
              size="large"
              className="w-1/2"
              onClick={() => {
                setIsRegister(!isRegister);
                form.resetFields();
                setError(false);
              }}
            >
              {isRegister ? t("Back to Login") : t("Register")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
