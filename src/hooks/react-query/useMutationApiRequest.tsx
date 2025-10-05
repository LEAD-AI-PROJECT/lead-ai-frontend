import { allMutations } from "@/data-services/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import cookies from "js-cookie";
import { AxiosErrorResponse } from "./GlobalApiResponse";
import { useContext } from "react";
import { constructUrl } from "@/data-services/utils/constructUrl";
import { AllQueryKeys } from "@/data-services/queries";
import { LoadingContext } from "@/components/provider/QueryProvider";
import { aesDecrypter } from "@/shared/aes_enc";

type MutationApiRequestProps<T, V> = {
     key: keyof typeof allMutations;
     params?: Record<string, any>;
     queries?: Record<string, any>;
     options?: {
          onSuccess?: (data?: T) => void;
          onError?: (error?: Error) => void;
          onSettled?: () => void;
     };
     config?: {
          showLoading?: boolean;
          successNotification?: boolean;
          errorNotification?: boolean;
          successNotificationMessage?: string;
          errorNotificationMessage?: string;
     };
};

// Create Axios instance
const axiosInstance = axios.create({
     baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

// Get token from cookies
const getAuthToken = () => aesDecrypter(cookies.get("access_token") ?? "");

const useMutationApiRequest = <T, V>({
     key,
     queries,
     options,
     params,
     config = {
          showLoading: true,
          successNotification: true,
          errorNotification: true,
     },
}: MutationApiRequestProps<T, V>) => {
     const queryClient = useQueryClient();
     const mutationConfig = allMutations[key];
     const { setLoading } = useContext(LoadingContext);
     const mutationFn = async (data: V): Promise<T> => {
          const isFormData = data instanceof FormData;

          // Conditionally build headers
          const headers: Record<string, string> = {};
          if (isFormData) {
               headers["Content-Type"] = "multipart/form-data";
          }
          const token = getAuthToken();

          if (token) {
               headers["Authorization"] = `Bearer ${token}`;
          }

          let url = mutationConfig.url;
          url = constructUrl(url, { query: params });

          const response = await axiosInstance({
               url: url,
               method: mutationConfig.method,
               data,
               headers,
               params: queries,
          });

          return response.data;
     };

     return useMutation<T, AxiosErrorResponse, V>({
          mutationFn,
          onMutate: () => {
               // start loading (if enabled)
               if (config.showLoading && typeof setLoading === "function") setLoading(true);
          },
          onSuccess: data => {
               if (options?.onSuccess) options.onSuccess(data);
               if (mutationConfig.refetchQueries) {
                    mutationConfig.refetchQueries.forEach((queryKey: AllQueryKeys) => {
                         queryClient.refetchQueries({ queryKey: [queryKey] });
                    });
               }
               // Show success notification by default, unless explicitly disabled
               if (config?.successNotification ?? true) {
                    const msg =
                         config?.successNotificationMessage ?? (data as any)?.message ?? "Success";
                    // showSuccessNotification(msg);
               }
               console.log("Mutation successful:", data);
          },
          onError: error => {
               if (options?.onError) options.onError(error);
               console.error("Mutation failed:", error);
               // Show error notification by default, unless explicitly disabled
               if (config?.errorNotification ?? true) {
                    const errMsg =
                         config?.errorNotificationMessage ??
                         error.response?.data?.message ??
                         error.message ??
                         "Something went wrong";
                    // showErrorNotification(errMsg);
               }
          },
          onSettled: () => {
               if (options?.onSettled) options.onSettled();
               // stop loading (if enabled)
               if (config.showLoading && typeof setLoading === "function") setLoading(false);
          },
     });
};

export default useMutationApiRequest;
