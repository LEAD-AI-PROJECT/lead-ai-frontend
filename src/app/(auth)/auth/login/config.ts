import * as yup from "yup";

// Login form validation schema
export const loginSchema = yup.object({
     email: yup
          .string()
          .email("Please enter a valid email address")
          .required("Email is required")
          .trim()
          .lowercase(),

     password: yup
          .string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters long")
          .max(50, "Password must not exceed 50 characters"),

     rememberMe: yup.boolean().default(false),
});

// Type for login form data
export type LoginFormData = yup.InferType<typeof loginSchema>;

// Demo accounts configuration
export const demoAccounts = [
     {
          label: "Admin Account",
          email: "admin@leadai.com",
          password: "Password123!",
          role: "ADMIN",
          description: "Full admin access to dashboard",
     },
     {
          label: "Super Admin Account",
          email: "superadmin@leadai.com",
          password: "Password123!",
          role: "SUPERADMIN",
          description: "Complete system administration",
     },
] as const;

// Remember me localStorage keys
export const STORAGE_KEYS = {
     REMEMBER_ME: "leadai_remember_me",
     SAVED_EMAIL: "leadai_saved_email",
} as const;
