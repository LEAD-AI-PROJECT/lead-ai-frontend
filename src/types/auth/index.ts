export interface LoginRequest {
     email: string;
     password: string;
}

export interface RegisterRequest {
     firstName: string;
     lastName: string;
     email: string;
     password: string;
}

export interface ForgetPasswordRequest {
     email: string;
}

export interface ResetPasswordRequest {
     token: string;
     newPassword: string;
}

import { Role } from "../enums/role.enum";

export interface AuthResponse {
     user: {
          id: string;
          firstName: string;
          lastName: string;
          email: string;
          role: Role;
          createdAt: string;
          updatedAt: string;
     };
     accessToken: string;
     refreshToken: string;
}

export interface GlobalResponse<T> {
     success: boolean;
     message: string;
     data: T;
}

export interface ForgetPasswordResponse {
     message: string;
     resetToken: string;
}

export interface User {
     id: string;
     firstName: string;
     lastName: string;
     email: string;
     role: Role;
     createdAt: string;
     updatedAt: string;
}
