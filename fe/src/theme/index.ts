import { ThemeConfig } from "antd";
import { CUSTOM_COLORS } from "./custom-colors";

const THEME: ThemeConfig = {
  token: {
    // fontSize: 16,
    colorPrimary: CUSTOM_COLORS.primary,
    ...CUSTOM_COLORS,
  },
  components: {
    Layout: {
      headerBg: "#fff",
    },
  },
};

export default THEME;
export * from "./custom-colors";
