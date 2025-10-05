"use client";
import { useRouter } from "next/navigation";

export default function useAdminPublicationCardHook() {
     const router = useRouter();
     return { router };
}
