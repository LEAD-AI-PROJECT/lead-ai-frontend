export enum NewsEventType {
     NEWS = "news",
     EVENT = "event",
}

export const NewsEventTypeLabels: Record<NewsEventType, string> = {
     [NewsEventType.NEWS]: "News",
     [NewsEventType.EVENT]: "Event",
};

export enum FormType {
     CONTACT = "contact",
     DEMO_REQUEST = "demo_request",
     NEWSLETTER = "newsletter",
}

export const FormTypeLabels: Record<FormType, string> = {
     [FormType.CONTACT]: "Contact Form",
     [FormType.DEMO_REQUEST]: "Demo Request",
     [FormType.NEWSLETTER]: "Newsletter Subscription",
};

export enum PublicationStatus {
     DRAFT = "draft",
     PUBLISHED = "published",
     ARCHIVED = "archived",
}

export const PublicationStatusLabels: Record<PublicationStatus, string> = {
     [PublicationStatus.DRAFT]: "Draft",
     [PublicationStatus.PUBLISHED]: "Published",
     [PublicationStatus.ARCHIVED]: "Archived",
};
