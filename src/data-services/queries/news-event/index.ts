import { QueriesDataService } from "@/data-services/type";

export type NewsEventQueryKeys = "NewsEvent_Find" | "NewsEvent_FindById";

export const newsEventQueries: QueriesDataService<NewsEventQueryKeys> = {
     NewsEvent_Find: "news-event/find",
     NewsEvent_FindById: "news-event/findById",
};
