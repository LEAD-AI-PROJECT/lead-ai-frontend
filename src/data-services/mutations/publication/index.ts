import { MutationDataService } from "@/data-services/type";

export type PublicationKeys = "Publication_Create" | "Publication_Update" | "Publication_Delete";

export const publicationMutations: MutationDataService<PublicationKeys> = {
     Publication_Create: {
          url: "/publication",
          method: "POST",
          refetchQueries: ["Publication_Find"],
     },
     Publication_Update: {
          url: "/publication",
          method: "PUT",
          refetchQueries: ["Publication_Find", "Publication_FindById"],
     },
     Publication_Delete: {
          url: "/publication",
          method: "DELETE",
          refetchQueries: ["Publication_Find", "Publication_FindById"],
     },
};
