"use client";
import { NewsEventResponseType } from "@/types/news-event";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminNewsEventItem } from "./_components/admin.news.event.item";

export default function useAdminNewsEventHook() {
     const router = useRouter();
     const [selectedNewsEvent, setSelectedNewsEvent] = useState<NewsEventResponseType | null>(null);
     const [alertDialog, setAlertDialog] = useState(false);

     const handleDelete = (id: string) => {
          const newsEvent = AdminNewsEventItem.find(newsEvent => newsEvent.id === id) || null;
          setSelectedNewsEvent(newsEvent);
          setAlertDialog(true);
     };

     const handleDeleteConfirm = async () => {
          setAlertDialog(false);
          setSelectedNewsEvent(null);
     };

     const handleDeleteCancel = () => {
          setAlertDialog(false);
          setSelectedNewsEvent(null);
     };
     return {
          router,
          handleDelete,
          handleDeleteConfirm,
          selectedNewsEvent,
          alertDialog,
          handleDeleteCancel,
     };
}
