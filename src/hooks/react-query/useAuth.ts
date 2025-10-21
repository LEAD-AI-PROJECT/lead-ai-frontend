import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { allMutations } from "@/data-services/mutations";
import { constructUrl } from "@/data-services/utils/constructUrl";
import {
     LoginRequest,
     RegisterRequest,
     ForgetPasswordRequest,
     ResetPasswordRequest,
     AuthResponse,
     GlobalResponse,
     ForgetPasswordResponse,
     User,
} from "@/types/auth";

// Base API URL - adjust according to your backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4444";

// Configure axios
const apiClient = axios.create({
     baseURL: API_BASE_URL,
     headers: {
          "Content-Type": "application/json",
     },
     withCredentials: true, // Important for cookie-based authentication
});

// Add request interceptor to include access token
apiClient.interceptors.request.use(config => {
     const token = Cookies.get("accessToken");
     if (token) {
          config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
});

export const useAuth = () => {
     const queryClient = useQueryClient();

     // Login mutation
     const loginMutation = useMutation<GlobalResponse<AuthResponse>, Error, LoginRequest>({
          mutationFn: async (credentials: LoginRequest) => {
               const url = constructUrl(API_BASE_URL + allMutations.login.url);
               console.log("🔍 Login attempt:", { url, credentials: { email: credentials.email } });
               try {
                    const response = await apiClient.post(url, credentials);
                    console.log("✅ Login response:", response.data);
                    console.log("🍪 Response headers:", response.headers);
                    console.log("🍪 Set-Cookie header:", response.headers["set-cookie"]);
                    return response.data;
               } catch (error: any) {
                    console.error("❌ Login error:", error.response?.data || error.message);
                    throw error;
               }
          },
          onSuccess: data => {
               // Store tokens in cookies
               if (data.success && data.data.accessToken) {
                    console.log(
                         "🍪 Setting accessToken cookie:",
                         data.data.accessToken.substring(0, 20) + "..."
                    );

                    const cookieOptions = {
                         expires: 7, // 7 days
                         secure: process.env.NODE_ENV === "production",
                         sameSite: "strict" as const,
                         path: "/", // Explicitly set path
                    };

                    console.log("🍪 Cookie options:", cookieOptions);

                    Cookies.set("accessToken", data.data.accessToken, cookieOptions);

                    if (data.data.refreshToken) {
                         console.log("🍪 Setting refreshToken cookie");
                         Cookies.set("refreshToken", data.data.refreshToken, {
                              expires: 30, // 30 days
                              secure: process.env.NODE_ENV === "production",
                              sameSite: "strict",
                              path: "/", // Explicitly set path
                         });
                    }

                    // Verify cookies were set
                    setTimeout(() => {
                         console.log("🌍 Environment check:", {
                              NODE_ENV: process.env.NODE_ENV,
                              isSecure: cookieOptions.secure,
                              protocol: globalThis.window?.location.protocol,
                              hostname: globalThis.window?.location.hostname,
                         });

                         const savedToken = Cookies.get("accessToken");
                         const directToken = getCookieFromDocument("accessToken");

                         console.log("🍪 Cookie verification after set:", {
                              viaJsCookie: savedToken ? "EXISTS" : "NOT_FOUND",
                              viaDocument: directToken ? "EXISTS" : "NOT_FOUND",
                              rawCookies: globalThis.window?.document.cookie,
                         });
                    }, 100);

                    // Store user data in React Query cache
                    queryClient.setQueryData(["user"], data.data.user);
               }
          },
     });

     // Register mutation
     const registerMutation = useMutation<GlobalResponse<AuthResponse>, Error, RegisterRequest>({
          mutationFn: async (userData: RegisterRequest) => {
               const url = constructUrl(API_BASE_URL + allMutations.register.url);
               const response = await apiClient.post(url, userData);
               return response.data;
          },
          onSuccess: data => {
               if (data.success && data.data.accessToken) {
                    Cookies.set("accessToken", data.data.accessToken, {
                         expires: 7,
                         secure: process.env.NODE_ENV === "production",
                         sameSite: "strict",
                    });

                    if (data.data.refreshToken) {
                         Cookies.set("refreshToken", data.data.refreshToken, {
                              expires: 30,
                              secure: process.env.NODE_ENV === "production",
                              sameSite: "strict",
                         });
                    }

                    queryClient.setQueryData(["user"], data.data.user);
               }
          },
     });

     // Logout mutation
     const logoutMutation = useMutation<GlobalResponse<{ message: string }>, Error, void>({
          mutationFn: async () => {
               const url = constructUrl(API_BASE_URL + allMutations.logout.url);
               const response = await apiClient.post(url);
               return response.data;
          },
          onSuccess: () => {
               // Clear cookies and cache
               Cookies.remove("accessToken");
               Cookies.remove("refreshToken");
               queryClient.clear();
          },
     });

     // Forget password mutation
     const forgetPasswordMutation = useMutation<
          GlobalResponse<ForgetPasswordResponse>,
          Error,
          ForgetPasswordRequest
     >({
          mutationFn: async (data: ForgetPasswordRequest) => {
               const url = constructUrl(API_BASE_URL + allMutations.forgetPassword.url);
               const response = await apiClient.post(url, data);
               return response.data;
          },
     });

     // Reset password mutation
     const resetPasswordMutation = useMutation<
          GlobalResponse<{ message: string }>,
          Error,
          ResetPasswordRequest
     >({
          mutationFn: async (data: ResetPasswordRequest) => {
               const url = constructUrl(API_BASE_URL + allMutations.resetPassword.url);
               const response = await apiClient.post(url, data);
               return response.data;
          },
     });

     // Get current user query - Always try to validate with backend
     const userQuery = useQuery<User | null>({
          queryKey: ["user"],
          queryFn: async () => {
               try {
                    console.log(
                         "🔍 Always trying to validate user with backend (cookies might be httpOnly)..."
                    );
                    const response = await apiClient.get("/auth/validate");
                    console.log("✅ User validation response:", response.data);

                    if (response.data.success && response.data.data) {
                         console.log("🎉 User is authenticated:", response.data.data);
                         return response.data.data;
                    }
                    console.log("❌ Validation failed - no user data");
                    return null;
               } catch (error: any) {
                    console.error(
                         "❌ Failed to validate user:",
                         error.response?.status,
                         error.response?.data || error.message
                    );
                    return null;
               }
          },
          staleTime: 5 * 60 * 1000, // 5 minutes
          retry: false,
          refetchOnWindowFocus: false,
     });

     // Helper function to get cookie from document.cookie directly
     const getCookieFromDocument = (name: string): string | null => {
          if (globalThis.window === undefined) return null;

          const value = `; ${globalThis.document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) {
               const cookieValue = parts.pop()?.split(";").shift();
               return cookieValue || null;
          }
          return null;
     };

     // Helper functions
     const isAuthenticated = () => {
          // Since cookies are httpOnly, we rely on React Query cache
          // If user data exists and query is not in error state, user is authenticated
          const hasValidUser = !!userQuery.data && !userQuery.isError;
          console.log("🔐 Authentication check:", {
               hasUser: !!userQuery.data,
               isError: userQuery.isError,
               isLoading: userQuery.isLoading,
               authenticated: hasValidUser,
          });
          return hasValidUser;
     };

     const isLoading = () => {
          return (
               loginMutation.isPending ||
               registerMutation.isPending ||
               logoutMutation.isPending ||
               userQuery.isLoading
          );
     };

     return {
          // Mutations
          login: loginMutation.mutate,
          register: registerMutation.mutate,
          logout: logoutMutation.mutate,
          forgetPassword: forgetPasswordMutation.mutate,
          resetPassword: resetPasswordMutation.mutate,

          // States
          loginState: {
               isLoading: loginMutation.isPending,
               isError: loginMutation.isError,
               error: loginMutation.error,
               isSuccess: loginMutation.isSuccess,
               data: loginMutation.data,
          },

          registerState: {
               isLoading: registerMutation.isPending,
               isError: registerMutation.isError,
               error: registerMutation.error,
               isSuccess: registerMutation.isSuccess,
               data: registerMutation.data,
          },

          logoutState: {
               isLoading: logoutMutation.isPending,
               isError: logoutMutation.isError,
               error: logoutMutation.error,
               isSuccess: logoutMutation.isSuccess,
          },

          forgetPasswordState: {
               isLoading: forgetPasswordMutation.isPending,
               isError: forgetPasswordMutation.isError,
               error: forgetPasswordMutation.error,
               isSuccess: forgetPasswordMutation.isSuccess,
               data: forgetPasswordMutation.data,
          },

          resetPasswordState: {
               isLoading: resetPasswordMutation.isPending,
               isError: resetPasswordMutation.isError,
               error: resetPasswordMutation.error,
               isSuccess: resetPasswordMutation.isSuccess,
               data: resetPasswordMutation.data,
          },

          // User data
          user: userQuery.data,
          userLoading: userQuery.isLoading,
          userError: userQuery.error,

          // Helper functions
          isAuthenticated,
          isLoading,

          // Reset functions
          resetLoginState: () => loginMutation.reset(),
          resetRegisterState: () => registerMutation.reset(),
          resetForgetPasswordState: () => forgetPasswordMutation.reset(),
          resetResetPasswordState: () => resetPasswordMutation.reset(),
     };
};
