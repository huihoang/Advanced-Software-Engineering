import axiosClient from "@/utils/axios-client";
import type { ChatRequestDto, ChatResponseDto } from "@/types/dto";

const mockDepartments = [
  { id: 1, name: "Khoa Hồi sức" },
  { id: 2, name: "Khoa Nội tổng quát" },
  { id: 3, name: "Khoa Ngoại tổng quát" },
  { id: 4, name: "Khoa Tim mạch" },
  { id: 5, name: "Khoa Hô hấp" },
  { id: 6, name: "Khoa Thần kinh" },
  { id: 7, name: "Khoa Tai mũi họng" },
  { id: 8, name: "Khoa Mắt" },
  { id: 9, name: "Khoa Da liễu" },
  { id: 10, name: "Khoa Nhi" },
  { id: 11, name: "Khoa Sản" },
  { id: 12, name: "Khoa Tiêu hóa" },
  { id: 13, name: "Khoa Thận - Tiết niệu" },
  { id: 14, name: "Khoa Cơ xương khớp" },
  { id: 15, name: "Khoa Ung bướu" },
  { id: 16, name: "Khoa Truyền nhiễm" },
  { id: 17, name: "Khoa Y học cổ truyền" },
  { id: 18, name: "Khoa Chấn thương chỉnh hình" },
  { id: 19, name: "Khoa Răng - Hàm - Mặt" },
  { id: 20, name: "Khoa Tâm thần" },
];

export const chatsAPI = {
  sendMessage(payload: ChatRequestDto): Promise<ChatResponseDto> {
    // return axiosClient.post<ChatResponseDto>("/chat", payload);
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            suggested_departments: mockDepartments,
          }),
        1000
      );
    });
  },
};
