import { MutationDataService } from "@/data-services/type";

export type NewsEventKeys = "NewsEvent_Create" | "NewsEvent_Update" | "NewsEvent_Delete";

export const newsEventMutations: MutationDataService<NewsEventKeys> = {
     NewsEvent_Create: {
          url: "/news-event",
          method: "POST",
          refetchQueries: ["NewsEvent_Find"],
     },
     NewsEvent_Update: {
          url: "/news-event",
          method: "PUT",
          refetchQueries: ["NewsEvent_Find", "NewsEvent_FindById"],
     },
     NewsEvent_Delete: {
          url: "/news-event",
          method: "DELETE",
          refetchQueries: ["NewsEvent_Find", "NewsEvent_FindById"],
     },
};
