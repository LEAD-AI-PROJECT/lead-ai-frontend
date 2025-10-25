import { QueriesDataService } from "../type";
import { authQueries, AuthQueryKeys } from "./auth";
import { newsEventQueries, NewsEventQueryKeys } from "./news-event";
import { publicationQueries, PublicationQueryKeys } from "./publication";
import { formLandingPageQueries, FormLandingPageQueryKeys } from "./form-landingpage";
import { dashboardQueries, DashboardQueryKeys } from "./dashboard";
import { userQueries, UserQueryKeys } from "./user";

export type AllQueryKeys =
     | AuthQueryKeys
     | NewsEventQueryKeys
     | PublicationQueryKeys
     | FormLandingPageQueryKeys
     | DashboardQueryKeys
     | UserQueryKeys;

export const allQueries: QueriesDataService<AllQueryKeys> = {
     ...authQueries,
     ...newsEventQueries,
     ...publicationQueries,
     ...formLandingPageQueries,
     ...dashboardQueries,
     ...userQueries,
};
