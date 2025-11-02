import { QueriesDataService } from "@/data-services/type";

export type HomeSectionQueryKeys =
     | "HomeSection_FindAll"
     | "HomeSection_FindById"
     | "HomeSection_FindByType";

export const homeSectionQueries: QueriesDataService<HomeSectionQueryKeys> = {
     HomeSection_FindAll: "/home-section",
     HomeSection_FindById: "/home-section/:id",
     HomeSection_FindByType: "/home-section/type/:type",
};
