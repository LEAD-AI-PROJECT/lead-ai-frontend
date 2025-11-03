"use client";
import { useFieldArray } from "react-hook-form";
import { FooterContent } from "@/types/menu-management/global-section";
import useAdminGlobalSectionFooterForm from "./admin.mm.global-section.footer.form.hook";
import { SidebarClose, X } from "lucide-react";

interface FooterFormProps {
     readonly initialData?: FooterContent;
     readonly isLoading?: boolean;
}

export default function AdminGlobalSectionFooterForm({ initialData, isLoading }: FooterFormProps) {
     const { form, onSubmit, isPending, showSuccess } = useAdminGlobalSectionFooterForm({
          initialData,
     });

     const { control, register } = form;

     const {
          fields: columnFields,
          append: appendColumn,
          remove: removeColumn,
     } = useFieldArray({
          control,
          name: "columns",
     });

     const { fields: socialFields } = useFieldArray({
          control,
          name: "socialLinks",
     });

     if (isLoading) {
          return (
               <div className="space-y-4">
                    <div className="skeleton h-12 w-full"></div>
                    <div className="skeleton h-40 w-full"></div>
               </div>
          );
     }

     return (
          <form onSubmit={onSubmit} className="space-y-6">
               {/* Copyright */}
               <div>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className="label">
                         <span className="label-text font-semibold">Copyright Text</span>
                    </label>
                    <input
                         type="text"
                         placeholder="© 2024 LEAD AI. All rights reserved."
                         className="input input-bordered w-full"
                         {...register("copyright")}
                    />
               </div>

               {/* Columns */}
               <div>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className="label">
                         <span className="label-text font-semibold">Footer Columns</span>
                    </label>
                    <div className="space-y-4">
                         {columnFields.map((field, columnIndex) => (
                              <ColumnEditor
                                   key={field.id}
                                   columnIndex={columnIndex}
                                   control={control}
                                   register={register}
                                   onRemove={() => removeColumn(columnIndex)}
                              />
                         ))}
                    </div>
                    <button
                         type="button"
                         onClick={() =>
                              appendColumn({ title: "", items: [{ label: "", link: "" }] })
                         }
                         className="btn btn-ghost mt-3"
                    >
                         + Add Column
                    </button>
               </div>

               {/* Social Links - Fixed (Facebook, Twitter, LinkedIn) */}
               <div>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className="label">
                         <span className="label-text font-semibold">Social Links (Fixed)</span>
                    </label>
                    <div className="space-y-3">
                         {socialFields.map((field, index) => (
                              <div key={field.id} className="flex gap-2">
                                   <div className="flex-1">
                                        <input
                                             type="text"
                                             placeholder="Icon name"
                                             className="input input-bordered w-full bg-gray-100"
                                             {...register(`socialLinks.${index}.icon`)}
                                             disabled
                                             title="Social link icon is fixed"
                                        />
                                   </div>
                                   <div className="flex-1">
                                        <input
                                             type="text"
                                             placeholder="Link"
                                             className="input input-bordered w-full"
                                             {...register(`socialLinks.${index}.link`)}
                                        />
                                   </div>
                              </div>
                         ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                         Social links are fixed to: Facebook, Twitter, LinkedIn (icons cannot be
                         changed)
                    </p>
               </div>

               {/* Submit Button */}
               <button type="submit" disabled={isPending} className="btn btn-primary w-full">
                    {isPending ? "Saving..." : "Save Footer"}
               </button>
          </form>
     );
}

// Column Editor Component
interface ColumnEditorProps {
     readonly columnIndex: number;
     readonly control: any;
     readonly register: any;
     readonly onRemove: () => void;
}

function ColumnEditor({ columnIndex, control, register, onRemove }: ColumnEditorProps) {
     const {
          fields: itemFields,
          append: appendItem,
          remove: removeItem,
     } = useFieldArray({
          control,
          name: `columns.${columnIndex}.items`,
     });

     return (
          <div className="card bg-base-100 border border-base-300">
               <div className="card-body p-4">
                    <div className="flex justify-between items-center mb-3">
                         <h4 className="font-semibold">Column {columnIndex + 1}</h4>
                         <button
                              type="button"
                              onClick={onRemove}
                              className="btn btn-error hover:text-white btn-outline"
                         >
                              Remove Column
                         </button>
                    </div>

                    {/* Column Title */}
                    <div className="mb-3">
                         <input
                              type="text"
                              placeholder="Column Title (e.g., Product)"
                              className="input input-bordered w-full "
                              {...register(`columns.${columnIndex}.title`)}
                         />
                    </div>

                    {/* Column Items */}
                    <div className="space-y-2">
                         {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                         <label className="label">
                              <span className="label-text text-sm">Items in this Column</span>
                         </label>
                         {itemFields.map((field, itemIndex) => (
                              <div key={field.id} className="flex gap-2">
                                   <input
                                        type="text"
                                        placeholder="Item Label"
                                        className="input input-bordered  flex-1"
                                        {...register(
                                             `columns.${columnIndex}.items.${itemIndex}.label`
                                        )}
                                   />
                                   <input
                                        type="text"
                                        placeholder="Item Link"
                                        className="input input-bordered  flex-1"
                                        {...register(
                                             `columns.${columnIndex}.items.${itemIndex}.link`
                                        )}
                                   />
                                   <button
                                        type="button"
                                        onClick={() => removeItem(itemIndex)}
                                        className="btn btn-error text-white"
                                   >
                                        <X />
                                   </button>
                              </div>
                         ))}
                         <button
                              type="button"
                              onClick={() => appendItem({ label: "", link: "" })}
                              className="btn btn-ghost"
                         >
                              + Add Item
                         </button>
                    </div>
               </div>
          </div>
     );
}
