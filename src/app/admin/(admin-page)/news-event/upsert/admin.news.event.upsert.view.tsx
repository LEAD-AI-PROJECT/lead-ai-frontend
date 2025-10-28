"use client";
import { ArrowLeft, X } from "lucide-react";
import useAdminNewsEventUpsertHook from "./admin.news.event.upsert.hook";
import Image from "next/image";

interface AdminNewsEventUpsertViewProps {
     slug?: string;
}

export default function AdminNewsEventUpsertView({ slug }: AdminNewsEventUpsertViewProps) {
     const {
          errors,
          handleSubmit,
          isSubmitting,
          register,
          onFileChange,
          imageUrls,
          uploadingImages,
          removeImage,
          router,
          isEditMode,
          isLoading,
     } = useAdminNewsEventUpsertHook(slug);

     if (isLoading) {
          return (
               <div className="flex items-center justify-center min-h-screen">
                    <span className="loading loading-spinner loading-lg"></span>
               </div>
          );
     }

     return (
          <div className="lg:w-2/3">
               <div className="flex items-center gap-4 mb-6">
                    <button onClick={() => router.back()} className="btn btn-ghost btn-sm">
                         <ArrowLeft size={18} />
                    </button>
                    <div className="text-3xl font-bold">
                         {isEditMode ? "Edit News/Event" : "Create News/Event"}
                    </div>
               </div>

               <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                         {/* Title */}
                         <div className="form-control">
                              <label className="label">
                                   <span className="label-text font-medium">
                                        Title <span className="text-error">*</span>
                                   </span>
                              </label>
                              <input
                                   {...register("title")}
                                   type="text"
                                   placeholder="Enter news/event title"
                                   className="input input-bordered w-full"
                                   maxLength={50}
                              />
                              {errors?.title && (
                                   <label className="label">
                                        <span className="label-text-alt text-error">
                                             {errors.title.message}
                                        </span>
                                   </label>
                              )}
                         </div>
                         <div className="form-control">
                              <label className="label">
                                   <span className="label-text font-medium">Link</span>
                              </label>
                              <input
                                   {...register("link")}
                                   type="text"
                                   placeholder="Enter news/event link"
                                   className="input input-bordered w-full"
                                   maxLength={50}
                              />
                              {errors?.link && (
                                   <label className="label">
                                        <span className="label-text-alt text-error">
                                             {errors.link.message}
                                        </span>
                                   </label>
                              )}
                         </div>

                         {/* Content */}
                         <div className="form-control mt-4 flex flex-col">
                              <label className="label">
                                   <span className="label-text font-medium">
                                        Content <span className="text-error">*</span>
                                   </span>
                              </label>
                              <textarea
                                   {...register("content")}
                                   className="textarea textarea-bordered h-48 w-full"
                                   placeholder="Enter news/event content"
                              />
                              {errors?.content && (
                                   <label className="label">
                                        <span className="label-text-alt text-error">
                                             {errors.content.message}
                                        </span>
                                   </label>
                              )}
                         </div>

                         {/* Event Date */}
                         <div className="form-control mt-4">
                              <label className="label">
                                   <span className="label-text font-medium">Event Date</span>
                              </label>
                              <input
                                   {...register("eventDate")}
                                   type="datetime-local"
                                   className="input input-bordered w-full"
                              />
                              {errors?.eventDate && (
                                   <label className="label">
                                        <span className="label-text-alt text-error">
                                             {errors.eventDate.message}
                                        </span>
                                   </label>
                              )}
                         </div>

                         {/* Images Upload */}
                         <div className="form-control mt-4">
                              <label className="label">
                                   <span className="label-text font-medium">Images</span>
                              </label>
                              <input
                                   type="file"
                                   accept="image/*"
                                   multiple
                                   onChange={onFileChange}
                                   className="file-input file-input-bordered w-full"
                                   disabled={uploadingImages}
                              />
                              <label className="label">
                                   <span className="label-text-alt">
                                        {uploadingImages
                                             ? "Uploading images..."
                                             : "Select multiple images to upload"}
                                   </span>
                              </label>
                         </div>

                         {/* Image Previews */}
                         {imageUrls.length > 0 && (
                              <div className="mt-4">
                                   <div className="text-sm font-medium mb-2">
                                        Uploaded Images ({imageUrls.length})
                                   </div>
                                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {imageUrls.map(url => (
                                             <div key={url} className="relative group">
                                                  <Image
                                                       src={url}
                                                       alt="Uploaded image"
                                                       width={200}
                                                       height={150}
                                                       className="rounded-lg object-cover w-full h-32"
                                                  />
                                                  <button
                                                       type="button"
                                                       onClick={() => removeImage(url)}
                                                       className="btn btn-circle btn-sm btn-error absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                       disabled={uploadingImages}
                                                  >
                                                       <X size={16} />
                                                  </button>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         )}

                         {/* Actions */}
                         <div className="card-actions justify-end mt-6">
                              <button
                                   type="button"
                                   onClick={() => router.back()}
                                   className="btn btn-ghost"
                                   disabled={isSubmitting}
                              >
                                   Cancel
                              </button>
                              <button
                                   type="submit"
                                   className="btn btn-primary"
                                   disabled={isSubmitting}
                              >
                                   {isSubmitting ? (
                                        <>
                                             <span className="loading loading-spinner loading-sm"></span>
                                             {isEditMode ? "Updating..." : "Creating..."}
                                        </>
                                   ) : isEditMode ? (
                                        "Update News/Event"
                                   ) : (
                                        "Create News/Event"
                                   )}
                              </button>
                         </div>
                    </div>
               </form>
          </div>
     );
}
