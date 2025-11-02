"use client";
import { useFieldArray } from "react-hook-form";
import { HeaderContent } from "@/types/menu-management/global-section";
import useAdminGlobalSectionHeaderForm from "./admin.mm.global-section.header.form.hook";
import { useRef } from "react";

interface HeaderFormProps {
     initialData?: HeaderContent;
     isLoading?: boolean;
}

export default function AdminGlobalSectionHeaderForm({ initialData, isLoading }: HeaderFormProps) {
     const { form, onSubmit, isPending, previewUrl, onFileChange, isUploadingLogo } =
          useAdminGlobalSectionHeaderForm({
               initialData,
          });

     const { control, register } = form;
     const fileInputRef = useRef<HTMLInputElement>(null);

     const {
          fields: navFields,
          append: appendNav,
          remove: removeNav,
     } = useFieldArray({
          control,
          name: "navItems",
     });

     if (isLoading) {
          return (
               <div className="space-y-4">
                    <div className="skeleton h-12 w-full"></div>
                    <div className="skeleton h-32 w-full"></div>
               </div>
          );
     }

     return (
          <form onSubmit={onSubmit} className="space-y-6">
               {/* Logo */}
               <div>
                    <label className="label">
                         <span className="label-text font-semibold">Logo</span>
                    </label>
                    <div className="space-y-3">
                         {/* Logo Preview */}
                         {previewUrl && (
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                                   <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-white rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden shadow-sm">
                                        <img
                                             src={previewUrl}
                                             alt="Logo preview"
                                             className="w-full h-full object-contain p-2"
                                        />
                                   </div>
                              </div>
                         )}

                         {/* Logo Form Fields */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                              <div>
                                   <label htmlFor="logo-label" className="label">
                                        <span className="label-text">Logo Label</span>
                                   </label>
                                   <input
                                        id="logo-label"
                                        type="text"
                                        placeholder="Logo label/text (e.g., LEAD AI)"
                                        className="input input-bordered w-full"
                                        {...register("logo.label")}
                                   />
                              </div>
                              <div className="flex flex-col justify-end">
                                   <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploadingLogo}
                                        className="btn btn-primary btn-sm sm:btn-md w-full"
                                   >
                                        {isUploadingLogo ? (
                                             <>
                                                  <span className="loading loading-spinner loading-xs"></span>
                                                  <span className="hidden sm:inline">
                                                       Uploading...
                                                  </span>
                                                  <span className="sm:hidden">Upload</span>
                                             </>
                                        ) : (
                                             "Upload Logo"
                                        )}
                                   </button>
                              </div>
                         </div>
                         <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={onFileChange}
                              className="hidden"
                         />
                         <p className="text-xs text-gray-500">
                              💡 Recommended: Square image, at least 200x200px, PNG or JPG format
                         </p>
                    </div>
               </div>

               {/* Navigation Items */}
               <div>
                    <label className="label">
                         <span className="label-text font-semibold">Navigation Items</span>
                    </label>
                    <div className="space-y-3">
                         {navFields.map((field, index) => (
                              <div key={field.id} className="flex gap-2">
                                   <div className="flex-1">
                                        <input
                                             type="text"
                                             placeholder="Label"
                                             className="input input-bordered w-full"
                                             {...register(`navItems.${index}.label`)}
                                        />
                                   </div>
                                   <div className="flex-1">
                                        <input
                                             type="text"
                                             placeholder="Link"
                                             className="input input-bordered w-full"
                                             {...register(`navItems.${index}.link`)}
                                        />
                                   </div>
                                   <button
                                        type="button"
                                        onClick={() => removeNav(index)}
                                        className="btn btn-sm btn-error"
                                   >
                                        Remove
                                   </button>
                              </div>
                         ))}
                    </div>
                    <button
                         type="button"
                         onClick={() => appendNav({ label: "", link: "" })}
                         className="btn btn-sm btn-ghost mt-3"
                    >
                         + Add Navigation Item
                    </button>
               </div>

               {/* CTA */}
               <div>
                    <label className="label">
                         <span className="label-text font-semibold">Login Button</span>
                    </label>
                    <div className="flex gap-2">
                         <div className="flex-1">
                              <input
                                   type="text"
                                   placeholder="Login Button Label"
                                   className="input input-bordered w-full"
                                   {...register("loginButton.label")}
                              />
                         </div>
                         <div className="flex-1">
                              <input
                                   type="text"
                                   placeholder="Login Button Link"
                                   className="input input-bordered w-full"
                                   {...register("loginButton.link")}
                              />
                         </div>
                    </div>
               </div>

               {/* CTA Button */}
               <div>
                    <label className="label">
                         <span className="label-text font-semibold">
                              Call to Action Button (Try Lead.AI)
                         </span>
                    </label>
                    <div className="flex gap-2">
                         <div className="flex-1">
                              <input
                                   type="text"
                                   placeholder="CTA Button Label"
                                   className="input input-bordered w-full"
                                   {...register("cta.label")}
                              />
                         </div>
                         <div className="flex-1">
                              <input
                                   type="text"
                                   placeholder="CTA Button Link"
                                   className="input input-bordered w-full"
                                   {...register("cta.link")}
                              />
                         </div>
                    </div>
               </div>

               {/* Submit Button */}
               <button type="submit" disabled={isPending} className="btn btn-primary w-full">
                    {isPending ? "Saving..." : "Save Header"}
               </button>
          </form>
     );
}
