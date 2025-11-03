import { QueriesDataService } from "@/data-services/type";

export type DashboardQueryKeys = "Dashboard_GetStats";

export const dashboardQueries: QueriesDataService<DashboardQueryKeys> = {
     Dashboard_GetStats: "/dashboard/stats",
};
