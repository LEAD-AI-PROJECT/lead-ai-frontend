export interface UserProfileResponseType {
     id: string;
     email: string;
     name?: string;
     phone?: string;
     avatar?: string;
     bio?: string;
     address?: string;
     role: string;
     isActive: boolean;
     createdAt: string;
     updatedAt: string;
}

export interface UpdateProfileRequest {
     name?: string;
     phone?: string;
     bio?: string;
     address?: string;
     avatar?: string;
}

export interface ChangePasswordRequest {
     currentPassword: string;
     newPassword: string;
}
