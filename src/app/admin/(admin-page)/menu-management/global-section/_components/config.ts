import * as yup from "yup";

export const headerValidationSchema = yup.object().shape({
     logo: yup.object().shape({
          label: yup.string().required("Logo label is required"),
          link: yup.string().required("Logo link is required"),
     }),
     navItems: yup
          .array()
          .of(
               yup.object({
                    label: yup.string().required("Label is required"),
                    link: yup.string().required("Link is required"),
               })
          )
          .required("Navigation items are required"),
     loginButton: yup.object().shape({
          label: yup.string().required("Login button label is required"),
          link: yup.string().required("Login button link is required"),
     }),
     cta: yup.object().shape({
          label: yup.string().required("CTA Label is required"),
          link: yup.string().required("CTA Link is required"),
     }),
});

export const footerValidationSchema = yup.object({
     columns: yup
          .array()
          .of(
               yup.object({
                    title: yup.string().required("Column title is required"),
                    items: yup
                         .array()
                         .of(
                              yup.object({
                                   label: yup.string().required("Item label is required"),
                                   link: yup.string().required("Item link is required"),
                              })
                         )
                         .required("Items are required"),
               })
          )
          .required("Columns are required"),
     copyright: yup.string().required("Copyright text is required"),
     socialLinks: yup
          .array()
          .of(
               yup.object({
                    icon: yup.string().required("Icon name is required"),
                    link: yup.string().required("Social link is required"),
               })
          )
          .required("Social links are required")
          .min(3, "Must have at least 3 social links")
          .max(3, "Maximum 3 social links allowed"),
});
