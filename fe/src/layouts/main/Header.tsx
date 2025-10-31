import { PATH } from "@/constants";
import { t } from "@/utils/i18n";
import {
  HistoryOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Image,
  Layout,
  Space,
  theme,
  Typography,
} from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const { token } = theme.useToken();

  const tabs = [
    { label: t("home"), path: PATH.HOME },
    { label: t("doctors"), path: PATH.DOCTORS },
    { label: t("posts"), path: PATH.POSTS },
  ];

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate(PATH.PROFILE),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {},
      danger: true,
    },
  ];

  const handleTabClick = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  const handleClickHistory = () => {
    navigate("/appointments/history");
  };

  return (
    <Layout.Header className="bg-white shadow-md sticky top-0 z-50 !px-10">
      <Flex className="h-full" align="center" justify="space-between">
        <Flex
          gap={14}
          align="center"
          className="cursor-pointer align-center"
          onClick={() => navigate(PATH.HOME)}
        >
          <Image
            src="/images/logo.png"
            alt="Clinic Logo"
            preview={false}
            width={40}
            height={40}
            className="object-contain"
          />
          <Typography.Title
            level={4}
            className="!mb-1"
            style={{ color: token.colorPrimary }}
          >
            HealthCare Clinic
          </Typography.Title>
        </Flex>

        <Flex gap="small">
          {tabs.map((tab, index) => (
            <Button
              key={index}
              size="large"
              type="text"
              onClick={() => handleTabClick(tab.path)}
              style={
                activeTab === tab.path ? { color: token.colorPrimary } : {}
              }
            >
              {tab.label}
            </Button>
          ))}
        </Flex>

        <Flex gap={20} align="center">
          <Button
            type="text"
            onClick={handleClickHistory}
            icon={<HistoryOutlined className="text-md" />}
          >
            {t("appointments")}
          </Button>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Avatar icon={<UserOutlined />} className="cursor-pointer" />
          </Dropdown>
        </Flex>
      </Flex>
    </Layout.Header>
  );
};

export default Header;
