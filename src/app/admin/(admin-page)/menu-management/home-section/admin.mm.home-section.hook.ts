"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { HomeSectionMenuEnum, HomeSectionMenuEnumLabels } from "@/types/enums/menu.enum";
import { HomeSectionMenuResponse } from "@/types/menu-management/home-section";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

export default function useAdminMenuManagementHomeSection() {
     const router = useRouter();
     const searchParams = useSearchParams();

     // Get section from URL params using enum name (e.g., "TRON", "WHYLEADAI")
     const urlSection = searchParams.get("section");

     // Map enum name string to enum value
     const getEnumValueFromName = (name: string): HomeSectionMenuEnum => {
          const entries = Object.entries(HomeSectionMenuEnum);
          const found = entries.find(([key]) => key === name);
          return found ? (found[1] as HomeSectionMenuEnum) : HomeSectionMenuEnum.TRON;
     };

     const initialSection = urlSection
          ? getEnumValueFromName(urlSection)
          : HomeSectionMenuEnum.TRON;

     const [activeTab, setActiveTab] = useState<HomeSectionMenuEnum>(initialSection);

     // Update active tab when URL params change
     useEffect(() => {
          if (urlSection) {
               setActiveTab(getEnumValueFromName(urlSection));
          }
     }, [urlSection]);

     const tabs = Object.entries(HomeSectionMenuEnumLabels).map(([key, label]) => ({
          value: Number(key) as HomeSectionMenuEnum,
          label,
     }));

     const handleTabChange = (tab: HomeSectionMenuEnum) => {
          setActiveTab(tab);
          // Update URL params when tab changes using enum name
          const enumName = HomeSectionMenuEnum[tab];
          const params = new URLSearchParams(searchParams.toString());
          params.set("section", enumName);
          router.push(`?${params.toString()}`);
     };

     // Get backend type string from enum key name
     const backendType = useMemo(() => HomeSectionMenuEnum[activeTab], [activeTab]);

     const {
          data: homeSection,
          isLoading,
          refetch,
     } = useQueryApiRequest<GlobalApiResponse<HomeSectionMenuResponse<any>>>({
          key: "HomeSection_FindByType",
          params: {
               type: backendType,
          },
     });

     // Refetch whenever activeTab changes (which changes backendType)
     useEffect(() => {
          refetch();
     }, [backendType, refetch]);

     // Parse optionSection from JSON string to object
     const parsedHomeSection = useMemo(() => {
          if (!homeSection?.data) return undefined;

          const data = homeSection.data;
          let parsedOptionSection = data.optionSection;

          // If optionSection is a string, parse it
          if (typeof parsedOptionSection === "string") {
               try {
                    parsedOptionSection = JSON.parse(parsedOptionSection);
               } catch (e) {
                    console.error("Failed to parse optionSection:", e);
                    parsedOptionSection = null;
               }
          }

          return {
               ...data,
               optionSection: parsedOptionSection,
          };
     }, [homeSection]);

     return {
          activeTab,
          tabs,
          handleTabChange,
          homeSection: parsedHomeSection,
          isLoading,
     };
}
