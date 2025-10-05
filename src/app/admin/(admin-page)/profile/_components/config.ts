import * as yup from "yup";

export const AdminProfileSchema = yup.object({
     name: yup.string().required("Name is required"),
     phone: yup.string().nullable().notRequired(),
     email: yup.string().email("Invalid email").required("Email is required"),
     address: yup.string().nullable().notRequired(),
     bio: yup.string().nullable().notRequired(),
     photo: yup.string().url("Invalid URL").nullable().notRequired(),
});

export type AdminProfileUpsert = yup.InferType<typeof AdminProfileSchema>;

export const AdminProfileChangePasswordSchema = yup.object({
     current_password: yup.string().required("Current password is required"),
     new_password: yup.string().required("New password is required"),
     confirm_password: yup
          .string()
          .oneOf([yup.ref("new_password")], "Passwords must match")
          .required("Confirm your new password"),
});

export type AdminProfileChangePassword = yup.InferType<typeof AdminProfileChangePasswordSchema>;
