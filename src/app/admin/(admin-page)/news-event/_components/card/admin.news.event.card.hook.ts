"use client";
import { useRouter } from "next/navigation";

export default function useAdminNewsEventCardHook() {
     const router = useRouter();
     return { router };
}
