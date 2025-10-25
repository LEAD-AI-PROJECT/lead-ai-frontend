import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { DashboardStatsResponseType } from "@/types/dashboard";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";

export default function useAdminDashboardHook() {
     const { data: statsData, isLoading } = useQueryApiRequest<
          GlobalApiResponse<DashboardStatsResponseType>
     >({
          key: "Dashboard_GetStats",
     });

     const stats = statsData?.data || {
          formSubmissionCount: 0,
          publicationCount: 0,
          newsEventCount: 0,
     };

     return {
          stats,
          isLoading,
     };
}
