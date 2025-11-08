import { useMutation } from "@tanstack/react-query";
import { chatsAPI } from "@/api";
import type { ChatRequestDto, ChatResponseDto } from "@/types/dto";

export function useSendMessage() {
  const mutation = useMutation({
    mutationFn: (payload: ChatRequestDto) => chatsAPI.sendMessage(payload),
  });

  return mutation;
}
