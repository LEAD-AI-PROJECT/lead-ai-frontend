"use client";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import { GlobalSectionMenuEnum } from "@/types/enums/menu.enum";
import { FooterContent } from "@/types/menu-management/global-section";
import { footerValidationSchema } from "../config";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface UseAdminGlobalSectionFooterFormProps {
     initialData?: FooterContent;
}

type FormData = FooterContent;

export default function useAdminGlobalSectionFooterForm({
     initialData,
}: UseAdminGlobalSectionFooterFormProps) {
     const [showSuccess, setShowSuccess] = useState(false);

     const form = useForm({
          resolver: yupResolver(footerValidationSchema),
          defaultValues: initialData || {
               columns: [
                    {
                         title: "",
                         items: [{ label: "", link: "" }],
                    },
               ],
               copyright: "",
               socialLinks: [{ icon: "", link: "" }],
          },
     });

     // Update form when initialData changes
     useEffect(() => {
          if (initialData) {
               form.reset(initialData);
          }
     }, [initialData, form]);

     // Auto-hide success message
     useEffect(() => {
          if (showSuccess) {
               const timer = setTimeout(() => setShowSuccess(false), 5000);
               return () => clearTimeout(timer);
          }
     }, [showSuccess]);

     const backendType = useMemo(() => GlobalSectionMenuEnum[GlobalSectionMenuEnum.FOOTER], []);

     const { mutate: upsertGlobalSection, isPending } = useMutationApiRequest({
          key: "GlobalSection_Upsert",
          params: {
               type: backendType,
          },
          config: {
               successNotificationMessage: "Footer updated successfully!",
               errorNotificationMessage: "Failed to update footer",
          },
     });

     const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
          upsertGlobalSection(
               {
                    content: data,
               },
               {
                    onSuccess: () => {
                         setShowSuccess(true);
                    },
               }
          );
     };

     return {
          form,
          onSubmit: form.handleSubmit(onSubmit),
          isPending,
          showSuccess,
     };
}
