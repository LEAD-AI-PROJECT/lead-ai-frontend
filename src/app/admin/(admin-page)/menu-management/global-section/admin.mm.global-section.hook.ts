"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { GlobalSectionMenuEnum, GlobalSectionMenuEnumLabels } from "@/types/enums/menu.enum";
import { GlobalSectionMenuResponse } from "@/types/menu-management/global-section";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

export default function useAdminMenuManagementGlobalSection() {
     const router = useRouter();
     const searchParams = useSearchParams();

     // Get section from URL params using enum name (e.g., "HEADER", "FOOTER")
     const urlSection = searchParams.get("section");

     // Map enum name string to enum value
     const getEnumValueFromName = (name: string): GlobalSectionMenuEnum => {
          const entries = Object.entries(GlobalSectionMenuEnum);
          const found = entries.find(([key]) => key === name);
          return found ? (found[1] as GlobalSectionMenuEnum) : GlobalSectionMenuEnum.HEADER;
     };

     const initialSection = urlSection
          ? getEnumValueFromName(urlSection)
          : GlobalSectionMenuEnum.HEADER;

     const [activeTab, setActiveTab] = useState<GlobalSectionMenuEnum>(initialSection);

     // Update active tab when URL params change
     useEffect(() => {
          if (urlSection) {
               setActiveTab(getEnumValueFromName(urlSection));
          }
     }, [urlSection]);

     const tabs = Object.entries(GlobalSectionMenuEnumLabels).map(([key, label]) => ({
          value: Number(key) as GlobalSectionMenuEnum,
          label,
     }));

     const handleTabChange = (tab: GlobalSectionMenuEnum) => {
          setActiveTab(tab);
          // Update URL params when tab changes using enum name
          const enumName = GlobalSectionMenuEnum[tab];
          const params = new URLSearchParams(searchParams.toString());
          params.set("section", enumName);
          router.push(`?${params.toString()}`);
     };

     // Get backend type string from enum key name
     const backendType = useMemo(() => GlobalSectionMenuEnum[activeTab], [activeTab]);

     const {
          data: globalSection,
          isLoading,
          refetch,
     } = useQueryApiRequest<GlobalApiResponse<GlobalSectionMenuResponse>>({
          key: "GlobalSection_FindByType",
          params: {
               type: backendType,
          },
     });

     // Refetch whenever activeTab changes (which changes backendType)
     useEffect(() => {
          refetch();
     }, [backendType, refetch]);

     return {
          activeTab,
          tabs,
          handleTabChange,
          globalSection: globalSection?.data,
          isLoading,
     };
}
