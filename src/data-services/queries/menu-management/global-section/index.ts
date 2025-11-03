import { QueriesDataService } from "@/data-services/type";

export type GlobalSectionQueryKeys =
     | "GlobalSection_FindAll"
     | "GlobalSection_FindById"
     | "GlobalSection_FindByType";

export const globalSectionQueries: QueriesDataService<GlobalSectionQueryKeys> = {
     GlobalSection_FindAll: "/global-section",
     GlobalSection_FindById: "/global-section/:id",
     GlobalSection_FindByType: "/global-section/type/:type",
};
