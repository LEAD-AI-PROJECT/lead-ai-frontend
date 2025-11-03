import { QueriesDataService } from "@/data-services/type";

export type UserQueryKeys = "User_GetProfile";

export const userQueries: QueriesDataService<UserQueryKeys> = {
     User_GetProfile: "/user/profile",
};
