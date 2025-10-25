// News Event Image Type
export interface ImageNewsEventType {
     id: string;
     newsEventId: string;
     imageUrl: string;
     caption?: string;
     createdAt: string;
}

// Author Type
export interface AuthorType {
     id: string;
     name?: string;
     email: string;
}

// News Event Response Type
export interface NewsEventResponseType {
     id: string;
     title: string;
     slug: string;
     content: string;
     eventDate?: string;
     authorId: string;
     author: AuthorType;
     isPublished: boolean;
     publishedAt?: string;
     images: ImageNewsEventType[];
     createdAt: string;
     updatedAt: string;
}

// Request Types
export interface UpsertNewsEventRequest {
     title: string;
     content: string;
     eventDate?: string;
     images?: string[]; // Array of image URLs
}
