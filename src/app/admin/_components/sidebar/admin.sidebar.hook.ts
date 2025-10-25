"use client";

import { useAuth } from "@/hooks/react-query/useAuth";
import { useRouter } from "next/navigation";

export default function useAdminSidebarHook() {
     const router = useRouter();
     const { logout, user } = useAuth();

     const handleLogout = () => {
          logout();
     };

     return {
          router,
          user,
          handleLogout,
     };
}
