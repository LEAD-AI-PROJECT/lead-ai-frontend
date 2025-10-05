"use client";
import useAdminNewsEventUpsertByIdHook from "./admin.news.event.upsert.id.hook";

type Props = Readonly<{ id: string }>;

export default function AdminNewsEventUpsertByIdView({ id }: Props) {
     // reuse the upsert hook to get setValue and other helpers
     const {
          setValue,
          control,
          errors,
          handleSubmit,
          isSubmitting,
          onFileChange,
          previewUrl,
          register,
     } = useAdminNewsEventUpsertByIdHook();

     return (
          <div>
               <div className="lg:w-2/3">
                    <div className="text-3xl font-medium">Update News Event</div>
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
                         <div className="grid grid-cols-1 gap-4">
                              <div className="">
                                   <label htmlFor="title" className="label">
                                        <span className="label-text">Title</span>
                                   </label>
                                   <input
                                        id="title"
                                        {...register("title")}
                                        className="input input-bordered w-full bg-white border-gray-300"
                                        placeholder="Title"
                                   />
                                   {errors?.title && (
                                        <p className="text-sm text-red-600 mt-1">
                                             {errors.title.message}
                                        </p>
                                   )}

                                   <label htmlFor="description" className="label mt-4">
                                        <span className="label-text">Description</span>
                                   </label>
                                   <textarea
                                        id="description"
                                        {...register("description")}
                                        className="textarea textarea-bordered w-full bg-white border-gray-300"
                                        rows={4}
                                        placeholder="Short description"
                                   />
                                   {errors?.description && (
                                        <p className="text-sm text-red-600 mt-1">
                                             {errors.description.message}
                                        </p>
                                   )}
                              </div>
                              <div className="">
                                   <fieldset className="fieldset border border-dashed border-gray-300 p-4 mt-6">
                                        <legend className="fieldset-legend text-gray-600">
                                             Pick a photo
                                        </legend>
                                        <input
                                             id="file"
                                             type="file"
                                             accept="image/*"
                                             onChange={onFileChange}
                                             className="file-input bg-white file-input-bordered w-full border-gray-300"
                                             aria-describedby="file-help"
                                        />
                                        <p id="file-help" className="text-sm text-gray-500">
                                             Max size 2MB
                                        </p>

                                        {previewUrl && (
                                             <div className="mt-4">
                                                  <div className="text-sm text-gray-600">
                                                       Preview
                                                  </div>
                                                  <img
                                                       src={previewUrl}
                                                       alt="Preview"
                                                       className="w-48 h-auto mt-2 rounded"
                                                  />
                                             </div>
                                        )}
                                   </fieldset>
                              </div>
                         </div>

                         <div className="flex justify-end mt-6">
                              <button
                                   type="submit"
                                   className="btn btn-primary"
                                   disabled={isSubmitting}
                              >
                                   {isSubmitting ? "Saving..." : "Save"}
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     );
}
