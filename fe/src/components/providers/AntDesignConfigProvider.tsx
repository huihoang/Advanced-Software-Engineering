import theme from "@/theme";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import type { PropsWithChildren } from "react";

const AntDesignConfigProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider theme={theme} locale={viVN}>
      {children}
    </ConfigProvider>
  );
};

export default AntDesignConfigProvider;
