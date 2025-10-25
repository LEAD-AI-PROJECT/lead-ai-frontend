export interface FormLandingPageResponseType {
     id: string;
     firstName: string;
     lastName: string;
     email: string;
     phone?: string;
     company?: string;
     message?: string;
     formType: string;
     isProcessed: boolean;
     createdAt: string;
     updatedAt: string;
}

export interface CreateFormLandingPageRequest {
     firstName: string;
     lastName: string;
     email: string;
     phone?: string;
     company?: string;
     message?: string;
     formType: string;
}
