import { PATH, USER_ROLE } from "@/constants";
import { useLogout } from "@/hooks/auth";
import { useUser } from "@/hooks/common";
import { t } from "@/utils/i18n";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "@/components/common";
import { useState } from "react";

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { mutate: logout, isPending } = useLogout();
  const { user } = useUser();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const items = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: t("profile"),
      onClick: () =>
        navigate(
          user?.role === USER_ROLE.DOCTOR
            ? PATH.DOCTOR_PROFILE(user.id)
            : PATH.PATIENT_PROFILE(user?.id)
        ),
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
      onClick: () => setShowConfirmModal(true),
    },
  ];

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => setShowConfirmModal(false),
    });
  };

  return (
    <>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Avatar icon={<UserOutlined />} className="cursor-pointer" />
      </Dropdown>

      <ConfirmModal
        show={showConfirmModal}
        primary={token.colorError}
        loading={isPending}
        title={t("logout")}
        message={t("logoutConfirm")}
        onCancel={() => setShowConfirmModal(false)}
        onOk={handleLogout}
      />
    </>
  );
};

export default AvatarDropdown;
