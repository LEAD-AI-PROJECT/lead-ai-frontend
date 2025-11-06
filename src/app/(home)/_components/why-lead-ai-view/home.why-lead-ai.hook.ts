"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { HomeSectionMenuEnum } from "@/types/enums/menu.enum";
import {
     HomeSectionMenuResponse,
     WhyLeadAIOptionSection,
} from "@/types/menu-management/home-section";
import { useMemo } from "react";

export default function useHomeWhyLeadAI() {
     const type = HomeSectionMenuEnum[HomeSectionMenuEnum.WHYLEADAI];

     const { data, isLoading } = useQueryApiRequest<
          GlobalApiResponse<HomeSectionMenuResponse<WhyLeadAIOptionSection>>
     >({
          key: "HomeSection_FindByType",
          params: {
               type,
          },
          config: {
               errorNotification: false,
          },
     });

     // Parse optionSection if it's a string
     const parsedData = useMemo(() => {
          if (!data?.data) return null;

          const section = data.data;
          let parsedOptionSection = section.optionSection;

          if (typeof parsedOptionSection === "string") {
               try {
                    parsedOptionSection = JSON.parse(parsedOptionSection) as WhyLeadAIOptionSection;
               } catch (error) {
                    console.error("Failed to parse optionSection:", error);
                    parsedOptionSection = null;
               }
          }

          return {
               ...section,
               optionSection: parsedOptionSection,
          };
     }, [data]);

     return { data: parsedData, isLoading };
}
