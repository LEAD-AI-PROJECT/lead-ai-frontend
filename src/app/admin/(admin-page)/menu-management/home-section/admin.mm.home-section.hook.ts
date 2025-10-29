"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { HomeSectionMenuEnum, HomeSectionMenuEnumLabels } from "@/types/enums/menu.enum";
import { HomeSectionMenuResponse } from "@/types/menu-management/home-section";
import { useMemo, useState } from "react";

export default function useAdminMenuManagementHomeSection() {
     const [activeTab, setActiveTab] = useState<HomeSectionMenuEnum>(HomeSectionMenuEnum.TRON);

     const tabs = Object.entries(HomeSectionMenuEnumLabels).map(([key, label]) => ({
          value: Number(key) as HomeSectionMenuEnum,
          label,
     }));

     const handleTabChange = (tab: HomeSectionMenuEnum) => {
          setActiveTab(tab);
     };

     // Get backend type string from enum key name
     const backendType = useMemo(() => HomeSectionMenuEnum[activeTab], [activeTab]);

     const { data: homeSection, isLoading } = useQueryApiRequest<
          GlobalApiResponse<HomeSectionMenuResponse<any>>
     >({
          key: "HomeSection_FindByType",
          params: {
               type: backendType,
          },
     });

     return {
          activeTab,
          tabs,
          handleTabChange,
          homeSection: homeSection?.data,
          isLoading,
     };
}
