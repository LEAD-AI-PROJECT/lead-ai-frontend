"use client";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { FooterContent, GlobalSectionMenuResponse } from "@/types/menu-management/global-section";

export const useFooterHook = () => {
     const {
          data: response,
          isLoading,
          isError,
          error,
     } = useQueryApiRequest<GlobalApiResponse<GlobalSectionMenuResponse>>({
          key: "GlobalSection_FindByType",
          params: {
               type: "FOOTER",
          },
     });

     // Extract content from the response - GlobalSectionMenuResponse.content contains FooterContent
     const footerData = (response?.data?.content as FooterContent) || undefined;

     return { footerData, isLoading, isError };
};
