import { allMutations } from "@/data-services/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import cookies from "js-cookie";
import { AxiosErrorResponse } from "./GlobalApiResponse";
import { useContext } from "react";
import { constructUrl } from "@/data-services/utils/constructUrl";
import { AllQueryKeys } from "@/data-services/queries";
import { LoadingContext } from "@/components/provider/QueryProvider";

type MutationApiRequestProps<T, V> = {
     key: keyof typeof allMutations;
     params?: Record<string, any>;
     queries?: Record<string, any>;
     options?: {
          onSuccess?: (data?: T) => void;
          onError?: (error?: Error) => void;
          onSettled?: () => void;
     };
     config?: {
          showLoading?: boolean;
          successNotification?: boolean;
          errorNotification?: boolean;
          successNotificationMessage?: string;
          errorNotificationMessage?: string;
     };
};

// Get token from cookies (HARUS SEBELUM axios instance!)
const getAuthToken = () => {
     const token = cookies.get("accessToken");
     console.log("📦 Token from cookie:", token ? "EXISTS" : "NULL");

     return token || "";
};

// Create Axios instance
const axiosInstance = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_URL || "https://lead-ai-server.zenika.id/api",
     withCredentials: true, // ensure cookies are sent on cross-origin requests
});

// Add request interceptor untuk inject token
axiosInstance.interceptors.request.use(
     config => {
          const token = getAuthToken();
          console.log("🔑 Interceptor - Token:", token ? "✅ EXISTS" : "❌ NULL");
          if (token) {
               config.headers.Authorization = `Bearer ${token}`;
               console.log("✅ Authorization header set!");
          }
          return config;
     },
     error => {
          return Promise.reject(error);
     }
);

// Flag to prevent multiple redirects
let isRedirecting = false;

// Add response interceptor untuk handle token expiration
axiosInstance.interceptors.response.use(
     response => response,
     error => {
          // Check if error is due to expired token
          if (error.response?.status === 401 && !isRedirecting) {
               const errorMessage = error.response?.data?.message;
               const hasToken = !!cookies.get("accessToken");

               // Only show notification if token exists and is expired
               if (
                    hasToken &&
                    (errorMessage?.toLowerCase().includes("expired") ||
                         errorMessage?.toLowerCase().includes("token") ||
                         error.response?.data?.error === "Unauthorized")
               ) {
                    isRedirecting = true;

                    // Clear cookies
                    cookies.remove("accessToken", { path: "/" });
                    cookies.remove("refreshToken", { path: "/" });

                    // Show notification only once
                    if (typeof window !== "undefined") {
                         // Create and show alert
                         const alertDiv = document.createElement("div");
                         alertDiv.className =
                              "alert alert-error fixed top-4 right-4 w-96 z-50 shadow-lg";
                         alertDiv.innerHTML = `
                              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Session expired. Redirecting to login...</span>
                         `;
                         document.body.appendChild(alertDiv);

                         // Redirect after 3 seconds
                         setTimeout(() => {
                              window.location.href = "/auth/login";
                         }, 3000);
                    }
               }
          }
          return Promise.reject(error);
     }
);

const useMutationApiRequest = <T, V>({
     key,
     queries,
     options,
     params,
     config = {
          showLoading: true,
          successNotification: true,
          errorNotification: true,
     },
}: MutationApiRequestProps<T, V>) => {
     const queryClient = useQueryClient();
     const mutationConfig = allMutations[key];
     const { setLoading } = useContext(LoadingContext);
     const mutationFn = async (data: V): Promise<T> => {
          const isFormData = data instanceof FormData;

          let url = mutationConfig.url;
          url = constructUrl(url, { query: params });

          const config: any = {
               url: url,
               method: mutationConfig.method,
               data,
               params: queries,
          };

          // Untuk non-FormData, set Content-Type ke JSON
          if (!isFormData) {
               config.headers = {
                    "Content-Type": "application/json",
               };
          }

          console.log("� Sending request:", {
               url: config.url,
               method: config.method,
               isFormData,
          });

          const response = await axiosInstance(config);

          return response.data;
     };

     return useMutation<T, AxiosErrorResponse, V>({
          mutationFn,
          onMutate: () => {
               // start loading (if enabled)
               if (config.showLoading && typeof setLoading === "function") setLoading(true);
          },
          onSuccess: data => {
               if (options?.onSuccess) options.onSuccess(data);
               if (mutationConfig.refetchQueries) {
                    mutationConfig.refetchQueries.forEach((queryKey: AllQueryKeys) => {
                         queryClient.refetchQueries({ queryKey: [queryKey] });
                    });
               }
               // Show success notification by default, unless explicitly disabled
               if (config?.successNotification ?? true) {
                    const msg =
                         config?.successNotificationMessage ?? (data as any)?.message ?? "Success";
                    // showSuccessNotification(msg);
               }
               console.log("Mutation successful:", data);
          },
          onError: error => {
               if (options?.onError) options.onError(error);
               console.error("Mutation failed:", error);
               // Show error notification by default, unless explicitly disabled
               if (config?.errorNotification ?? true) {
                    const errMsg =
                         config?.errorNotificationMessage ??
                         error.response?.data?.message ??
                         error.message ??
                         "Something went wrong";
                    // showErrorNotification(errMsg);
               }
          },
          onSettled: () => {
               if (options?.onSettled) options.onSettled();
               // stop loading (if enabled)
               if (config.showLoading && typeof setLoading === "function") setLoading(false);
          },
     });
};

export default useMutationApiRequest;
