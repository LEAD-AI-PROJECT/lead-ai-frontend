"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminPublicationItem } from "./_components/admin.publication.item";
import { PublicationResponseType } from "@/types/publication";

export default function useAdminPublicationHook() {
     const router = useRouter();
     const [selectedPublication, setSelectedPublication] = useState<PublicationResponseType | null>(
          null
     );
     const [alertDialog, setAlertDialog] = useState(false);

     const handleDelete = (id: string) => {
          const Publication =
               AdminPublicationItem.find(Publication => Publication.id === id) || null;
          setSelectedPublication(Publication);
          setAlertDialog(true);
     };

     const handleDeleteConfirm = async () => {
          setAlertDialog(false);
          setSelectedPublication(null);
     };

     const handleDeleteCancel = () => {
          setAlertDialog(false);
          setSelectedPublication(null);
     };
     return {
          router,
          handleDelete,
          handleDeleteConfirm,
          selectedPublication,
          alertDialog,
          handleDeleteCancel,
     };
}
