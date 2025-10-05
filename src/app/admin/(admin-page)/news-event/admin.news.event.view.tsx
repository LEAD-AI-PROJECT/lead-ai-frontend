"use client";
import React from "react";
import { AdminNewsEventItem } from "./_components/admin.news.event.item";
import AdminNewsEventCardView from "./_components/card/admin.news.event.card.view";
import { Plus } from "lucide-react";
import useAdminNewsEventHook from "./admin.news.event.hook";
import AlertConfirmation from "@/components/alert/alert.confirmation";

interface AdminNewsEventViewProps {}

const AdminNewsEventView: React.FC<AdminNewsEventViewProps> = () => {
     const {
          router,
          alertDialog,
          handleDelete,
          handleDeleteConfirm,
          selectedNewsEvent,
          handleDeleteCancel,
     } = useAdminNewsEventHook();

     return (
          <div className="flex flex-col gap-6">
               <AlertConfirmation
                    open={alertDialog}
                    message="Are you sure you want to delete this item?"
                    onCancel={handleDeleteCancel}
                    onOk={handleDeleteConfirm}
               />
               <div className="flex items-center justify-between">
                    <div className="text-3xl">Admin News & Events</div>
                    <button
                         onClick={() => router.push("/admin/news-event/upsert")}
                         className="btn btn-outline btn-sm"
                    >
                         <Plus />
                         Create
                    </button>
               </div>

               <div>
                    <div className="text-xl font-medium mt-2 mb-4">Existing Items</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                         {AdminNewsEventItem.map(item => (
                              <AdminNewsEventCardView
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

export default AdminNewsEventView;
