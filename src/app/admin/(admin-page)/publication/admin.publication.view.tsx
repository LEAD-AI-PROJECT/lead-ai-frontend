"use client";
import React from "react";
import { AdminPublicationItem } from "./_components/admin.publication.item";
import AdminPublicationCardView from "./_components/card/admin.publication.card.view";
import { Plus } from "lucide-react";
import AlertConfirmation from "@/components/alert/alert.confirmation";
import useAdminPublicationHook from "./admin.publication.hook";

interface AdminPublicationViewProps {}

const AdminPublicationView: React.FC<AdminPublicationViewProps> = () => {
     const {
          router,
          alertDialog,
          handleDelete,
          handleDeleteConfirm,
          selectedPublication,
          handleDeleteCancel,
     } = useAdminPublicationHook();

     return (
          <div className="flex flex-col gap-6">
               <AlertConfirmation
                    open={alertDialog}
                    message="Are you sure you want to delete this item?"
                    onCancel={handleDeleteCancel}
                    onOk={handleDeleteConfirm}
               />
               <div className="flex items-center justify-between">
                    <div className="text-3xl">Admin Publication</div>
                    <button
                         onClick={() => router.push("/admin/publication/upsert")}
                         className="btn btn-outline btn-sm"
                    >
                         <Plus />
                         Create
                    </button>
               </div>

               <div>
                    <div className="text-xl font-medium mt-2 mb-4">Existing Items</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {AdminPublicationItem.map(item => (
                              <AdminPublicationCardView
                                   key={item.id}
                                   {...item}
                                   handleDelete={handleDelete}
                              />
                         ))}
                    </div>
               </div>
          </div>
     );
};

export default AdminPublicationView;
