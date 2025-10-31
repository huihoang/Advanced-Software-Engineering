import { createContext, type PropsWithChildren } from "react";
import { message } from "antd";
import { MessageInstance } from "antd/es/message/interface";

export const MessageContext = createContext<MessageInstance>(undefined);

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
