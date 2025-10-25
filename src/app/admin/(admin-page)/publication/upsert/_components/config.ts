import * as yup from "yup";

export const PublicationUpsertSchema = yup.object({
     title: yup.string().required("Title is required").max(50, "Title max 50 characters"),
     content: yup.string().required("Content is required"),
});
