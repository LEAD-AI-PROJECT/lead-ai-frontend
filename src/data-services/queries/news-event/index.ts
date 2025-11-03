import { QueriesDataService } from "@/data-services/type";

export type NewsEventQueryKeys =
     | "NewsEvent_Find"
     | "NewsEvent_FindById"
     | "NewsEvent_FindPublished";

export const newsEventQueries: QueriesDataService<NewsEventQueryKeys> = {
     NewsEvent_Find: "/news-event",
     NewsEvent_FindById: "/news-event/:id",
     NewsEvent_FindPublished: "/news-event/public/published",
};
