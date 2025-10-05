import { MutationDataService } from "../type";
import { NewsEventKeys, newsEventMutations } from "./news-event";
import { PublicationKeys, publicationMutations } from "./publication";

export type AllMutationKeys = NewsEventKeys | PublicationKeys;

export const allMutations: MutationDataService<AllMutationKeys> = {
     ...newsEventMutations,
     ...publicationMutations,
};
