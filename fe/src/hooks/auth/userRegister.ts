import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PATH, TOKEN_NAME } from "@/constants";
import type { LoginReqDto } from "@/types/dto";
import { setTokenCookie } from "@/utils/cookie-actions";
import { message } from "antd";
export function useRegister() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: LoginReqDto & { role: string }) =>
            new Promise<{ access_token: string }>((resolve) => {
                setTimeout(() => resolve({ access_token: "patient_token" }), 1000);
            }),
        onSuccess: (data) => {
            setTokenCookie(TOKEN_NAME.ACCESS_TOKEN, data.access_token);
            localStorage.setItem("role", "patient");
            message.success("Đăng ký thành công!");
            navigate(PATH.HOME || "/");
        },
        onError: (error: any) => {
            // Nếu API trả lỗi email trùng
            if (error.response?.data?.message?.includes("email")) {
                message.error("Email đã tồn tại!");
            } else {
                message.error("Đăng ký thất bại. Vui lòng thử lại!");
            }
        },
    });
}
