"use client";
import { HomeSectionMenuEnumLabels } from "@/types/enums/menu.enum";
import AdminMenuManagementHomeSectionFormView from "./_components/form/admin.mm.home-section.form.view";
import useAdminMenuManagementHomeSection from "./admin.mm.home-section.hook";

export default function AdminMenuManagementHomeSectionView() {
     const { activeTab, tabs, handleTabChange, homeSection, isLoading } =
          useAdminMenuManagementHomeSection();

     return (
          <div className="w-full">
               <div className="mb-6">
                    <h1 className="text-2xl font-bold">Home Section Management</h1>
                    <p className="text-gray-600 mt-2">
                         Manage content for each section of the home page
                    </p>
               </div>

               {/* Dropdown selector */}
               <div className="w-full">
                    <div className="mb-6 flex items-center gap-4">
                         <label className="label">
                              <span className="label-text font-medium">Select Section</span>
                         </label>
                         <select
                              className="select select-bordered w-full max-w-xs"
                              value={activeTab}
                              onChange={e => handleTabChange(Number(e.target.value))}
                         >
                              {tabs.map(tab => (
                                   <option key={tab.value} value={tab.value}>
                                        {tab.label}
                                   </option>
                              ))}
                         </select>
                    </div>

                    {/* Section Content */}
                    <div className="bg-white rounded-lg p-6">
                         <h2 className="text-xl font-semibold mb-4">
                              {HomeSectionMenuEnumLabels[activeTab]}
                         </h2>

                         {isLoading ? (
                              <div className="flex justify-center py-8">
                                   <span className="loading loading-spinner loading-lg"></span>
                              </div>
                         ) : (
                              <AdminMenuManagementHomeSectionFormView
                                   type={activeTab}
                                   initialData={{
                                        title: homeSection?.title || "",
                                        description: homeSection?.description || null,
                                   }}
                              />
                         )}
                    </div>
               </div>
          </div>
     );
}
