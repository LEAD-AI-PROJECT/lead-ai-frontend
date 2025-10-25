import { useForm } from "react-hook-form";
import { AdminProfileChangePasswordSchema } from "./config";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import { ChangePasswordRequest } from "@/types/user";
import { useState } from "react";

export default function useAdminProfilePasswordHook() {
     const [showSuccess, setShowSuccess] = useState(false);

     const {
          register: pwdRegister,
          handleSubmit: pwdHandleSubmit,
          watch,
          reset,
          formState: { errors: pwdErrors, isSubmitting: pwdSubmitting },
     } = useForm({ mode: "onSubmit", resolver: yupResolver(AdminProfileChangePasswordSchema) });

     // Change password mutation
     const changePasswordMutation = useMutationApiRequest<
          GlobalApiResponse<void>,
          ChangePasswordRequest
     >({
          key: "User_ChangePassword",
          options: {
               onSuccess: () => {
                    setShowSuccess(true);
                    reset();
                    setTimeout(() => setShowSuccess(false), 5000);
               },
               onError: (error: any) => {
                    window.alert(
                         error?.response?.data?.message ||
                              error?.message ||
                              "Failed to change password"
                    );
               },
          },
     });

     const onSubmit = async (data: any) => {
          await changePasswordMutation.mutateAsync({
               currentPassword: data.current_password,
               newPassword: data.new_password,
          });
     };

     const validateConfirm = (v: string) => v === watch("new_password") || "Passwords must match";

     const renderError = (err: any) => {
          if (!err) return null;
          if (typeof err.message === "string") return err.message;
          return "";
     };

     return {
          pwdRegister,
          pwdHandleSubmit: pwdHandleSubmit(onSubmit),
          pwdErrors,
          pwdSubmitting: pwdSubmitting || changePasswordMutation.isPending,
          validateConfirm,
          renderError,
          showSuccess,
     };
}
