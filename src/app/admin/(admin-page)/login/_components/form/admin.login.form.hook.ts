import { useState } from "react";

export function useAdminLoginForm() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState("");

     function handleSubmit(e: React.FormEvent) {
          e.preventDefault();
          setError("");
          if (!email || !password) {
               setError("Please provide both email and password.");
               return;
          }
          // placeholder: replace with real auth logic
          console.log("login", { email, password });
     }

     return { email, setEmail, password, setPassword, error, setError, handleSubmit };
}
