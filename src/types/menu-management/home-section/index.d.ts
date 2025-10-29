export interface HomeSectionMenuResponse<T> {
     id: string;
     title: string;
     description?: string | null;
     type: string;
     option_section?: T | null;
     createdAt: string;
     createdBy?: string | null;
     updatedAt: string;
     updatedBy?: string | null;
     deletedAt?: string | null;
     deletedBy?: string | null;
}
