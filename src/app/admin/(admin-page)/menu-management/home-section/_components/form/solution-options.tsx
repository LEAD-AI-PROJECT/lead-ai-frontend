"use client";
import { UseFormReturn, Controller } from "react-hook-form";
import dynamic from "next/dynamic";

const SplitMarkdownEditor = dynamic(() => import("@/components/input/split-markdown-editor"), {
     ssr: false,
     loading: () => <div className="skeleton h-48 w-full"></div>,
});

interface SolutionOptionsProps {
     readonly form: UseFormReturn<any>;
}

export default function SolutionOptions({ form }: SolutionOptionsProps) {
     return (
          <div className="space-y-6 border border-gray-200 rounded-lg p-6 bg-gray-50">
               <div>
                    <h3 className="text-lg font-semibold">Solution Section Options</h3>
                    <p className="text-sm text-gray-600 mt-1">
                         Configure the subtitle and action button for the solution section
                    </p>
               </div>

               {/* Subtitle */}
               <div className="space-y-4 border-t border-gray-300 pt-6">
                    <h4 className="font-medium text-base">Subtitle Text</h4>
                    <div className="form-control">
                         <label className="label">
                              <span className="label-text">Subtitle (Markdown)</span>
                         </label>
                         <Controller
                              name="optionSection.subtitle"
                              control={form.control}
                              defaultValue="Get early access and see how it worked before anyone else"
                              render={({ field }) => (
                                   <SplitMarkdownEditor
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        placeholder="Get early access and see how it worked before anyone else"
                                   />
                              )}
                         />
                         <label className="label">
                              <span className="label-text-alt text-gray-500">
                                   Text displayed above the action button (supports markdown
                                   formatting)
                              </span>
                         </label>
                    </div>
               </div>

               {/* Action Button Configuration */}
               <div className="space-y-4 border-t border-gray-300 pt-6 mt-6">
                    <h4 className="font-medium text-base">Action Button</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="form-control">
                              <label className="label">
                                   <span className="label-text">Button Text</span>
                              </label>
                              <input
                                   type="text"
                                   placeholder="Join the Waitlist"
                                   className="input input-bordered w-full"
                                   {...form.register("optionSection.action.text")}
                                   defaultValue="Join the Waitlist"
                              />
                         </div>
                         <div className="form-control">
                              <label className="label">
                                   <span className="label-text">Button Link</span>
                              </label>
                              <input
                                   type="text"
                                   placeholder="#waitlist"
                                   className="input input-bordered w-full"
                                   {...form.register("optionSection.action.link")}
                                   defaultValue="#"
                              />
                              <label className="label">
                                   <span className="label-text-alt text-gray-500">
                                        Use # for same page, or full URL for external links
                                   </span>
                              </label>
                         </div>
                    </div>
               </div>

               <div className="alert alert-info">
                    <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         className="stroke-current shrink-0 w-6 h-6"
                    >
                         <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                         ></path>
                    </svg>
                    <span>
                         The main title and description are configured in the fields above. Here you
                         can configure the subtitle and call-to-action button.
                    </span>
               </div>
          </div>
     );
}
