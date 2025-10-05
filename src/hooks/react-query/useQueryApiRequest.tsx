import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import cookies from "js-cookie";
import { AxiosErrorResponse } from "./GlobalApiResponse";
import { useContext, useEffect } from "react";
import { constructUrl } from "@/data-services/utils/constructUrl";
import { allQueries } from "@/data-services/queries";
import { aesDecrypter } from "@/shared/aes_enc";
import { LoadingContext } from "@/components/provider/QueryProvider";

const axiosInstance = axios.create({
     baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
     headers: {
          "Content-Type": "application/json",
     },
});

type QueryApiRequestProps<T> = {
     key: keyof typeof allQueries;
     params?: Record<string, any>;
     queries?: Record<string, any>;
     options?: Omit<UseQueryOptions<T, AxiosErrorResponse>, "queryKey" | "queryFn">;
     onSuccess?: (data: T) => void;
     config?: {
          showLoading?: boolean;
          successNotification?: boolean;
          errorNotification?: boolean;
          successNotificationMessage?: string;
          errorNotificationMessage?: string;
     };
};

const getAuthToken = () => aesDecrypter(cookies.get("access_token") ?? "");

const useQueryApiRequest = <T,>({
     key,
     params,
     queries,
     options,
     config = {
          showLoading: true,
          successNotification: false,
          errorNotification: true,
     },
     onSuccess,
}: QueryApiRequestProps<T>) => {
     const queryKey = [key, params, queries];
     const { setLoading } = useContext(LoadingContext);
     const queryFn = async (): Promise<T> => {
          const token = getAuthToken();

          const headers: Record<string, string> = {
               "Content-Type": "application/json",
          };

          headers["Authorization"] = `Bearer ${token}`;

          let url = allQueries[key];
          url = constructUrl(url, { query: params });

          const response = await axiosInstance.get(url, {
               params: queries,
               headers,
          });

          return response.data;
     };

     const queryFetch = useQuery<T, AxiosErrorResponse>({
          queryKey,
          queryFn,
          ...options,
     });

     useEffect(() => {
          if (config.showLoading) {
               if (queryFetch.isLoading) {
                    setLoading(true);
               }
               if (queryFetch.isError || queryFetch.isSuccess) {
                    setLoading(false);
               }
          }

          if (queryFetch.isError) {
               if (config.errorNotification ?? true) {
                    // showErrorNotification(
                    //      config.errorNotificationMessage ??
                    //           queryFetch.error.response?.data?.message ??
                    //           queryFetch.error?.message
                    // );
               }
          }

          if (queryFetch.isSuccess) {
               if (onSuccess && queryFetch.data) {
                    onSuccess(queryFetch.data);
               }

               if (config.successNotification ?? false) {
                    // showSuccessNotification(
                    //      config.successNotificationMessage ??
                    //           (queryFetch.data as any).message ??
                    //           "Success"
                    // );
               }
          }
     }, [
          queryFetch.isLoading,
          queryFetch.isError,
          queryFetch.isSuccess,
          queryFetch.data,
          queryFetch.error,
     ]);

     return queryFetch;
};

export default useQueryApiRequest;
