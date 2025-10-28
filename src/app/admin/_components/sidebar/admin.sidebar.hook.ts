"use client";

import { useAuth } from "@/hooks/react-query/useAuth";
import { useRouter } from "next/navigation";

export default function useAdminSidebarHook() {
     const router = useRouter();
     const { logout, user } = useAuth();

     const handleCloseSidebar = () => {
          const drawerToggle = document.getElementById("my-drawer-2") as HTMLInputElement;
          if (drawerToggle) {
               drawerToggle.checked = false;
          }
     };

     const handleLogout = () => {
          logout();
     };

     return {
          router,
          user,
          handleLogout,
          handleCloseSidebar,
     };
}
