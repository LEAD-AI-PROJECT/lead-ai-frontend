import { MutationDataService } from "@/data-services/type";

export type AttachmentKeys = "Attachment_Upload";

export const attachmentMutations: MutationDataService<AttachmentKeys> = {
     Attachment_Upload: {
          url: "/news-event/upload/image",
          method: "POST",
     },
};
