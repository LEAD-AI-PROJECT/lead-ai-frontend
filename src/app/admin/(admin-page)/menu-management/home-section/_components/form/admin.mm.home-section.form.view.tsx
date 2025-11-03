"use client";
import { HomeSectionMenuEnum } from "@/types/enums/menu.enum";
import useAdminMenuManagementHomeSectionForm from "./admin.mm.home-section.form.hook";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { FormInfoGuide } from "./form.info.guide";

const SplitMarkdownEditor = dynamic(() => import("@/components/input/split-markdown-editor"), {
     ssr: false,
     loading: () => <div className="skeleton h-96 w-full"></div>,
});

interface AdminMenuManagementHomeSectionFormViewProps {
     type: HomeSectionMenuEnum;
     initialData?: {
          title: string;
          description?: string | null;
     };
}

export default function AdminMenuManagementHomeSectionFormView({
     type,
     initialData,
}: AdminMenuManagementHomeSectionFormViewProps) {
     const { form, onSubmit, isPending } = useAdminMenuManagementHomeSectionForm({
          type,
          initialData,
     });

     return (
          <form onSubmit={onSubmit} className="space-y-6">
               {/* Info Guide */}
               <FormInfoGuide />

               {/* Title Field - Split Markdown Editor */}
               <div className="form-control w-full">
                    <label className="label">
                         <span className="label-text font-medium">
                              Title <span className="text-error">*</span>
                         </span>
                    </label>
                    <Controller
                         name="title"
                         control={form.control}
                         render={({ field }) => (
                              <SplitMarkdownEditor
                                   value={field.value || ""}
                                   onChange={field.onChange}
                                   placeholder="Enter section title in markdown format..."
                              />
                         )}
                    />
                    {form.formState.errors.title && (
                         <label className="label">
                              <span className="label-text-alt text-error">
                                   {form.formState.errors.title.message}
                              </span>
                         </label>
                    )}
               </div>

               {/* Description Field - Split Markdown Editor */}
               <div className="form-control w-full">
                    <label className="label">
                         <span className="label-text font-medium">Description</span>
                    </label>
                    <Controller
                         name="description"
                         control={form.control}
                         render={({ field }) => (
                              <SplitMarkdownEditor
                                   value={field.value || ""}
                                   onChange={field.onChange}
                                   placeholder="Write your content in markdown format..."
                              />
                         )}
                    />
                    {form.formState.errors.description && (
                         <label className="label">
                              <span className="label-text-alt text-error">
                                   {form.formState.errors.description.message}
                              </span>
                         </label>
                    )}
               </div>

               {/* Submit Button */}
               <div className="flex justify-end gap-2">
                    <button
                         type="button"
                         className="btn btn-ghost"
                         onClick={() => form.reset()}
                         disabled={isPending}
                    >
                         Reset
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isPending}>
                         {isPending ? (
                              <>
                                   <span className="loading loading-spinner loading-sm"></span>
                                   Saving...
                              </>
                         ) : (
                              "Save Changes"
                         )}
                    </button>
               </div>
          </form>
     );
}
