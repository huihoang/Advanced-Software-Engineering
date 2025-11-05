import { PATH } from "@/constants";
import { useUser } from "@/hooks/common";
import { t } from "@/utils/i18n";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useUser();

  const items = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: user?.email ?? t("profile"),
      onClick: () => navigate(PATH.PROFILE),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: t("settings"),
      onClick: () => navigate(PATH.SETTINGS),
    },
    { type: "divider" as const },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("logout"),
      danger: true,
      onClick: () => {
        clearUser();
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Avatar icon={<UserOutlined />} className="cursor-pointer" />
    </Dropdown>
  );
};

export default AvatarDropdown;
