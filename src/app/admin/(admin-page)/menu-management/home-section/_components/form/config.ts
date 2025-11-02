import * as yup from "yup";
export const HomeSectionFormConfig = yup.object({
     title: yup.string().required("Title is required"),
     description: yup.string().nullable(),
});
