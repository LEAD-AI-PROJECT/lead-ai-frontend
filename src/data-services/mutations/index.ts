import { MutationDataService } from "../type";
import { AuthKeys, authMutations } from "./auth";
import { NewsEventKeys, newsEventMutations } from "./news-event";
import { PublicationKeys, publicationMutations } from "./publication";
import { FormLandingPageKeys, formLandingPageMutations } from "./form-landingpage";
import { UserMutationKeys, userMutations } from "./user";
import { HomeSectionMutationKeys, homeSectionMutations } from "./menu-management/home-section";

export type AllMutationKeys =
     | AuthKeys
     | NewsEventKeys
     | PublicationKeys
     | FormLandingPageKeys
     | UserMutationKeys
     | HomeSectionMutationKeys;

export const allMutations: MutationDataService<AllMutationKeys> = {
     ...authMutations,
     ...newsEventMutations,
     ...publicationMutations,
     ...formLandingPageMutations,
     ...userMutations,
     ...homeSectionMutations,
};
