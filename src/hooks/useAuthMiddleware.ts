"use client";

import { useAuth } from "@/hooks/react-query/useAuth";
import { RoleGuard } from "@/lib/guards";
import { Role } from "@/types/enums/role.enum";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface UseAuthMiddlewareOptions {
     requiredRole?: Role;
     requireAdmin?: boolean;
     requireSuperAdmin?: boolean;
     redirectTo?: string;
}

export function useAuthMiddleware({
     requiredRole,
     requireAdmin = false,
     requireSuperAdmin = false,
     redirectTo = "/auth/login",
}: UseAuthMiddlewareOptions = {}) {
     const { user, isAuthenticated, userLoading } = useAuth();
     const router = useRouter();
     const pathname = usePathname();

     useEffect(() => {
          console.log("🔍 useAuthMiddleware effect:", {
               userLoading,
               isAuthenticated: isAuthenticated(),
               user: user?.email,
               role: user?.role,
               pathname,
               requireAdmin,
               requireSuperAdmin,
               requiredRole,
          });

          // Don't redirect during loading
          if (userLoading) {
               console.log("⏳ User loading, skipping redirect");
               return;
          }

          // Check if user is authenticated (check both cookie and user data)
          const hasToken = isAuthenticated();
          const hasUserData = !!user;

          if (!hasToken && !hasUserData) {
               console.log(
                    "🚫 User not authenticated (no token and no user data), redirecting to login"
               );
               const loginUrl = new URL(redirectTo, globalThis.location.origin);
               loginUrl.searchParams.set("redirect", pathname);
               router.push(loginUrl.toString());
               return;
          }

          // If we have user data but no token, it might be a cookie issue - allow access
          if (!hasToken && hasUserData) {
               console.log(
                    "⚠️ No token found but user data exists - possible cookie issue, allowing access"
               );
          }

          // If user is authenticated, check role requirements
          if (user?.role) {
               let hasAccess = true;

               if (requireSuperAdmin) {
                    hasAccess = RoleGuard.isSuperAdmin(user.role);
               } else if (requireAdmin) {
                    hasAccess = RoleGuard.canAccessAdmin(user.role);
               } else if (requiredRole) {
                    hasAccess = RoleGuard.hasRole(user.role, requiredRole);
               }

               console.log("🔐 Role check result:", { hasAccess, userRole: user.role });

               if (!hasAccess) {
                    console.log("❌ Access denied, redirecting to unauthorized");
                    router.push("/unauthorized");
               } else {
                    console.log("✅ Access granted");
               }
          } else {
               console.log("🤷 No user role found");
          }
     }, [
          user,
          isAuthenticated,
          userLoading,
          router,
          pathname,
          requiredRole,
          requireAdmin,
          requireSuperAdmin,
          redirectTo,
     ]);

     const getAccessStatus = (): boolean => {
          if (!user?.role) return false;

          if (requireSuperAdmin) return RoleGuard.isSuperAdmin(user.role);
          if (requireAdmin) return RoleGuard.canAccessAdmin(user.role);
          if (requiredRole) return RoleGuard.hasRole(user.role, requiredRole);

          return true;
     };

     return {
          user,
          isLoading: userLoading,
          isAuthenticated: isAuthenticated(),
          hasAccess: getAccessStatus(),
     };
}

// Admin-specific hook
export function useAdminMiddleware() {
     return useAuthMiddleware({
          requireAdmin: true,
          redirectTo: "/auth/login?redirect=/admin",
     });
}

// Super Admin-specific hook
export function useSuperAdminMiddleware() {
     return useAuthMiddleware({
          requireSuperAdmin: true,
          redirectTo: "/auth/login?redirect=/admin",
     });
}
