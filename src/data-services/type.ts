import { AllQueryKeys } from "./queries/index";

export type MutationDataService<T extends string> = {
     [key in T]: {
          url: string;
          method: "POST" | "PATCH" | "DELETE" | "PUT";
          refetchQueries?: AllQueryKeys[];
          // refetchQueries?:
          // | AllQueryKeys[] // static list
          // | ((options: { variables: any; data: any }) => (AllQueryKeys | unknown[])[]);
     };
};
export type QueriesDataService<T extends string> = {
     [key in T]: string;
};
