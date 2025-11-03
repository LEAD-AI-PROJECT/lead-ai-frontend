export interface ImagePublicationType {
     id: string;
     publicationId: string;
     imageUrl: string;
     caption?: string;
     createdAt: string;
}

export interface AuthorType {
     id: string;
     name?: string;
     email: string;
}

export interface PublicationResponseType {
     id: string;
     title: string;
     slug: string;
     content: string;
     authorId: string;
     author?: AuthorType;
     link?: string;
     isPublished: boolean;
     publishedAt?: string;
     images?: ImagePublicationType[];
     createdAt: string;
     updatedAt: string;
}

export interface UpsertPublicationRequest {
     title: string;
     content: string;
     images?: string[];
}
