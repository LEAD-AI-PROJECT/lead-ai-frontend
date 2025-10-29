"use client";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import { HomeSectionMenuEnum } from "@/types/enums/menu.enum";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { HomeSectionFormConfig } from "./config";

interface UseAdminMenuManagementHomeSectionFormProps {
     type: HomeSectionMenuEnum;
     initialData?: {
          title: string;
          description?: string | null;
     };
}

type FormData = {
     title: string;
     description: string | null;
};

export default function useAdminMenuManagementHomeSectionForm({
     type,
     initialData,
}: UseAdminMenuManagementHomeSectionFormProps) {
     const form = useForm<FormData>({
          resolver: yupResolver(HomeSectionFormConfig) as any,
          defaultValues: {
               title: initialData?.title || "",
               description: initialData?.description || null,
          },
     });

     // Update form when initialData changes
     useEffect(() => {
          if (initialData) {
               form.reset({
                    title: initialData.title || "",
                    description: initialData.description || "",
               });
          }
     }, [initialData, form]);

     const backendType = useMemo(() => HomeSectionMenuEnum[type], [type]);

     const { mutate: upsertHomeSection, isPending } = useMutationApiRequest({
          key: "HomeSection_Upsert",
          params: {
               type: backendType,
          },
          config: {
               successNotificationMessage: "Home section updated successfully!",
               errorNotificationMessage: "Failed to update home section",
          },
     });

     const onSubmit = form.handleSubmit((data: FormData) => {
          upsertHomeSection({
               title: data.title,
               description: data.description || null,
          });
     });

     return {
          form,
          onSubmit,
          isPending,
     };
}
