import { TOKEN_NAME } from "@/constants";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { getCookie } from "./cookie-actions";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-type": "application/json" },
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    if (
      config.baseURL === import.meta.env.VITE_API_URL &&
      !config.url.includes("register") &&
      !config.url.includes("login")
    ) {
      const token = getCookie(TOKEN_NAME.ACCESS_TOKEN);
      const auth = token ? `Bearer ${token}` : "";
      config.headers.setAuthorization(auth);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data
);

export default axiosClient;
