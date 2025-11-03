"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { FormLandingPageResponseType } from "@/types/form-landingpage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAdminFormLandingPageHook() {
     const router = useRouter();
     const [selectedForm, setSelectedForm] = useState<FormLandingPageResponseType | null>(null);
     const [alertDialog, setAlertDialog] = useState(false);
     const [toggleProcessedId, setToggleProcessedId] = useState<string | null>(null);

     // Fetch all form submissions
     const { data: formsData, isLoading } = useQueryApiRequest<
          GlobalApiResponse<FormLandingPageResponseType[]>
     >({
          key: "FormLandingPage_Find",
     });

     // Delete mutation
     const deleteMutation = useMutationApiRequest<any, void>({
          key: "FormLandingPage_Delete",
          params: { id: selectedForm?.id },
          options: {
               onSuccess: () => {
                    setAlertDialog(false);
                    setSelectedForm(null);
               },
          },
     });

     // Toggle processed mutation
     const toggleProcessedMutation = useMutationApiRequest<any, void>({
          key: "FormLandingPage_ToggleProcessed",
          params: { id: toggleProcessedId || "" },
          options: {
               onSuccess: () => {
                    setToggleProcessedId(null);
               },
          },
     });

     const handleDelete = (id: string) => {
          const form = formsData?.data?.find(f => f.id === id) || null;
          setSelectedForm(form);
          setAlertDialog(true);
     };

     const handleDeleteConfirm = async () => {
          if (selectedForm) {
               deleteMutation.mutate();
          }
     };

     const handleDeleteCancel = () => {
          setAlertDialog(false);
          setSelectedForm(null);
     };

     const handleToggleProcessed = (id: string) => {
          setToggleProcessedId(id);
          toggleProcessedMutation.mutate(undefined);
     };

     return {
          router,
          handleDelete,
          handleDeleteConfirm,
          alertDialog,
          handleDeleteCancel,
          handleToggleProcessed,
          forms: formsData?.data || [],
          isLoading,
     };
}
