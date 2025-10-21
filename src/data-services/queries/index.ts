import { QueriesDataService } from "../type";
import { authQueries, AuthQueryKeys } from "./auth";
import { newsEventQueries, NewsEventQueryKeys } from "./news-event";
import { publicationQueries, PublicationQueryKeys } from "./publication";

export type AllQueryKeys = AuthQueryKeys | NewsEventQueryKeys | PublicationQueryKeys;

export const allQueries: QueriesDataService<AllQueryKeys> = {
     ...authQueries,
     ...newsEventQueries,
     ...publicationQueries,
};
