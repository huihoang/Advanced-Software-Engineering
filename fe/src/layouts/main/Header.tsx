import { PATH, USER_ROLE } from "@/constants";
import { t } from "@/utils/i18n";
import { Button, Flex, Image, Layout, theme, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import AvatarDropdown from "./AvatarDropdown";
import { useUser } from "@/hooks/common";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useUser();

  const { token } = theme.useToken();

  const tabs = [
    { label: t("home"), path: PATH.HOME },
    { label: t("doctors"), path: PATH.DOCTORS },
  ];

  // Add AI Chat tab only for patients
  if (user?.role === USER_ROLE.PATIENT) {
    tabs.push({ label: t("aiChat"), path: PATH.AI_CHAT });
  }

  const isTabActive = (pathname: string, tabPath: string) => {
    if (tabPath === PATH.HOME) return pathname === PATH.HOME;
    return pathname.startsWith(tabPath);
  };

  const handleTabClick = (path: string) => navigate(path);

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
                isTabActive(pathname, tab.path)
                  ? { color: token.colorPrimary }
                  : {}
              }
            >
              {tab.label}
            </Button>
          ))}
        </Flex>

        <AvatarDropdown />
      </Flex>
    </Layout.Header>
  );
};

export default Header;
