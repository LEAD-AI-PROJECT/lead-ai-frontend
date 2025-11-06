"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { HomeSectionMenuEnum } from "@/types/enums/menu.enum";
import {
     HomeSectionMenuResponse,
     JumbotronOptionSection,
} from "@/types/menu-management/home-section";
import { useMemo } from "react";

export default function useHomeJumbotron() {
     // Send type as string ("TRON") not number (0)
     const type = HomeSectionMenuEnum[HomeSectionMenuEnum.TRON]; // "TRON"

     const { data, isLoading } = useQueryApiRequest<
          GlobalApiResponse<HomeSectionMenuResponse<JumbotronOptionSection>>
     >({
          key: "HomeSection_FindByType",
          params: {
               type,
          },
          config: {
               errorNotification: false,
          },
     });

     // Parse optionSection from JSON string to object
     const parsedData = useMemo(() => {
          if (!data?.data) return undefined;

          const section = data.data;
          let parsedOptionSection = section.optionSection;

          // If optionSection is a string, parse it
          if (typeof parsedOptionSection === "string") {
               try {
                    parsedOptionSection = JSON.parse(parsedOptionSection) as JumbotronOptionSection;
               } catch (e) {
                    console.error("Failed to parse optionSection:", e);
                    parsedOptionSection = undefined;
               }
          }

          return {
               ...section,
               optionSection: parsedOptionSection,
          };
     }, [data]);

     return { data: parsedData, isLoading };
}
