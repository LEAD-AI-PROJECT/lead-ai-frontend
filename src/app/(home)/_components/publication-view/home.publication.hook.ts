import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import { PublicationResponseType } from "@/types/publication";
import { HomeSectionMenuEnum } from "@/types/enums/menu.enum";
import { HomeSectionMenuResponse } from "@/types/menu-management/home-section";

export const useHomePublicationHook = () => {
     // Fetch publications from API

     const type = HomeSectionMenuEnum[HomeSectionMenuEnum.TRON]; // "TRON"

     const { data, isLoading: isPublicationsLoading } = useQueryApiRequest<
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

     const { data: publicationsData, isLoading } = useQueryApiRequest<
          GlobalApiResponse<PublicationResponseType[]>
     >({
          key: "Publication_FindPublished",
          config: {
               showLoading: false,
               errorNotification: false,
          },
     });

     // Filter only published publications and take first 3
     const publications = publicationsData?.data?.filter(item => item).slice(0, 3) || [];

     return {
          publications,
          isLoading,
          isPublicationsLoading,
          homeSectionData: data?.data,
     };
};
