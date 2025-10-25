"use client";
import { useAuth } from "@/hooks/react-query/useAuth";

import { RoleGuard } from "@/lib/guards";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginFormData, STORAGE_KEYS } from "./config";

// Utility functions for remember me functionality
const rememberMeUtils = {
     // Save email to localStorage when remember me is checked
     saveEmail: (email: string) => {
          if (globalThis.window !== undefined) {
               globalThis.localStorage.setItem(STORAGE_KEYS.SAVED_EMAIL, email);
               globalThis.localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, "true");
          }
     },

     // Get saved email from localStorage
     getSavedEmail: (): string => {
          if (globalThis.window !== undefined) {
               return globalThis.localStorage.getItem(STORAGE_KEYS.SAVED_EMAIL) || "";
          }
          return "";
     },

     // Check if remember me was previously enabled
     wasRemembered: (): boolean => {
          if (globalThis.window !== undefined) {
               return globalThis.localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
          }
          return false;
     },

     // Clear saved credentials
     clearSaved: () => {
          if (globalThis.window !== undefined) {
               globalThis.localStorage.removeItem(STORAGE_KEYS.SAVED_EMAIL);
               globalThis.localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
          }
     },
};

export function useAuthLogin() {
     const router = useRouter();
     const pathname = usePathname();
     const searchParams = useSearchParams();

     const { login, loginState, isAuthenticated, user, resetLoginState, userLoading } = useAuth();

     // React Hook Form with Yup validation
     const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
          setValue,
          watch,
          reset,
          clearErrors,
     } = useForm<LoginFormData>({
          resolver: yupResolver(loginSchema),
          defaultValues: {
               email: "",
               password: "",
               rememberMe: false,
          },
     });

     const watchedRememberMe = watch("rememberMe");

     // Load saved credentials on component mount
     useEffect(() => {
          const savedEmail = rememberMeUtils.getSavedEmail();
          const wasRemembered = rememberMeUtils.wasRemembered();

          if (savedEmail && wasRemembered) {
               console.log("💾 Loading saved credentials:", { email: savedEmail });
               setValue("email", savedEmail);
               setValue("rememberMe", true);
          }
     }, [setValue]);

     // Handle successful login
     useEffect(() => {
          if (loginState.isSuccess && loginState.data?.success) {
               console.log("🎉 Login successful, user role:", user?.role);

               const currentEmail = watch("email");
               const currentRememberMe = watch("rememberMe");

               // Handle remember me functionality
               if (currentRememberMe && currentEmail) {
                    console.log("💾 Saving credentials for remember me");
                    rememberMeUtils.saveEmail(currentEmail);
               } else if (!currentRememberMe) {
                    console.log("🗑️ Clearing saved credentials");
                    rememberMeUtils.clearSaved();
               }

               // Check if user has admin privileges
               if (RoleGuard.canAccessAdmin(user?.role)) {
                    const redirect = searchParams.get("redirect");
                    console.log("👑 Admin user, redirecting to:", redirect || "/admin");
                    router.push(redirect || "/admin");
               } else if (user?.role === "MEMBER") {
                    const redirect = searchParams.get("redirect");
                    console.log("👤 Member user, redirecting to:", redirect || "/");
                    router.push(redirect || "/");
               } else {
                    alert("Access denied. Please contact administrator.");
                    resetLoginState();
               }
          }
     }, [
          loginState.isSuccess,
          loginState.data,
          user,
          router,
          resetLoginState,
          searchParams,
          watch,
     ]);

     // Handle login errors
     useEffect(() => {
          if (loginState.isError && loginState.error) {
               console.error("❌ Login error:", loginState.error);
          }
     }, [loginState.isError, loginState.error]);

     // Redirect if already authenticated (only from login page)
     useEffect(() => {
          console.log("🔍 Auth check:", {
               isAuth: isAuthenticated(),
               pathname,
               userRole: user?.role,
               hasUser: !!user,
               userLoading,
          });

          // Don't redirect if still loading user data
          if (userLoading) {
               console.log("⏳ User data still loading...");
               return;
          }

          if (isAuthenticated() && pathname.includes("/login")) {
               console.log("🔄 Already authenticated, user data ready");

               if (user?.role) {
                    console.log("👤 User role found:", user.role);

                    if (RoleGuard.canAccessAdmin(user?.role)) {
                         const redirect = searchParams.get("redirect");
                         console.log("👑 Redirecting admin to:", redirect || "/admin");
                         router.push(redirect || "/admin");
                    } else if (user?.role === "MEMBER") {
                         const redirect = searchParams.get("redirect");
                         console.log("👤 Redirecting member to:", redirect || "/");
                         router.push(redirect || "/");
                    }
               } else {
                    console.log("❌ No user role found, token might be invalid");
                    // Token exists but no user data - might be invalid token
                    resetLoginState();
               }
          }
     }, [isAuthenticated, user, userLoading, router, pathname, searchParams, resetLoginState]);

     // Handle form submission
     const onSubmit = (data: LoginFormData) => {
          console.log("🚀 Attempting login with:", { email: data.email });
          clearErrors();
          resetLoginState();

          login({
               email: data.email.trim(),
               password: data.password.trim(),
          });
     };

     // Handle remember me toggle
     const handleRememberMeChange = (checked: boolean) => {
          setValue("rememberMe", checked);

          // If unchecking remember me, clear saved credentials
          if (!checked) {
               console.log("❌ Remember me unchecked, clearing saved credentials");
               rememberMeUtils.clearSaved();
          }
     };

     // Clear form and optionally saved credentials
     const clearForm = (clearSaved = false) => {
          reset();
          resetLoginState();

          if (clearSaved) {
               console.log("🗑️ Clearing saved credentials");
               rememberMeUtils.clearSaved();
          }
     };

     return {
          // React Hook Form methods
          register,
          handleSubmit: handleSubmit(onSubmit),
          errors,
          setValue,
          watch,

          // Auth states
          isLoading: loginState.isLoading || isSubmitting,
          isError: loginState.isError,
          error: loginState.error?.message || "",
          isSuccess: loginState.isSuccess,

          // Additional data
          user,
          isAuthenticated: isAuthenticated(),

          // Helper functions
          resetLoginState,
          clearForm,
          handleRememberMeChange,

          // Remember me utilities
          clearSavedCredentials: () => clearForm(true),
          hasSavedCredentials: rememberMeUtils.wasRemembered(),
          watchedRememberMe,
     };
}
