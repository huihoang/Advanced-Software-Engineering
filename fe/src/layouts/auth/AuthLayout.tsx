import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Col, Flex, Row, Typography, theme } from "antd";

import { PATH, TOKEN_NAME } from "@/constants";
import { getCookie } from "@/utils/cookie-actions";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  useEffect(() => {
    getCookie(TOKEN_NAME.ACCESS_TOKEN) && navigate(PATH.HOME);
  }, [navigate]);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Row className="h-full">
        <Col
          span={16}
          className="px-[4vw]"
          style={{ backgroundColor: token.colorBgContainer }}
        >
          <Flex vertical justify="center" className="h-full">
            <Typography.Title
              className="ml-6"
              style={{ color: token.colorPrimary }}
            >
              Healthcare Clinic
            </Typography.Title>
            <img
              height={550}
              width={550}
              src="images/login-img.jpg"
              alt="image"
            />
          </Flex>
        </Col>
        <Col span={8} style={{ backgroundColor: token.colorPrimary }} />
      </Row>
      <Row
        align="middle"
        justify="end"
        className="absolute inset-0 overflow-y-auto py-10"
      >
        <Col
          sm={{ span: 12 }}
          md={{ span: 10 }}
          lg={{ span: 8 }}
          pull={2}
          className="p-5 border border-gray-200 shadow-lg rounded-lg"
          style={{ backgroundColor: token.colorBgLayout }}
        >
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}
