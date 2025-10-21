import { MutationDataService } from "../type";
import { AuthKeys, authMutations } from "./auth";
import { NewsEventKeys, newsEventMutations } from "./news-event";
import { PublicationKeys, publicationMutations } from "./publication";

export type AllMutationKeys = AuthKeys | NewsEventKeys | PublicationKeys;

export const allMutations: MutationDataService<AllMutationKeys> = {
     ...authMutations,
     ...newsEventMutations,
     ...publicationMutations,
};
