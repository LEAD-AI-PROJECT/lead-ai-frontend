"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { NewsEventResponseType } from "@/types/news-event";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAdminNewsEventHook() {
     const router = useRouter();
     const [selectedNewsEvent, setSelectedNewsEvent] = useState<NewsEventResponseType | null>(null);
     const [alertDialog, setAlertDialog] = useState(false);
     const [togglePublishId, setTogglePublishId] = useState<string | null>(null);

     // Fetch all news events
     const { data: newsEventsData, isLoading } = useQueryApiRequest<
          GlobalApiResponse<NewsEventResponseType[]>
     >({
          key: "NewsEvent_Find",
     });

     // Delete mutation
     const deleteMutation = useMutationApiRequest<any, void>({
          key: "NewsEvent_Delete",
          params: { id: selectedNewsEvent?.id },
          options: {
               onSuccess: () => {
                    setAlertDialog(false);
                    setSelectedNewsEvent(null);
               },
          },
     });

     // Toggle publish mutation
     const togglePublishMutation = useMutationApiRequest<any, void>({
          key: "NewsEvent_TogglePublish",
          params: { id: togglePublishId || "" },
          options: {
               onSuccess: () => {
                    setTogglePublishId(null);
               },
          },
     });

     const handleDelete = (id: string) => {
          const newsEvent = newsEventsData?.data?.find(ne => ne.id === id) || null;
          setSelectedNewsEvent(newsEvent);
          setAlertDialog(true);
     };

     const handleDeleteConfirm = async () => {
          if (selectedNewsEvent) {
               deleteMutation.mutate();
          }
     };

     const handleDeleteCancel = () => {
          setAlertDialog(false);
          setSelectedNewsEvent(null);
     };

     const handleTogglePublish = (id: string) => {
          setTogglePublishId(id);
          togglePublishMutation.mutate(undefined);
     };

     return {
          router,
          handleDelete,
          handleDeleteConfirm,
          selectedNewsEvent,
          alertDialog,
          handleDeleteCancel,
          handleTogglePublish,
          newsEvents: newsEventsData?.data || [],
          isLoading,
     };
}
