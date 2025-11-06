"use client";
import { HomeSectionMenuEnum } from "@/types/enums/menu.enum";
import useAdminMenuManagementHomeSectionForm from "./admin.mm.home-section.form.hook";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { FormInfoGuide } from "./form.info.guide";
import CollaborationPartners from "./collaboration-partners";
import WhyLeadAIOptions from "./why-lead-ai-options";
import ServicesOptions from "./services-options";
import SolutionOptions from "./solution-options";

const SplitMarkdownEditor = dynamic(() => import("@/components/input/split-markdown-editor"), {
     ssr: false,
     loading: () => <div className="skeleton h-96 w-full"></div>,
});

interface AdminMenuManagementHomeSectionFormViewProps {
     type: HomeSectionMenuEnum;
     initialData?: {
          title: string;
          description?: string | null;
          optionSection?: any;
     };
}

export default function AdminMenuManagementHomeSectionFormView({
     type,
     initialData,
}: AdminMenuManagementHomeSectionFormViewProps) {
     const {
          form,
          onSubmit,
          isPending,
          type: sectionType,
     } = useAdminMenuManagementHomeSectionForm({
          type,
          initialData,
     });

     // Check if this is TRON (Jumbotron) section
     const isTronSection = sectionType === HomeSectionMenuEnum.TRON;
     const isWhyLeadAISection = sectionType === HomeSectionMenuEnum.WHYLEADAI;
     const isServicesSection = sectionType === HomeSectionMenuEnum.SERVICES;
     const isSolutionSection = sectionType === HomeSectionMenuEnum.SOLUTION;

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

               {/* Jumbotron Specific Options */}
               {isTronSection && (
                    <div className="space-y-6 border border-gray-200 rounded-lg p-6 bg-gray-50">
                         <h3 className="text-lg font-semibold">Button Configuration</h3>

                         {/* Primary Button */}
                         <div className="space-y-4">
                              <h4 className="font-medium text-base">
                                   Primary Button (Request a demo)
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Button Text</span>
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="Request a demo"
                                             className="input input-bordered w-full"
                                             {...form.register(
                                                  "optionSection.buttons.primary.text"
                                             )}
                                             defaultValue="Request a demo"
                                        />
                                   </div>
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">
                                                  Button Link (optional)
                                             </span>
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="#demo"
                                             className="input input-bordered w-full"
                                             {...form.register(
                                                  "optionSection.buttons.primary.link"
                                             )}
                                        />
                                   </div>
                              </div>
                         </div>

                         {/* Secondary Button */}
                         <div className="space-y-4">
                              <h4 className="font-medium text-base">
                                   Secondary Button (Talk to an expert)
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Button Text</span>
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="Talk to an expert"
                                             className="input input-bordered w-full"
                                             {...form.register(
                                                  "optionSection.buttons.secondary.text"
                                             )}
                                             defaultValue="Talk to an expert"
                                        />
                                   </div>
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">
                                                  Button Link (optional)
                                             </span>
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="#contact"
                                             className="input input-bordered w-full"
                                             {...form.register(
                                                  "optionSection.buttons.secondary.link"
                                             )}
                                        />
                                   </div>
                              </div>
                         </div>

                         {/* Collaboration Section */}
                         <CollaborationPartners form={form} />
                    </div>
               )}

               {/* Why Lead AI Specific Options */}
               {isWhyLeadAISection && <WhyLeadAIOptions form={form} />}

               {/* Services Specific Options */}
               {isServicesSection && <ServicesOptions form={form} />}

               {/* Solution Specific Options */}
               {isSolutionSection && <SolutionOptions form={form} />}

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
