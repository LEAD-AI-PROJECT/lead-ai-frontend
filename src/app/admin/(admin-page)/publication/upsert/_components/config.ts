import * as yup from "yup";

export const PublicationUpsertSchema = yup.object({
     title: yup.string().required("Title is required").max(50, "Title max 50 characters"),
     link: yup.string().url("Link must be a valid URL").notRequired(),
     content: yup.string().required("Content is required"),
     images: yup.array().of(yup.string()).notRequired(),
});
