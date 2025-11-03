"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { HomeSectionMenuEnum } from "@/types/enums/menu.enum";
import { HomeSectionMenuResponse } from "@/types/menu-management/home-section";

export default function useHomeWhyLeadAI() {
     const type = HomeSectionMenuEnum[HomeSectionMenuEnum.WHYLEADAI];

     const { data, isLoading } = useQueryApiRequest<
          GlobalApiResponse<HomeSectionMenuResponse<any>>
     >({
          key: "HomeSection_FindByType",
          params: {
               type,
          },
          config: {
               errorNotification: false,
          },
     });
     return { data: data?.data, isLoading };
}
