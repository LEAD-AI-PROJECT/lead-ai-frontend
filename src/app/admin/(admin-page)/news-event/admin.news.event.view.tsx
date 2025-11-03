"use client";
import React from "react";
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
          handleDeleteCancel,
          handleTogglePublish,
          newsEvents,
          isLoading,
     } = useAdminNewsEventHook();

     return (
          <div className="flex flex-col gap-6">
               <AlertConfirmation
                    open={alertDialog}
                    message="Are you sure you want to delete this news/event?"
                    onCancel={handleDeleteCancel}
                    onOk={handleDeleteConfirm}
               />

               <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">Admin News & Events</div>
                    <button
                         onClick={() => router.push("/admin/news-event/upsert")}
                         className="btn btn-primary btn-sm gap-2"
                    >
                         <Plus size={18} />
                         Create New
                    </button>
               </div>

               {isLoading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                         <span className="loading loading-spinner loading-lg"></span>
                    </div>
               ) : (
                    <div>
                         <div className="text-xl font-medium mt-2 mb-4">
                              All News & Events ({newsEvents.length})
                         </div>

                         {newsEvents.length === 0 ? (
                              <div className="card bg-base-200">
                                   <div className="card-body items-center text-center">
                                        <p className="text-base-content/60">No news/events found</p>
                                        <button
                                             onClick={() => router.push("/admin/news-event/upsert")}
                                             className="btn btn-primary btn-sm mt-4"
                                        >
                                             Create First News/Event
                                        </button>
                                   </div>
                              </div>
                         ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                   {newsEvents.map(item => (
                                        <AdminNewsEventCardView
                                             key={item.id}
                                             item={item}
                                             handleDelete={handleDelete}
                                             handleTogglePublish={handleTogglePublish}
                                        />
                                   ))}
                              </div>
                         )}
                    </div>
               )}
          </div>
     );
};

export default AdminNewsEventView;
