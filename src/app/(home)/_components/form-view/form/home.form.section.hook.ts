"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { HomeFormSchema } from "./config";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import {
     CreateFormLandingPageRequest,
     FormLandingPageResponseType,
} from "@/types/form-landingpage";
import { useState } from "react";

export default function useHomeFormSectionHook() {
     const [showSuccess, setShowSuccess] = useState(false);

     const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
          reset,
     } = useForm({
          resolver: yupResolver(HomeFormSchema),
          defaultValues: {
               firstName: "",
               lastName: "",
               email: "",
               phone: "",
               company: "",
               message: "",
               formType: "contact",
          },
     });

     const createMutation = useMutationApiRequest<
          GlobalApiResponse<FormLandingPageResponseType>,
          CreateFormLandingPageRequest
     >({
          key: "FormLandingPage_Create",
          options: {
               onSuccess: () => {
                    setShowSuccess(true);
                    reset();
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                         setShowSuccess(false);
                    }, 5000);
               },
          },
     });

     const onSubmit = async (data: any) => {
          const payload: CreateFormLandingPageRequest = {
               firstName: data.firstName,
               lastName: data.lastName,
               email: data.email,
               phone: data.phone,
               company: data.company,
               message: data.message,
               formType: "contact",
          };

          createMutation.mutate(payload);
     };

     return {
          register,
          handleSubmit: handleSubmit(onSubmit),
          errors,
          isSubmitting: isSubmitting || createMutation.isPending,
          showSuccess,
     };
}
