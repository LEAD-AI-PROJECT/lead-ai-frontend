"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NewsEventUpsertSchema } from "./_components/config";
import { useState, useEffect } from "react";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import { NewsEventResponseType, UpsertNewsEventRequest } from "@/types/news-event";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function useAdminNewsEventUpsertHook(slug?: string) {
     const router = useRouter();
     const [imageUrls, setImageUrls] = useState<string[]>([]);
     const [uploadingImages, setUploadingImages] = useState(false);
     const isEditMode = !!slug;

     // Fetch existing data if editing
     const { data: newsEventData, isLoading } = useQueryApiRequest<
          GlobalApiResponse<NewsEventResponseType>
     >({
          key: "NewsEvent_FindById",
          params: { id: slug || "" },
          options: {
               enabled: isEditMode, // Only fetch if slug exists
          },
     });

     const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
          control,
          setValue,
          reset,
     } = useForm({
          resolver: yupResolver(NewsEventUpsertSchema),
          defaultValues: {
               title: "",
               content: "",
               eventDate: "",
          },
     });

     // Populate form when editing
     useEffect(() => {
          if (isEditMode && newsEventData?.data) {
               const data = newsEventData.data;

               // Format eventDate to datetime-local format (YYYY-MM-DDTHH:mm)
               // Backend returns ISO string, convert to datetime-local input format
               const formattedEventDate = data.eventDate
                    ? dayjs(data.eventDate).format("YYYY-MM-DDTHH:mm")
                    : "";

               reset({
                    title: data.title,
                    content: data.content,
                    eventDate: formattedEventDate,
               });

               // Set existing image URLs
               const existingUrls = data.images?.map(img => img.imageUrl) || [];
               setImageUrls(existingUrls);
          }
     }, [isEditMode, newsEventData, reset]);
     const createMutation = useMutationApiRequest<
          GlobalApiResponse<NewsEventResponseType>,
          UpsertNewsEventRequest
     >({
          key: "NewsEvent_Create",
          options: {
               onSuccess: () => {
                    router.push("/admin/news-event");
               },
          },
     });

     const updateMutation = useMutationApiRequest<
          GlobalApiResponse<NewsEventResponseType>,
          UpsertNewsEventRequest
     >({
          key: "NewsEvent_Update",
          params: { id: slug || "" },
          options: {
               onSuccess: () => {
                    router.push("/admin/news-event");
               },
          },
     });

     const uploadImageMutation = useMutationApiRequest<
          GlobalApiResponse<{ url: string; fileId: string }>,
          FormData
     >({
          key: "NewsEvent_UploadImage",
     });

     const onSubmit = async (data: any) => {
          // Convert datetime-local format to ISO string for backend
          const eventDateISO = data.eventDate ? dayjs(data.eventDate).toISOString() : undefined;

          const payload: UpsertNewsEventRequest = {
               title: data.title,
               content: data.content,
               eventDate: eventDateISO,
               images: imageUrls.length > 0 ? imageUrls : undefined,
          };

          // Use update or create mutation based on mode
          if (isEditMode) {
               updateMutation.mutate(payload);
          } else {
               createMutation.mutate(payload);
          }
     };

     const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = Array.from(e.target.files || []);
          if (files.length === 0) return;

          setUploadingImages(true);

          try {
               const uploadedUrls: string[] = [];

               for (const file of files) {
                    const formData = new FormData();
                    formData.append("file", file);

                    // Upload using mutation
                    const response = await uploadImageMutation.mutateAsync(formData);

                    if (response?.data?.url) {
                         uploadedUrls.push(response.data.url);
                    }
               }

               setImageUrls(prev => [...prev, ...uploadedUrls]);
          } catch (error) {
               console.error("Failed to upload images:", error);
          } finally {
               setUploadingImages(false);
               // Reset file input
               e.target.value = "";
          }
     };

     const removeImage = (url: string) => {
          setImageUrls(prev => prev.filter(imgUrl => imgUrl !== url));
     };

     return {
          register,
          handleSubmit: handleSubmit(onSubmit),
          errors,
          isSubmitting:
               isSubmitting ||
               createMutation.isPending ||
               updateMutation.isPending ||
               uploadingImages,
          control,
          setValue,
          imageUrls,
          uploadingImages,
          onFileChange,
          removeImage,
          router,
          isEditMode,
          isLoading,
     };
}
