import { useContext } from "react";
import { MessageContext } from "@/components/providers/MessageProvider";

export const useMessage = () => {
  const messageApi = useContext(MessageContext);
  return {
    info: (content: string) => messageApi.open({ type: "info", content }),
    success: (content: string) => messageApi.open({ type: "success", content }),
    error: (content: string) => messageApi.open({ type: "error", content }),
    warning: (content: string) => messageApi.open({ type: "warning", content }),
  };
};
