import { MutationDataService } from "../../type";

export type AuthKeys = "login" | "register" | "logout" | "forgetPassword" | "resetPassword";

export const authMutations: MutationDataService<AuthKeys> = {
     login: {
          url: "/auth/login",
          method: "POST",
     },
     register: {
          url: "/auth/register",
          method: "POST",
     },
     logout: {
          url: "/auth/logout",
          method: "POST",
     },
     forgetPassword: {
          url: "/auth/forget-password",
          method: "POST",
     },
     resetPassword: {
          url: "/auth/reset-password",
          method: "POST",
     },
};
