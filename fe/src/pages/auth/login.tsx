import type { FormProps } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";

import type { LoginReqDto } from "@/types/dto";
import { useLogin } from "@/hooks/auth";

import { t } from "@/utils/i18n";
import { summary } from "@/languages/en/summary";

export default function LoginPage() {
  const [form] = Form.useForm<LoginReqDto>();
  const [error, setError] = useState<boolean>(false);

  let { mutate, isPending } = useLogin();

  const onFinish: FormProps<LoginReqDto>["onFinish"] = (values) =>
    mutate(values, { onError: () => setError(true) });

  return (
    <>
      <Typography.Title level={3} className="text-center !mb-6">
        {t("login")}
      </Typography.Title>

      <Form form={form} disabled={isPending} onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: summary.required("username") }]}
        >
          <Input
            size="large"
            autoComplete=""
            status={error ? "error" : ""}
            onChange={() => setError(false)}
            placeholder={t("username")}
            maxLength={255}
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: summary.required("password") }]}
        >
          <Input.Password
            size="large"
            autoComplete=""
            status={error ? "error" : ""}
            onChange={() => setError(false)}
            placeholder={t("password")}
            maxLength={64}
            prefix={<KeyOutlined />}
          />
        </Form.Item>

        <div className="text-end relative top-[-15px]">
          <button disabled={isPending}>
            <NavLink to={""}>{t("forgotPassword")}</NavLink>
          </button>
        </div>

        <Form.Item className="!mt-2 mb-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full"
            loading={isPending}
          >
            {t("login")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
