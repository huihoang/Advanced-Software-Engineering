import { memo } from "react";
import { ConfigProvider, Modal, theme, Typography } from "antd";
import { t } from "@/utils/i18n";

type IProps = {
  primary?: string;
  show: boolean;
  loading?: boolean;
  title: string;
  message: string;
  cancelText?: string;
  okText?: string;
  onCancel: () => void;
  onOk: () => void;
};

export default memo(function ConfirmModal(props: IProps) {
  const { token } = theme.useToken();

  const {
    primary = token.colorPrimary,
    show,
    loading,
    title,
    message,
    cancelText,
    okText,
    onCancel,
    onOk,
  } = props;

  return (
    <ConfigProvider theme={{ token: { colorPrimary: primary } }}>
      <Modal
        width={400}
        wrapClassName="mb-16"
        centered
        title={<Typography.Title level={4}>{title}</Typography.Title>}
        open={show}
        cancelText={cancelText ?? t("no")}
        cancelButtonProps={{ disabled: loading }}
        onCancel={() => !loading && onCancel()}
        okText={okText ?? t("yes")}
        onOk={onOk}
        confirmLoading={loading}
      >
        <div className="mt-3 mb-6">
          <Typography.Text>{message}</Typography.Text>
        </div>
      </Modal>
    </ConfigProvider>
  );
});
