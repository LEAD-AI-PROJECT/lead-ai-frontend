"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { HomeSectionMenuEnum } from "@/types/enums/menu.enum";
import { HomeSectionMenuResponse } from "@/types/menu-management/home-section";

export default function useHomeJumbotron() {
     // Send type as string ("TRON") not number (0)
     const type = HomeSectionMenuEnum[HomeSectionMenuEnum.TRON]; // "TRON"

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
