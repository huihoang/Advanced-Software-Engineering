import { t } from "@/utils/i18n";
import { Typography } from "antd";

const HomePage = () => {
  return (
    <div>
      <Typography.Title>{t("home")}</Typography.Title>
    </div>
  );
};

export default HomePage;
