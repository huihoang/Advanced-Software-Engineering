import theme from "@/theme";
import { ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";

const AntDesignConfigProvider = ({ children }: PropsWithChildren) => {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default AntDesignConfigProvider;
