"use client";
import React from "react";
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
          handleDeleteCancel,
          handleTogglePublish,
          publications,
          isLoading,
     } = useAdminPublicationHook();

     return (
          <div className="flex flex-col gap-6">
               <AlertConfirmation
                    open={alertDialog}
                    message="Are you sure you want to delete this publication?"
                    onCancel={handleDeleteCancel}
                    onOk={handleDeleteConfirm}
               />

               <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">Admin Publications</div>
                    <button
                         onClick={() => router.push("/admin/publication/upsert")}
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
                              All Publications ({publications.length})
                         </div>

                         {publications.length === 0 ? (
                              <div className="card bg-base-200">
                                   <div className="card-body items-center text-center">
                                        <p className="text-base-content/60">
                                             No publications found
                                        </p>
                                        <button
                                             onClick={() =>
                                                  router.push("/admin/publication/upsert")
                                             }
                                             className="btn btn-primary btn-sm mt-4"
                                        >
                                             Create First Publication
                                        </button>
                                   </div>
                              </div>
                         ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                   {publications.map(item => (
                                        <AdminPublicationCardView
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

export default AdminPublicationView;
