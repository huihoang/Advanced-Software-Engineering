import { type PropsWithChildren } from "react";
import { message } from "antd";
import { MessageContext } from "./MessageContext.tsx";

const MessageProvider = ({ children }: PropsWithChildren) => {
  const [api, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={api}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
