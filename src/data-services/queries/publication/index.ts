import { QueriesDataService } from "@/data-services/type";

export type PublicationQueryKeys = "Publication_Find" | "Publication_FindById";

export const publicationQueries: QueriesDataService<PublicationQueryKeys> = {
     Publication_Find: "/publication",
     Publication_FindById: "/publication/:id",
};
