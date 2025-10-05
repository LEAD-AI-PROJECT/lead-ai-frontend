import { UserProfileResponseType } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdminProfileSchema, AdminProfileUpsert } from "./_components/config";

export default function useAdminProfile() {
     const router = useRouter();
     const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

     useEffect(() => {
          // Optionally fetch current profile and prefill
          const fetchProfile = async () => {
               try {
                    const res = await fetch(`/api/admin/profile`);
                    if (!res.ok) return;
                    const data: UserProfileResponseType = await res.json();
                    setValue("name", data.name);
                    setValue("phone", data.phone);
                    setValue("email", data.email);
                    setValue("address", data.address);
                    setValue("bio", data.bio);
                    setValue("photo", data.photo || null);
                    if (data.photo) setPreviewUrl(data.photo);
               } catch (err) {
                    // log so we can diagnose failures during development
                    // eslint-disable-next-line no-console
                    console.error("Failed to fetch admin profile:", err);
               }
          };
          void fetchProfile();
     }, [setValue]);

     const onSubmit = async (values: AdminProfileUpsert) => {
          console.log("submit profile", values);
          // implement API call here when backend is available
     };

     const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const objectUrl = URL.createObjectURL(file);
          setPreviewUrl(objectUrl);

          const reader = new FileReader();
          reader.onload = () => {
               const result = reader.result as string | null;
               if (result) setValue("photo", result);
          };
          reader.readAsDataURL(file);
     };

     return {
          router,
          register,
          handleSubmit: (handleSubmit as any)(onSubmit), // typed as any to satisfy generic mismatch
          errors,
          isSubmitting,
          setValue,
          getValues,
          previewUrl,
          onFileChange,
     };
}
