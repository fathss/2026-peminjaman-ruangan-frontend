import axios from "axios";
import type { AxiosError } from "axios";

const API_URL = "/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk Request: Menyisipkan Token JWT sebelum request dikirim
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk Response: Menangani error secara global (misal: token expired)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      const authPaths = ["/login", "/register", "/"];
      const isAuthPage = authPaths.includes(window.location.pathname);

      if (!isAuthPage) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Interceptor untuk Response: Menangani error server (misal: 500 Internal Server Error)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const axiosError = error as AxiosError<{ message?: string }>;

    const status = axiosError.response?.status ?? 502;
    const isServerError = status >= 500 || !axiosError.response;

    if (isServerError) {
      window.location.href = `/error?status=${status}`;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;