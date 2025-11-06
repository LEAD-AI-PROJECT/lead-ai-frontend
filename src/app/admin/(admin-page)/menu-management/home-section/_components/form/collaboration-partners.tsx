"use client";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import Image from "next/image";
import { X, Plus, Upload } from "lucide-react";

interface Partner {
     name: string;
     imageUrl: string;
     link?: string;
}

interface CollaborationPartnersProps {
     form: UseFormReturn<any>;
}

export default function CollaborationPartners({ form }: CollaborationPartnersProps) {
     const [partners, setPartners] = useState<Partner[]>(
          form.getValues("optionSection.collaboration.partners") || []
     );
     const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

     // Mutation for uploading image
     const { mutate: uploadImage } = useMutationApiRequest({
          key: "HomeSection_UploadImage",
          config: {
               successNotificationMessage: "Image uploaded successfully!",
               errorNotificationMessage: "Failed to upload image",
          },
     });

     const handleAddPartner = () => {
          const newPartners = [
               ...partners,
               {
                    name: "",
                    imageUrl: "",
                    link: "",
               },
          ];
          setPartners(newPartners);
          form.setValue("optionSection.collaboration.partners", newPartners);
     };

     const handleRemovePartner = (index: number) => {
          const newPartners = partners.filter((_, i) => i !== index);
          setPartners(newPartners);
          form.setValue("optionSection.collaboration.partners", newPartners);
     };

     const handlePartnerChange = (index: number, field: keyof Partner, value: string) => {
          const newPartners = [...partners];
          newPartners[index] = {
               ...newPartners[index],
               [field]: value,
          };
          setPartners(newPartners);
          form.setValue("optionSection.collaboration.partners", newPartners);
     };

     const handleFileUpload = async (index: number, file: File) => {
          if (!file) return;

          setUploadingIndex(index);

          const formData = new FormData();
          formData.append("file", file);

          uploadImage(formData, {
               onSuccess: (response: any) => {
                    const imageUrl = response?.data?.url;
                    if (imageUrl) {
                         handlePartnerChange(index, "imageUrl", imageUrl);
                    }
                    setUploadingIndex(null);
               },
               onError: () => {
                    setUploadingIndex(null);
               },
          });
     };

     return (
          <div className="space-y-4 border-t border-gray-300 pt-6 mt-6">
               <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Collaboration Partners</h3>
                    <button
                         type="button"
                         onClick={handleAddPartner}
                         className="btn btn-sm btn-outline btn-primary gap-2"
                    >
                         <Plus size={16} />
                         Add Partner
                    </button>
               </div>

               {/* Collaboration Title */}
               <div className="form-control">
                    <label className="label">
                         <span className="label-text">Section Title</span>
                    </label>
                    <input
                         type="text"
                         placeholder="In Collaboration With:"
                         className="input input-bordered w-full"
                         {...form.register("optionSection.collaboration.title")}
                         defaultValue="In Collaboration With:"
                    />
               </div>

               {/* Partners List */}
               {partners.length === 0 ? (
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
                         <span>No partners added yet. Click "Add Partner" to get started.</span>
                    </div>
               ) : (
                    <div className="space-y-4">
                         {partners.map((partner, index) => (
                              <div
                                   key={`partner-${partner.name || index}`}
                                   className="border border-gray-200 rounded-lg p-4 space-y-4 bg-white"
                              >
                                   <div className="flex items-center justify-between">
                                        <h4 className="font-medium text-base">
                                             Partner {index + 1}
                                        </h4>
                                        <button
                                             type="button"
                                             onClick={() => handleRemovePartner(index)}
                                             className="btn btn-sm btn-ghost btn-circle text-error"
                                        >
                                             <X size={16} />
                                        </button>
                                   </div>

                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Partner Name */}
                                        <div className="form-control">
                                             <label className="label">
                                                  <span className="label-text">Partner Name</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  placeholder="e.g., NUS, ITB"
                                                  className="input input-bordered w-full"
                                                  value={partner.name}
                                                  onChange={e =>
                                                       handlePartnerChange(
                                                            index,
                                                            "name",
                                                            e.target.value
                                                       )
                                                  }
                                             />
                                        </div>

                                        {/* Partner Link */}
                                        <div className="form-control">
                                             <label className="label">
                                                  <span className="label-text">
                                                       Website Link (optional)
                                                  </span>
                                             </label>
                                             <input
                                                  type="text"
                                                  placeholder="https://example.com"
                                                  className="input input-bordered w-full"
                                                  value={partner.link || ""}
                                                  onChange={e =>
                                                       handlePartnerChange(
                                                            index,
                                                            "link",
                                                            e.target.value
                                                       )
                                                  }
                                             />
                                        </div>
                                   </div>

                                   {/* Logo Upload */}
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Partner Logo</span>
                                        </label>

                                        {/* Mobile & Desktop Responsive Layout */}
                                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                                             {/* Image Preview - Responsive Size */}
                                             {partner.imageUrl && (
                                                  <div className="avatar self-center sm:self-start">
                                                       <div className="w-32 h-32 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                                                            <Image
                                                                 src={partner.imageUrl}
                                                                 alt={
                                                                      partner.name || "Partner logo"
                                                                 }
                                                                 width={128}
                                                                 height={128}
                                                                 className="object-cover object-center w-full h-full p-2"
                                                            />
                                                       </div>
                                                  </div>
                                             )}

                                             {/* Upload Button - Full width on mobile, flex-1 on desktop */}
                                             <div className="w-full sm:flex-1">
                                                  <input
                                                       type="file"
                                                       id={`logo-upload-${index}`}
                                                       className="hidden"
                                                       accept="image/*"
                                                       onChange={e => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                 handleFileUpload(index, file);
                                                            }
                                                       }}
                                                       disabled={uploadingIndex === index}
                                                  />
                                                  <label
                                                       htmlFor={`logo-upload-${index}`}
                                                       className={`btn btn-outline w-full ${
                                                            uploadingIndex === index
                                                                 ? "btn-disabled"
                                                                 : ""
                                                       }`}
                                                  >
                                                       {uploadingIndex === index ? (
                                                            <span className="flex items-center gap-2">
                                                                 <span className="loading loading-spinner loading-sm" />
                                                                 Uploading...
                                                            </span>
                                                       ) : (
                                                            <span className="flex items-center gap-2">
                                                                 <Upload size={16} />
                                                                 {partner.imageUrl
                                                                      ? "Change Logo"
                                                                      : "Upload Logo"}
                                                            </span>
                                                       )}
                                                  </label>
                                                  <p className="text-xs text-gray-500 mt-2">
                                                       Recommended: PNG or SVG with transparent
                                                       background (max 2MB)
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              </div>
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
                         Logos will be uploaded to ImageKit automatically. You can add as many
                         partners as needed.
                    </span>
               </div>
          </div>
     );
}
