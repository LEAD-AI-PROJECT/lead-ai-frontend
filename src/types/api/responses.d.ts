/**
 * API Response Types
 * Eliminates the need for 'as any' type assertions
 */

export interface GlobalResponse<T = any> {
     status: number;
     message: string;
     success: boolean;
     data?: T;
}

export interface UploadResponse {
     url: string;
     path?: string;
}

export interface MutationResponse<T = any> {
     data: GlobalResponse<T>;
}

/**
 * Specific response types for file uploads
 */
export interface FileUploadResponse {
     data: {
          data: UploadResponse;
     };
}

export interface LogoUploadResponse {
     data: {
          data: {
               url: string;
          };
     };
}

/**
 * Success callback response from uploadLogo mutation
 */
export interface UploadLogoCallbackResponse {
     data: {
          url: string;
     };
}

/**
 * Form submission responses with dual type parameters
 * T = Form input type, R = Response data type
 */
export interface FormSubmitResponse<T = any, R = any> {
     data: GlobalResponse<R>;
     formData?: T;
}
