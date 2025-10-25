import * as yup from "yup";

export const NewsEventUpsertSchema = yup.object({
     title: yup.string().required("Title is required").max(50, "Title max 50 characters"),
     content: yup.string().required("Content is required"),
     eventDate: yup
          .string()
          .nullable()
          .notRequired()
          .transform((value, originalValue) => {
               // If empty string, return null
               if (originalValue === "" || originalValue === null) return null;
               return value;
          }),
});
