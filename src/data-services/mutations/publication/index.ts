import { MutationDataService } from "@/data-services/type";

export type PublicationKeys =
     | "Publication_Create"
     | "Publication_Update"
     | "Publication_Delete"
     | "Publication_TogglePublish"
     | "Publication_UploadImage";

export const publicationMutations: MutationDataService<PublicationKeys> = {
     Publication_Create: {
          url: "/publication",
          method: "POST",
          refetchQueries: ["Publication_Find"],
     },
     Publication_Update: {
          url: "/publication/:id",
          method: "PUT",
          refetchQueries: ["Publication_Find", "Publication_FindById"],
     },
     Publication_Delete: {
          url: "/publication/:id",
          method: "DELETE",
          refetchQueries: ["Publication_Find"],
     },
     Publication_TogglePublish: {
          url: "/publication/:id/publish",
          method: "POST",
          refetchQueries: ["Publication_Find", "Publication_FindById"],
     },
     Publication_UploadImage: {
          url: "/publication/upload/image",
          method: "POST",
     },
};
