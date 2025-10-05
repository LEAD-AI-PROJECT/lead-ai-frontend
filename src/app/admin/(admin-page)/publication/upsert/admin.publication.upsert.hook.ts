"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import { PublicationUpsertSchema } from "./_components/config";

export default function useAdminPublicationUpsertHook() {
     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
     const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
          control,
          getValues,
          setValue,
     } = useForm({
          resolver: yupResolver(PublicationUpsertSchema),
          mode: "onSubmit", // or "onChange" kalau mau realtime
     });

     const { mutateAsync: create } = useMutationApiRequest<
          GlobalApiResponse<any>,
          typeof PublicationUpsertSchema
     >({
          key: "NewsEvent_Create",
     });

     const onSubmit = () => {
          const value = getValues();
          console.log("submit", value);
     };

     const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          // create object URL for quick preview
          const objectUrl = URL.createObjectURL(file);
          setPreviewUrl(objectUrl);

          // also read file as data URL for form submission (base64)
          const reader = new FileReader();
          reader.onload = () => {
               const result = reader.result as string | null;
               if (result) {
                    // set the img_url form field to the base64 data URL
                    setValue("img_url", result);
               }
          };
          reader.readAsDataURL(file);
     };
     return {
          register,
          handleSubmit: handleSubmit(onSubmit), // wrap with onSubmit
          errors,
          isSubmitting,
          control,
          setValue,
          previewUrl,
          onFileChange,
     };
}
