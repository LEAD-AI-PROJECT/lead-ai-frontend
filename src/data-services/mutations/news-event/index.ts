import { MutationDataService } from "@/data-services/type";

export type NewsEventKeys =
     | "NewsEvent_Create"
     | "NewsEvent_Update"
     | "NewsEvent_Delete"
     | "NewsEvent_TogglePublish"
     | "NewsEvent_UploadImage";

export const newsEventMutations: MutationDataService<NewsEventKeys> = {
     NewsEvent_Create: {
          url: "/news-event",
          method: "POST",
          refetchQueries: ["NewsEvent_Find"],
     },
     NewsEvent_Update: {
          url: "/news-event/:id",
          method: "PUT",
          refetchQueries: ["NewsEvent_Find", "NewsEvent_FindById"],
     },
     NewsEvent_Delete: {
          url: "/news-event/:id",
          method: "DELETE",
          refetchQueries: ["NewsEvent_Find"],
     },
     NewsEvent_TogglePublish: {
          url: "/news-event/:id/publish",
          method: "POST",
          refetchQueries: ["NewsEvent_Find", "NewsEvent_FindById"],
     },
     NewsEvent_UploadImage: {
          url: "/news-event/upload/image",
          method: "POST",
     },
};
