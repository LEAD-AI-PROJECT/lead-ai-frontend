"use client";
import AlertConfirmation from "@/components/alert/alert.confirmation";
import dayjs from "dayjs";
import { Trash2 } from "lucide-react";
import React from "react";
import useAdminFormLandingPageHook from "./admin.form.landingpage.hook";

interface AdminFormLandingPageViewProps {}

const AdminFormLandingPageView: React.FC<AdminFormLandingPageViewProps> = () => {
     const {
          alertDialog,
          handleDelete,
          handleDeleteConfirm,
          handleDeleteCancel,
          forms,
          isLoading,
     } = useAdminFormLandingPageHook();

     return (
          <div className="flex flex-col gap-6">
               <AlertConfirmation
                    open={alertDialog}
                    message="Are you sure you want to delete this form submission?"
                    onCancel={handleDeleteCancel}
                    onOk={handleDeleteConfirm}
               />

               <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">Landing Page Form Submissions</div>
               </div>

               {isLoading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                         <span className="loading loading-spinner loading-lg"></span>
                    </div>
               ) : (
                    <div>
                         <div className="text-xl font-medium mt-2 mb-4">
                              All Submissions ({forms.length})
                         </div>

                         {forms.length === 0 ? (
                              <div className="card bg-base-200">
                                   <div className="card-body items-center text-center">
                                        <p className="text-base-content/60">
                                             No form submissions yet
                                        </p>
                                   </div>
                              </div>
                         ) : (
                              <div className="overflow-x-auto">
                                   <table className="table table-zebra w-full">
                                        <thead>
                                             <tr>
                                                  <th>No</th>
                                                  <th>Date</th>
                                                  <th>Name</th>
                                                  <th>Email</th>
                                                  <th>Phone</th>
                                                  <th>Company</th>
                                                  {/* <th>Form Type</th> */}
                                                  <th>Message</th>
                                                  {/* <th>Status</th> */}
                                                  <th>Actions</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {forms.map(form => (
                                                  <tr key={form.id}>
                                                       <td>{forms.indexOf(form) + 1}</td>
                                                       <td className="text-xs">
                                                            {dayjs(form.createdAt).format(
                                                                 "DD/MM/YY HH:mm"
                                                            )}
                                                       </td>
                                                       <td>
                                                            {form.firstName} {form.lastName}
                                                       </td>
                                                       <td>{form.email}</td>
                                                       <td>{form.phone || "-"}</td>
                                                       <td>{form.company || "-"}</td>
                                                       {/* <td>
                                                            <div className="badge badge-info badge-sm text-white">
                                                                 {form.formType}
                                                            </div>
                                                       </td> */}
                                                       <td>
                                                            <div className="max-w-xs truncate text-sm">
                                                                 {form.message || "-"}
                                                            </div>
                                                       </td>
                                                       {/* <td>
                                                            {form.isProcessed ? (
                                                                 <div className="badge badge-success badge-sm gap-1 text-white">
                                                                      <CheckCircle size={12} />
                                                                      Processed
                                                                 </div>
                                                            ) : (
                                                                 <div className="badge badge-warning badge-sm gap-1">
                                                                      <XCircle size={12} />
                                                                      Pending
                                                                 </div>
                                                            )}
                                                       </td> */}
                                                       <td>
                                                            <div className="flex gap-2">
                                                                 {/* <button
                                                                      className="btn btn-sm btn-ghost"
                                                                      onClick={() =>
                                                                           handleToggleProcessed(
                                                                                form.id
                                                                           )
                                                                      }
                                                                      title={
                                                                           form.isProcessed
                                                                                ? "Mark as unprocessed"
                                                                                : "Mark as processed"
                                                                      }
                                                                 >
                                                                      {form.isProcessed ? (
                                                                           <XCircle size={16} />
                                                                      ) : (
                                                                           <CheckCircle size={16} />
                                                                      )}
                                                                 </button> */}

                                                                 <button
                                                                      onClick={() =>
                                                                           handleDelete(form.id)
                                                                      }
                                                                      className="btn btn-sm btn-error text-white"
                                                                 >
                                                                      <Trash2 size={16} />
                                                                 </button>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>
                         )}
                    </div>
               )}
          </div>
     );
};

export default AdminFormLandingPageView;
