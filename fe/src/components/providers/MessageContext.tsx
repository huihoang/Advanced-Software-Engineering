// context/MyContext.ts
import { createContext } from "react";
import { MessageInstance } from "antd/es/message/interface";
export const MessageContext = createContext<MessageInstance>(undefined);