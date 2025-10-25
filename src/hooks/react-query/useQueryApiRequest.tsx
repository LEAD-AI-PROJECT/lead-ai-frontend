import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import cookies from "js-cookie";
import { AxiosErrorResponse } from "./GlobalApiResponse";
import { useContext, useEffect } from "react";
import { constructUrl } from "@/data-services/utils/constructUrl";
import { allQueries } from "@/data-services/queries";
import { LoadingContext } from "@/components/provider/QueryProvider";

// Get token from cookies
const getAuthToken = () => {
     const token = cookies.get("accessToken");
     console.log("📦 Query - Token from cookie:", token ? "EXISTS" : "NULL");

     return token || "";
};

// Create Axios instance
const axiosInstance = axios.create({
     baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
     withCredentials: true, // ensure cookies are sent on cross-origin requests
     headers: {
          "Content-Type": "application/json",
     },
});

// Add request interceptor untuk inject token
axiosInstance.interceptors.request.use(
     config => {
          const token = getAuthToken();
          console.log("🔑 Query Interceptor - Token:", token ? "✅ EXISTS" : "❌ NULL");
          if (token) {
               config.headers.Authorization = `Bearer ${token}`;
               console.log("✅ Query Authorization header set!");
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

type QueryApiRequestProps<T> = {
     key: keyof typeof allQueries;
     params?: Record<string, any>;
     queries?: Record<string, any>;
     options?: Omit<UseQueryOptions<T, AxiosErrorResponse>, "queryKey" | "queryFn">;
     onSuccess?: (data: T) => void;
     config?: {
          showLoading?: boolean;
          successNotification?: boolean;
          errorNotification?: boolean;
          successNotificationMessage?: string;
          errorNotificationMessage?: string;
     };
};

const useQueryApiRequest = <T,>({
     key,
     params,
     queries,
     options,
     config = {
          showLoading: true,
          successNotification: false,
          errorNotification: true,
     },
     onSuccess,
}: QueryApiRequestProps<T>) => {
     const queryKey = [key, params, queries];
     const { setLoading } = useContext(LoadingContext);
     const queryFn = async (): Promise<T> => {
          let url = allQueries[key];
          url = constructUrl(url, { query: params });

          const response = await axiosInstance.get(url, {
               params: queries,
          });

          return response.data;
     };

     const queryFetch = useQuery<T, AxiosErrorResponse>({
          queryKey,
          queryFn,
          ...options,
     });

     useEffect(() => {
          if (config.showLoading) {
               if (queryFetch.isLoading) {
                    setLoading(true);
               }
               if (queryFetch.isError || queryFetch.isSuccess) {
                    setLoading(false);
               }
          }

          if (queryFetch.isError) {
               if (config.errorNotification ?? true) {
                    // showErrorNotification(
                    //      config.errorNotificationMessage ??
                    //           queryFetch.error.response?.data?.message ??
                    //           queryFetch.error?.message
                    // );
               }
          }

          if (queryFetch.isSuccess) {
               if (onSuccess && queryFetch.data) {
                    onSuccess(queryFetch.data);
               }

               if (config.successNotification ?? false) {
                    // showSuccessNotification(
                    //      config.successNotificationMessage ??
                    //           (queryFetch.data as any).message ??
                    //           "Success"
                    // );
               }
          }
     }, [
          queryFetch.isLoading,
          queryFetch.isError,
          queryFetch.isSuccess,
          queryFetch.data,
          queryFetch.error,
     ]);

     return queryFetch;
};

export default useQueryApiRequest;
