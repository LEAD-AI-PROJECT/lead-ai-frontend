import * as yup from "yup";

export const PublicationUpsertSchema = yup.object({
     title: yup.string().required("Title is required"),
     description: yup.string().required("Description is required"),
     img_url: yup.string().url("Invalid URL").nullable().notRequired(),
     // optional fields used by the admin form
     date: yup.date().nullable().notRequired(),
     link: yup.string().url("Invalid URL").nullable().notRequired(),
     user: yup.string().nullable().notRequired(),
});
