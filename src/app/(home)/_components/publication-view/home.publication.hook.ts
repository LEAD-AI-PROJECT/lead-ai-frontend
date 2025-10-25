import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import { PublicationResponseType } from "@/types/publication";

export const useHomePublicationHook = () => {
     // Fetch publications from API
     const { data: publicationsData, isLoading } = useQueryApiRequest<
          GlobalApiResponse<PublicationResponseType[]>
     >({
          key: "Publication_Find",
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
     };
};
