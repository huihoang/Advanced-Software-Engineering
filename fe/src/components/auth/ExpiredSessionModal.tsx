import { t } from "@/utils/i18n";
import { Modal } from "antd";

export default function ExpiredSessionModal(onOk: () => void) {
  return Modal.info({
    title: <h4>{t("sessionExpired")}</h4>,
    content: t("pleaseLoginAgain"),
    icon: null,
    footer: (_, { OkBtn }) => <OkBtn />,
    onOk: onOk,
  });
}
