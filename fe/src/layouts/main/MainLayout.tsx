import { Layout } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import Header from "./Header";

import { PATH, TOKEN_NAME } from "@/constants";
import { getCookie } from "@/utils/cookie-actions";

export default function MainLayout() {
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState<boolean>();

  useEffect(() => {
    if (getCookie(TOKEN_NAME.ACCESS_TOKEN)) setHasToken(true);
    else navigate(PATH.LOGIN);
  }, []);

  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout.Content className="px-20 bg-white">
        {hasToken && <Outlet />}
      </Layout.Content>
    </Layout>
  );
}
