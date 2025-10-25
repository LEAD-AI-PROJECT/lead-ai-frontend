"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { PublicationResponseType } from "@/types/publication";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAdminPublicationHook() {
     const router = useRouter();
     const [selectedPublication, setSelectedPublication] = useState<PublicationResponseType | null>(
          null
     );
     const [alertDialog, setAlertDialog] = useState(false);
     const [togglePublishId, setTogglePublishId] = useState<string | null>(null);

     // Fetch all publications
     const { data: publicationsData, isLoading } = useQueryApiRequest<
          GlobalApiResponse<PublicationResponseType[]>
     >({
          key: "Publication_Find",
     });

     // Delete mutation
     const deleteMutation = useMutationApiRequest<any, void>({
          key: "Publication_Delete",
          params: { id: selectedPublication?.id },
          options: {
               onSuccess: () => {
                    setAlertDialog(false);
                    setSelectedPublication(null);
               },
          },
     });

     // Toggle publish mutation
     const togglePublishMutation = useMutationApiRequest<any, void>({
          key: "Publication_TogglePublish",
          params: { id: togglePublishId || "" },
          options: {
               onSuccess: () => {
                    setTogglePublishId(null);
               },
          },
     });

     const handleDelete = (id: string) => {
          const publication = publicationsData?.data?.find(p => p.id === id) || null;
          setSelectedPublication(publication);
          setAlertDialog(true);
     };

     const handleDeleteConfirm = async () => {
          if (selectedPublication) {
               deleteMutation.mutate();
          }
     };

     const handleDeleteCancel = () => {
          setAlertDialog(false);
          setSelectedPublication(null);
     };

     const handleTogglePublish = (id: string) => {
          setTogglePublishId(id);
          togglePublishMutation.mutate(undefined);
     };

     return {
          router,
          handleDelete,
          handleDeleteConfirm,
          selectedPublication,
          alertDialog,
          handleDeleteCancel,
          handleTogglePublish,
          publications: publicationsData?.data || [],
          isLoading,
     };
}
