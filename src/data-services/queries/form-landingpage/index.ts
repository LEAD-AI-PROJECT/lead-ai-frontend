import { QueriesDataService } from "@/data-services/type";

export type FormLandingPageQueryKeys = "FormLandingPage_Find" | "FormLandingPage_FindById";

export const formLandingPageQueries: QueriesDataService<FormLandingPageQueryKeys> = {
     FormLandingPage_Find: "lp-collect",
     FormLandingPage_FindById: "lp-collect/:id",
};
