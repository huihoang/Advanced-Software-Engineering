import { Flex, Typography } from "antd";

import { NavLink } from "react-router-dom";
import { PATH } from "@/constants";
import { t } from "@/utils/i18n";

export default function NotFound() {
  return (
    <Flex
      className="h-screen"
      align="center"
      justify="center"
      vertical
      gap={10}
    >
      <Typography.Title level={3}>{t("notFound")}</Typography.Title>
      <NavLink to={PATH.HOME}>{t("backToHome")}</NavLink>
    </Flex>
  );
}
