import { MutationDataService } from "../type";
import { AuthKeys, authMutations } from "./auth";
import { NewsEventKeys, newsEventMutations } from "./news-event";
import { PublicationKeys, publicationMutations } from "./publication";
import { FormLandingPageKeys, formLandingPageMutations } from "./form-landingpage";
import { UserMutationKeys, userMutations } from "./user";

export type AllMutationKeys =
     | AuthKeys
     | NewsEventKeys
     | PublicationKeys
     | FormLandingPageKeys
     | UserMutationKeys;

export const allMutations: MutationDataService<AllMutationKeys> = {
     ...authMutations,
     ...newsEventMutations,
     ...publicationMutations,
     ...formLandingPageMutations,
     ...userMutations,
};
