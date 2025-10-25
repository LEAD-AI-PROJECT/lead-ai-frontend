import { MutationDataService } from "@/data-services/type";

export type FormLandingPageKeys =
     | "FormLandingPage_Create"
     | "FormLandingPage_Delete"
     | "FormLandingPage_ToggleProcessed";

export const formLandingPageMutations: MutationDataService<FormLandingPageKeys> = {
     FormLandingPage_Create: {
          url: "/lp-collect",
          method: "POST",
          refetchQueries: ["FormLandingPage_Find"],
     },
     FormLandingPage_Delete: {
          url: "/lp-collect/:id",
          method: "DELETE",
          refetchQueries: ["FormLandingPage_Find"],
     },
     FormLandingPage_ToggleProcessed: {
          url: "/lp-collect/:id/toggle-processed",
          method: "POST",
          refetchQueries: ["FormLandingPage_Find", "FormLandingPage_FindById"],
     },
};
