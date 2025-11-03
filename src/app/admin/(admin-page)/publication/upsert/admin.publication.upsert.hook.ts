"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PublicationUpsertSchema } from "./_components/config";
import { useState, useEffect } from "react";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import { PublicationResponseType } from "@/types/publication";
import { useRouter } from "next/navigation";
import { InferType } from "yup";

export default function useAdminPublicationUpsertHook(slug?: string) {
     const router = useRouter();
     const [imageUrls, setImageUrls] = useState<string[]>([]);
     const [uploadingImages, setUploadingImages] = useState(false);
     const isEditMode = !!slug;

     // Fetch existing data if editing
     const { data: publicationData, isLoading } = useQueryApiRequest<
          GlobalApiResponse<PublicationResponseType>
     >({
          key: "Publication_FindById",
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
          resolver: yupResolver(PublicationUpsertSchema),
          defaultValues: {
               title: "",
               content: "",
               link: "",
               images: [],
          },
     });

     // Populate form when editing
     useEffect(() => {
          if (isEditMode && publicationData?.data) {
               const data = publicationData.data;

               reset({
                    title: data.title,
                    content: data.content,
                    link: data.link,
               });

               // Set existing image URLs
               const existingUrls = data.images?.map(img => img.imageUrl) || [];
               setImageUrls(existingUrls);
          }
     }, [isEditMode, publicationData, reset]);

     const createMutation = useMutationApiRequest<
          GlobalApiResponse<PublicationResponseType>,
          InferType<typeof PublicationUpsertSchema>
     >({
          key: "Publication_Create",
          options: {
               onSuccess: () => {
                    router.push("/admin/publication");
               },
          },
     });

     const updateMutation = useMutationApiRequest<
          GlobalApiResponse<PublicationResponseType>,
          InferType<typeof PublicationUpsertSchema>
     >({
          key: "Publication_Update",
          params: { id: slug || "" },
          options: {
               onSuccess: () => {
                    router.push("/admin/publication");
               },
          },
     });

     const uploadImageMutation = useMutationApiRequest<
          GlobalApiResponse<{ url: string; fileId: string }>,
          FormData
     >({
          key: "Publication_UploadImage",
     });

     const onSubmit = async (data: InferType<typeof PublicationUpsertSchema>) => {
          const payload: InferType<typeof PublicationUpsertSchema> = {
               title: data.title,
               content: data.content,
               link: data.link,
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
