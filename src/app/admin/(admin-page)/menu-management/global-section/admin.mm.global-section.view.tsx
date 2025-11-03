"use client";
import useAdminMenuManagementGlobalSection from "./admin.mm.global-section.hook";
import AdminGlobalSectionHeaderForm from "./_components/header-form/admin.mm.global-section.header.form";
import AdminGlobalSectionFooterForm from "./_components/footer-form/admin.mm.global-section.footer.form";
import { GlobalSectionMenuEnum } from "@/types/enums/menu.enum";
import { HeaderContent, FooterContent } from "@/types/menu-management/global-section";

export default function AdminMenuManagementGlobalSectionView() {
     const { activeTab, tabs, handleTabChange, globalSection, isLoading } =
          useAdminMenuManagementGlobalSection();

     return (
          <div className="card bg-white shadow-sm border-0">
               <div className="card-body">
                    {/* Tabs */}
                    <div className="tabs tabs-bordered">
                         {tabs.map(tab => (
                              <button
                                   key={tab.value}
                                   onClick={() => handleTabChange(tab.value)}
                                   className={`tab ${activeTab === tab.value ? "tab-active" : ""}`}
                              >
                                   {tab.label}
                              </button>
                         ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-6">
                         {activeTab === GlobalSectionMenuEnum.HEADER && (
                              <AdminGlobalSectionHeaderForm
                                   initialData={globalSection?.content as HeaderContent}
                                   isLoading={isLoading}
                              />
                         )}

                         {activeTab === GlobalSectionMenuEnum.FOOTER && (
                              <AdminGlobalSectionFooterForm
                                   initialData={globalSection?.content as FooterContent}
                                   isLoading={isLoading}
                              />
                         )}
                    </div>
               </div>
          </div>
     );
}
