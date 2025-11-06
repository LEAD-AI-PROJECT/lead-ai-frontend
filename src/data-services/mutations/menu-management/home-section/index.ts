import { MutationDataService } from "@/data-services/type";

export type HomeSectionMutationKeys = "HomeSection_Upsert" | "HomeSection_UploadImage";

export const homeSectionMutations: MutationDataService<HomeSectionMutationKeys> = {
     HomeSection_Upsert: {
          url: "/home-section/type/:type",
          method: "POST",
          refetchQueries: ["HomeSection_FindAll", "HomeSection_FindByType"],
     },
     HomeSection_UploadImage: {
          url: "/home-section/upload/image",
          method: "POST",
     },
};
