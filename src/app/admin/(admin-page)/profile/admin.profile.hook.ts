import { UserProfileResponseType, UpdateProfileRequest } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdminProfileSchema, AdminProfileUpsert } from "./_components/config";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import useMutationApiRequest from "@/hooks/react-query/useMutationApiRequest";

export default function useAdminProfile() {
     const router = useRouter();
     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
     const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
     const [showSuccess, setShowSuccess] = useState(false);
     const [showAvatarSuccess, setShowAvatarSuccess] = useState(false);

     const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
          setValue,
          getValues,
     } = useForm({
          resolver: yupResolver(AdminProfileSchema),
          mode: "onSubmit",
     });

     // Fetch profile
     const { data: profileData } = useQueryApiRequest<GlobalApiResponse<UserProfileResponseType>>({
          key: "User_GetProfile",
     });

     // Update profile mutation
     const updateProfileMutation = useMutationApiRequest<
          GlobalApiResponse<UserProfileResponseType>,
          UpdateProfileRequest
     >({
          key: "User_UpdateProfile",
     });

     // Upload avatar mutation
     const uploadAvatarMutation = useMutationApiRequest<
          GlobalApiResponse<{ url: string }>,
          FormData
     >({
          key: "User_UploadAvatar",
     });

     useEffect(() => {
          if (profileData?.data) {
               const profile = profileData.data;
               setValue("name", profile.name || "");
               setValue("email", profile.email);
               setValue("phone", profile.phone || "");
               setValue("address", profile.address || "");
               setValue("bio", profile.bio || "");
               if (profile.avatar) {
                    setPreviewUrl(profile.avatar);
               }
          }
     }, [profileData, setValue]);

     const onSubmit = async (values: AdminProfileUpsert) => {
          try {
               // Update profile
               await updateProfileMutation.mutateAsync({
                    name: values.name || undefined,
                    phone: values.phone || undefined,
                    bio: values.bio || undefined,
                    address: values.address || undefined,
               });

               // Show success message
               setShowSuccess(true);
               setTimeout(() => setShowSuccess(false), 5000);
          } catch (error) {
               console.error("Failed to update profile:", error);
          }
     };

     const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          try {
               setIsUploadingAvatar(true);

               // Set preview immediately
               const objectUrl = URL.createObjectURL(file);
               setPreviewUrl(objectUrl);

               // Upload avatar using mutation (auto-updates profile)
               const formData = new FormData();
               formData.append("file", file);

               await uploadAvatarMutation.mutateAsync(formData);

               // Show success message
               setShowAvatarSuccess(true);
               setTimeout(() => setShowAvatarSuccess(false), 5000);
          } catch (error) {
               console.error("Failed to upload avatar:", error);
               alert("Failed to upload avatar");
               // Reset preview on error
               if (profileData?.data?.avatar) {
                    setPreviewUrl(profileData.data.avatar);
               } else {
                    setPreviewUrl(null);
               }
          } finally {
               setIsUploadingAvatar(false);
          }
     };

     return {
          router,
          register,
          handleSubmit: handleSubmit(onSubmit),
          errors,
          isSubmitting: isSubmitting || updateProfileMutation.isPending,
          setValue,
          getValues,
          previewUrl,
          onFileChange,
          isUploadingAvatar,
          showSuccess,
          showAvatarSuccess,
     };
}
