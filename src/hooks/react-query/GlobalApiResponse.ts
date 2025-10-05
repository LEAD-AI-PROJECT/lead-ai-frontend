import { AxiosError } from "axios";

export interface GlobalApiResponse<T> {
     status: number;
     success: boolean;
     message: string;
     data: T;
     errors?: any;
     meta: Meta;
}

export interface ErrorData {
     message?: string;
     statusCode?: number;
}

export type AxiosErrorResponse = AxiosError<ErrorResponse>;

export interface ErrorResponse {
     error: string;
     message: string;
}

export type Meta = {
     limit: number;
     page: number;
     total_data: number;
     total_data_page: number;
};
