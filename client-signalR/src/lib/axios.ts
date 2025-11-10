import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";
import { toast } from "../components/ui/toast";
import { API_CONFIG } from "../config/api.config";

// Create axios instance
export const apiClient = axios.create(API_CONFIG);

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token from localStorage
    const userId = localStorage.getItem("userId");
    if (userId && config.headers) {
      config.headers["X-User-Id"] = userId;
    }

    // Add timestamp
    config.headers["X-Request-Time"] = new Date().toISOString();

    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error("[API Request Error]", error);
    // show a toast to inform the user about the request error
    toast.error("Request error. Please try again.");
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(
      `[API Response] ${response.config.method?.toUpperCase()} ${
        response.config.url
      } - ${response.status}`
    );
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error
      const status = error.response.status;

      switch (status) {
        case 401:
          console.error("[API] Unauthorized - Redirecting to login");
          toast.error("Session expired. Redirecting to login...");
          localStorage.removeItem("userId");
          window.location.href = "/login";
          break;
        case 403:
          console.error("[API] Forbidden");
          toast.error("You don't have permission to perform this action.");
          break;
        case 404:
          console.error("[API] Not Found");
          toast.error("Requested resource not found.");
          break;
        case 500:
          console.error("[API] Internal Server Error");
          toast.error("Server error. Please try again later.");
          break;
        default:
          console.error(`[API Error] ${status}:`, error.response.data);
          // try to show a useful message if available
          const serverMsg = (error.response as any)?.data?.message;
          if (serverMsg) toast.error(serverMsg);
          else toast.error(`Server error (${status}).`);
      }
    } else if (error.request) {
      // Request made but no response
      console.error("[API] No response received:", error.message);
      toast.error(
        "Network error: no response from server. Check your connection."
      );
    } else {
      // Error in request setup
      console.error("[API] Request setup error:", error.message);
      toast.error(`Request error: ${error.message}`);
    }

    return Promise.reject(error);
  }
);

// API helper functions
export const api = {
  get: <T = any>(url: string, config?: any) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T = any>(url: string, data?: any, config?: any) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T = any>(url: string, data?: any, config?: any) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T = any>(url: string, data?: any, config?: any) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T = any>(url: string, config?: any) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;
