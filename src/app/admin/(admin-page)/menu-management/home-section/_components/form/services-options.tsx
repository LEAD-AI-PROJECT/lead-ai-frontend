"use client";
import { useState, useCallback, useMemo, memo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Plus, X } from "lucide-react";
import dynamic from "next/dynamic";

const SplitMarkdownEditor = dynamic(() => import("@/components/input/split-markdown-editor"), {
     ssr: false,
     loading: () => <div className="skeleton h-48 w-full"></div>,
});

interface Service {
     title: string;
     description: string;
     link: string;
     variant: "v1" | "v2" | "v3";
}

interface ServicesOptionsProps {
     readonly form: UseFormReturn<any>;
}

const VARIANT_OPTIONS = [
     { value: "v1", label: "v1 - Large Card", color: "bg-blue/10" },
     { value: "v2", label: "v2 - Standard Card", color: "bg-purple/10" },
     { value: "v3", label: "v3 - Standard Card", color: "bg-pink/10" },
] as const;

// Memoized Service Item Component
const ServiceItem = memo(
     ({
          service,
          index,
          isFirst,
          onRemove,
          onChange,
     }: {
          service: Service;
          index: number;
          isFirst: boolean;
          onRemove: (index: number) => void;
          onChange: (index: number, field: keyof Service, value: string) => void;
     }) => {
          const variantInfo = VARIANT_OPTIONS.find(v => v.value === service.variant);

          return (
               <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-white">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                              <h5 className="font-medium text-base">Service {index + 1}</h5>
                              {isFirst && (
                                   <span className="badge badge-primary badge-sm">Large Card</span>
                              )}
                         </div>
                         <button
                              type="button"
                              onClick={() => onRemove(index)}
                              className="btn btn-sm btn-ghost btn-circle text-error"
                         >
                              <X size={16} />
                         </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                         {/* Service Title - Markdown */}
                         <div className="form-control">
                              <label className="label">
                                   <span className="label-text">Service Title (Markdown)</span>
                              </label>
                              <SplitMarkdownEditor
                                   value={service.title}
                                   onChange={value => onChange(index, "title", value)}
                                   placeholder="e.g., Data Cleansing for **AI-Ready** R&D"
                              />
                         </div>

                         {/* Service Description - Markdown */}
                         <div className="form-control">
                              <label className="label">
                                   <span className="label-text">Description (Markdown)</span>
                              </label>
                              <SplitMarkdownEditor
                                   value={service.description}
                                   onChange={value => onChange(index, "description", value)}
                                   placeholder="Describe this service with markdown formatting..."
                              />
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Service Link */}
                              <div className="form-control">
                                   <label className="label">
                                        <span className="label-text">Link (optional)</span>
                                   </label>
                                   <input
                                        type="text"
                                        placeholder="#"
                                        className="input input-bordered w-full"
                                        value={service.link}
                                        onChange={e => onChange(index, "link", e.target.value)}
                                   />
                              </div>

                              {/* Service Variant */}
                              <div className="form-control">
                                   <label className="label">
                                        <span className="label-text">Card Style Variant</span>
                                   </label>
                                   <select
                                        className="select select-bordered w-full"
                                        value={service.variant}
                                        onChange={e => onChange(index, "variant", e.target.value)}
                                   >
                                        {VARIANT_OPTIONS.map(variant => (
                                             <option key={variant.value} value={variant.value}>
                                                  {variant.label}
                                             </option>
                                        ))}
                                   </select>
                              </div>
                         </div>
                    </div>

                    {/* Variant Preview */}
                    {variantInfo && (
                         <div
                              className={`p-3 rounded-lg ${variantInfo.color} border border-gray-200`}
                         >
                              <p className="text-xs text-gray-600">Preview: {variantInfo.label}</p>
                         </div>
                    )}
               </div>
          );
     }
);

ServiceItem.displayName = "ServiceItem";

export default function ServicesOptions({ form }: ServicesOptionsProps) {
     const [services, setServices] = useState<Service[]>(
          form.getValues("optionSection.services") || [
               {
                    title: "Data Cleansing for AI-Ready R&D",
                    description:
                         "Standardize and structure messy datasets for faster, more accurate AI development.",
                    link: "#",
                    variant: "v1" as const,
               },
               {
                    title: "Custom AI for Pharma",
                    description:
                         "Need a custom AI model? We turn pharma challenges into AI solutions fast.",
                    link: "#",
                    variant: "v2" as const,
               },
               {
                    title: "Full-Stack AI Services",
                    description:
                         "From annotation to deployment, we support every step of the AI journey.",
                    link: "#",
                    variant: "v3" as const,
               },
          ]
     );

     const handleAddService = () => {
          const newServices = [
               ...services,
               {
                    title: "",
                    description: "",
                    link: "#",
                    variant: "v2" as const,
               },
          ];
          setServices(newServices);
          form.setValue("optionSection.services", newServices);
     };

     const handleRemoveService = (index: number) => {
          const newServices = services.filter((_, i) => i !== index);
          setServices(newServices);
          form.setValue("optionSection.services", newServices);
     };

     const handleServiceChange = useCallback(
          (index: number, field: keyof Service, value: string) => {
               setServices(currentServices => {
                    const newServices = [...currentServices];
                    newServices[index] = {
                         ...newServices[index],
                         [field]: value,
                    };
                    form.setValue("optionSection.services", newServices);
                    return newServices;
               });
          },
          [form]
     );

     return (
          <div className="space-y-6 border border-gray-200 rounded-lg p-6 bg-gray-50">
               <div className="flex items-center justify-between">
                    <div>
                         <h3 className="text-lg font-semibold">Services Section Options</h3>
                         <p className="text-sm text-gray-600 mt-1">
                              Configure service cards (first card is large, rest are smaller)
                         </p>
                    </div>
                    <button
                         type="button"
                         onClick={handleAddService}
                         className="btn btn-sm btn-outline btn-primary gap-2"
                    >
                         <Plus size={16} />
                         Add Service
                    </button>
               </div>

               {/* Services List */}
               {services.length === 0 ? (
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
                         <span>No services added yet. Click "Add Service" to get started.</span>
                    </div>
               ) : (
                    <div className="space-y-4">
                         {services.map((service, index) => (
                              <ServiceItem
                                   key={`service-${index}`}
                                   service={service}
                                   index={index}
                                   isFirst={index === 0}
                                   onRemove={handleRemoveService}
                                   onChange={handleServiceChange}
                              />
                         ))}
                    </div>
               )}

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
                         Layout: First service appears as a large card on top. Remaining services
                         appear as smaller cards in a row below (wraps automatically on smaller
                         screens).
                    </span>
               </div>
          </div>
     );
}
