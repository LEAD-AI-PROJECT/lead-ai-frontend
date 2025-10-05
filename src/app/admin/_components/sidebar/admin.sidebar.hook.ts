"use client";

import { useRouter } from "next/navigation";

export default function useAdminSidebarHook() {
     const router = useRouter();

     return {
          router,
     };
}
