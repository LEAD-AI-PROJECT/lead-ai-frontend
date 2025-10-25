"use client";

import { useAuthMiddleware } from "@/hooks/useAuthMiddleware";
import { Role } from "@/types/enums/role.enum";
import { ComponentType } from "react";

interface WithAuthOptions {
     requiredRole?: Role;
     requireAdmin?: boolean;
     requireSuperAdmin?: boolean;
     redirectTo?: string;
     loadingComponent?: ComponentType;
     unauthorizedComponent?: ComponentType;
}

// Default loading component
const DefaultLoading = () => (
     <div className="min-h-screen flex items-center justify-center">
          <div className="loading loading-spinner loading-lg"></div>
     </div>
);

// Default unauthorized component
const DefaultUnauthorized = () => (
     <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
               <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
               <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
     </div>
);

export function withAuth<P extends object>(
     WrappedComponent: ComponentType<P>,
     options: WithAuthOptions = {}
) {
     const {
          requiredRole,
          requireAdmin = false,
          requireSuperAdmin = false,
          redirectTo = "/auth/login",
          loadingComponent: LoadingComponent = DefaultLoading,
          unauthorizedComponent: UnauthorizedComponent = DefaultUnauthorized,
     } = options;

     const AuthenticatedComponent = (props: P) => {
          const { isLoading, hasAccess } = useAuthMiddleware({
               requiredRole,
               requireAdmin,
               requireSuperAdmin,
               redirectTo,
          });

          if (isLoading) {
               return <LoadingComponent />;
          }

          if (!hasAccess) {
               return <UnauthorizedComponent />;
          }

          return <WrappedComponent {...props} />;
     };

     AuthenticatedComponent.displayName = `withAuth(${
          WrappedComponent.displayName || WrappedComponent.name
     })`;

     return AuthenticatedComponent;
}

// Convenience HOCs for common use cases
export const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) =>
     withAuth(WrappedComponent, { requireAdmin: true });

export const withSuperAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>) =>
     withAuth(WrappedComponent, { requireSuperAdmin: true });

export const withRoleAuth = <P extends object>(
     WrappedComponent: ComponentType<P>,
     requiredRole: Role
) => withAuth(WrappedComponent, { requiredRole });
