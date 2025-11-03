import { MutationDataService } from "@/data-services/type";

export type UserMutationKeys = "User_UpdateProfile" | "User_ChangePassword" | "User_UploadAvatar";

export const userMutations: MutationDataService<UserMutationKeys> = {
     User_UpdateProfile: {
          url: "/user/profile",
          method: "PUT",
          refetchQueries: ["User_GetProfile"],
     },
     User_ChangePassword: {
          url: "/user/change-password",
          method: "POST",
     },
     User_UploadAvatar: {
          url: "/user/upload/avatar",
          method: "POST",
          refetchQueries: ["User_GetProfile"],
     },
};
