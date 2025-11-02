"use client";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import { GlobalSectionMenuEnum } from "@/types/enums/menu.enum";
import { HeaderContent } from "@/types/menu-management/global-section";
import { UploadLogoCallbackResponse } from "@/types/api/responses";
import { headerValidationSchema } from "../config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface UseAdminGlobalSectionHeaderFormProps {
     initialData?: HeaderContent;
}

type FormData = HeaderContent;

export default function useAdminGlobalSectionHeaderForm({
     initialData,
}: UseAdminGlobalSectionHeaderFormProps) {
     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
     const [isUploadingLogo, setIsUploadingLogo] = useState(false);
     const [showSuccess, setShowSuccess] = useState(false);
     const [showLogoSuccess, setShowLogoSuccess] = useState(false);

     const form = useForm<FormData>({
          resolver: yupResolver(headerValidationSchema),
          defaultValues: initialData || {
               logo: { label: "", link: "" },
               navItems: [{ label: "", link: "" }],
               loginButton: { label: "Login", link: "/auth/login" },
               cta: { label: "Try Lead.AI", link: "/signup" },
          },
     });

     // Update form when initialData changes
     useEffect(() => {
          if (initialData) {
               form.reset(initialData);
               // Set preview to stored ImageKit URL from DB
               const logoLink = (initialData.logo as any)?.link;
               if (logoLink) {
                    setPreviewUrl(logoLink);
               }
          }
     }, [initialData, form]);

     const backendType = useMemo(() => GlobalSectionMenuEnum[GlobalSectionMenuEnum.HEADER], []);

     // Mutation for upsert global section
     const { mutate: upsertGlobalSection, isPending } = useMutationApiRequest({
          key: "GlobalSection_Upsert",
          params: {
               type: backendType,
          },
          config: {
               successNotificationMessage: "Header updated successfully!",
               errorNotificationMessage: "Failed to update header",
          },
     });

     // Mutation for upload logo
     const { mutate: uploadLogo, isPending: isUploadingLogoMutation } = useMutationApiRequest<
          { data: { url: string } },
          FormData
     >({
          key: "GlobalSection_UploadLogo",
          config: {
               successNotificationMessage: "Logo uploaded successfully!",
               errorNotificationMessage: "Failed to upload logo",
          },
     });

     const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
          upsertGlobalSection({
               content: data,
          });

          // Show success message
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 5000);
     };

     const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          try {
               setIsUploadingLogo(true);

               // Set preview immediately
               const objectUrl = URL.createObjectURL(file);
               setPreviewUrl(objectUrl);

               // Upload logo using mutation
               const formData = new FormData();
               formData.append("file", file);

               uploadLogo(formData as any, {
                    onSuccess: (response: UploadLogoCallbackResponse) => {
                         // Get ImageKit CDN URL from backend response
                         const uploadedUrl = response?.data?.url;
                         if (uploadedUrl) {
                              // Store ImageKit URL in form (not blob)
                              form.setValue("logo.link", uploadedUrl);
                              // Show ImageKit URL in preview
                              setPreviewUrl(uploadedUrl);

                              // Show success message
                              setShowLogoSuccess(true);
                              setTimeout(() => setShowLogoSuccess(false), 5000);
                         }
                    },
                    onError: () => {
                         // On error, restore to stored database URL
                         const logoLink = (initialData?.logo as any)?.link;
                         if (logoLink) {
                              setPreviewUrl(logoLink);
                         } else {
                              setPreviewUrl(null);
                         }
                    },
               });
          } catch (error) {
               console.error("Failed to upload logo:", error);
               // On error, restore to stored database URL
               const logoLink = (initialData?.logo as any)?.link;
               if (logoLink) {
                    setPreviewUrl(logoLink);
               } else {
                    setPreviewUrl(null);
               }
          } finally {
               setIsUploadingLogo(false);
          }
     };

     return {
          form,
          onSubmit: form.handleSubmit(onSubmit),
          isPending,
          previewUrl,
          onFileChange,
          isUploadingLogo: isUploadingLogo || isUploadingLogoMutation,
          showSuccess,
          showLogoSuccess,
     };
}
