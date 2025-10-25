import * as yup from "yup";

export const HomeFormSchema = yup.object({
     firstName: yup.string().required("First Name is required"),
     lastName: yup.string().required("Last Name is required"),
     email: yup.string().email("Invalid email format").required("Work Email is required"),
     phone: yup
          .string()
          .required("Phone Number is required")
          .matches(/^[0-9]+$/, "Phone Number must contain only numbers")
          .max(15, "Phone Number max 15 characters"),
     company: yup.string().optional(),
     message: yup.string().required("Message is required"),
     formType: yup.string().default("contact"),
});
