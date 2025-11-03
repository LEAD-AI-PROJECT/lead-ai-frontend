import { MutationDataService } from "@/data-services/type";

export type GlobalSectionMutationKeys = "GlobalSection_Upsert" | "GlobalSection_UploadLogo";

export const globalSectionMutations: MutationDataService<GlobalSectionMutationKeys> = {
     GlobalSection_Upsert: {
          url: "/global-section/type/:type",
          method: "POST",
          refetchQueries: ["GlobalSection_FindAll", "GlobalSection_FindByType"],
     },
     GlobalSection_UploadLogo: {
          url: "/global-section/upload/logo",
          method: "POST",
     },
};
