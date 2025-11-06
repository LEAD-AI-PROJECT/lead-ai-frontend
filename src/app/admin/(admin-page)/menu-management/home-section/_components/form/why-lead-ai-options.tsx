"use client";
import { UseFormReturn } from "react-hook-form";

interface WhyLeadAIOptionsProps {
     readonly form: UseFormReturn<any>;
}

export default function WhyLeadAIOptions({ form }: WhyLeadAIOptionsProps) {
     return (
          <div className="space-y-6 border border-gray-200 rounded-lg p-6 bg-gray-50">
               <div>
                    <h3 className="text-lg font-semibold">Why Lead AI Section Options</h3>
                    <p className="text-sm text-gray-600 mt-1">
                         Configure the 3 feature cards (variants are fixed)
                    </p>
               </div>

               {/* Cards Configuration - Fixed 3 Cards */}
               <div className="space-y-4 border-t border-gray-300 pt-6">
                    <h4 className="font-medium text-base">Feature Cards (Fixed 3 Cards)</h4>

                    {/* Card 1 - Fixed v1 */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                         <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-base">Card 1 (Left Top)</h5>
                              <span className="badge badge-secondary">Variant: v1</span>
                         </div>
                         <div className="form-control">
                              <label className="label">
                                   <span className="label-text">Card Title</span>
                              </label>
                              <input
                                   type="text"
                                   placeholder="Stronger Data Foundations"
                                   className="input input-bordered w-full"
                                   {...form.register("optionSection.cards.0.title")}
                                   defaultValue="Stronger Data Foundations"
                              />
                              <input
                                   type="hidden"
                                   {...form.register("optionSection.cards.0.variant")}
                                   value="v1"
                              />
                         </div>
                         <div className="mt-2 p-3 rounded-lg bg-secondary/10 border border-gray-200">
                              <p className="text-xs text-gray-600">
                                   Style: Secondary Shadow (fixed)
                              </p>
                         </div>
                    </div>

                    {/* Card 2 - Fixed v2 */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                         <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-base">Card 2 (Left Bottom)</h5>
                              <span className="badge badge-primary">Variant: v2</span>
                         </div>
                         <div className="form-control">
                              <label className="label">
                                   <span className="label-text">Card Title</span>
                              </label>
                              <input
                                   type="text"
                                   placeholder="Evidence at Speed"
                                   className="input input-bordered w-full"
                                   {...form.register("optionSection.cards.1.title")}
                                   defaultValue="Evidence at Speed"
                              />
                              <input
                                   type="hidden"
                                   {...form.register("optionSection.cards.1.variant")}
                                   value="v2"
                              />
                         </div>
                         <div className="mt-2 p-3 rounded-lg bg-primary/10 border border-gray-200">
                              <p className="text-xs text-gray-600">
                                   Style: Primary Bottom Shadow (fixed)
                              </p>
                         </div>
                    </div>

                    {/* Card 3 - Fixed v3 */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                         <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-base">Card 3 (Right)</h5>
                              <span className="badge badge-primary">Variant: v3</span>
                         </div>
                         <div className="form-control">
                              <label className="label">
                                   <span className="label-text">Card Title</span>
                              </label>
                              <input
                                   type="text"
                                   placeholder="Tailored for Pharma"
                                   className="input input-bordered w-full"
                                   {...form.register("optionSection.cards.2.title")}
                                   defaultValue="Tailored for Pharma"
                              />
                              <input
                                   type="hidden"
                                   {...form.register("optionSection.cards.2.variant")}
                                   value="v3"
                              />
                         </div>
                         <div className="mt-2 p-3 rounded-lg bg-primary/20 border border-gray-200">
                              <p className="text-xs text-gray-600">Style: Primary Shadow (fixed)</p>
                         </div>
                    </div>
               </div>

               {/* Button Configuration */}
               <div className="space-y-4 border-t border-gray-300 pt-6 mt-6">
                    <h4 className="font-medium text-base">Action Button</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="form-control">
                              <label className="label">
                                   <span className="label-text">Button Text</span>
                              </label>
                              <input
                                   type="text"
                                   placeholder="See how we work >"
                                   className="input input-bordered w-full"
                                   {...form.register("optionSection.button.text")}
                                   defaultValue="See how we work >"
                              />
                         </div>
                         <div className="form-control">
                              <label className="label">
                                   <span className="label-text">Button Link</span>
                              </label>
                              <input
                                   type="text"
                                   placeholder="#"
                                   className="input input-bordered w-full"
                                   {...form.register("optionSection.button.link")}
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
                         Card variants (v1, v2, v3) are fixed for consistent styling. You can only
                         edit the card titles.
                    </span>
               </div>
          </div>
     );
}
