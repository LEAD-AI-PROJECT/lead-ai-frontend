"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { HomeSectionMenuEnum } from "@/types/enums/menu.enum";
import {
     HomeSectionMenuResponse,
     SolutionOptionSection,
} from "@/types/menu-management/home-section";
import { useMemo } from "react";

export default function useHomeSolution() {
     // Send type as string ("SOLUTION") not number
     const type = HomeSectionMenuEnum[HomeSectionMenuEnum.SOLUTION];

     const { data, isLoading } = useQueryApiRequest<
          GlobalApiResponse<HomeSectionMenuResponse<SolutionOptionSection>>
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
          if (!data?.data) return data?.data;

          let parsed = data.data.optionSection;
          if (typeof parsed === "string") {
               try {
                    parsed = JSON.parse(parsed);
               } catch (e) {
                    console.error("Failed to parse optionSection:", e);
                    parsed = null;
               }
          }

          return {
               ...data.data,
               optionSection: parsed as SolutionOptionSection | null,
          };
     }, [data]);

     return { data: parsedData, isLoading };
}
