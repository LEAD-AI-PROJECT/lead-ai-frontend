import { QueriesDataService } from "../type";
import { newsEventQueries, NewsEventQueryKeys } from "./news-event";
import { publicationQueries, PublicationQueryKeys } from "./publication";

export type AllQueryKeys = NewsEventQueryKeys | PublicationQueryKeys;

export const allQueries: QueriesDataService<AllQueryKeys> = {
     ...newsEventQueries,
     ...publicationQueries,
};
