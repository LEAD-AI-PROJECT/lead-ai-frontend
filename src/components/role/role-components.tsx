import { Role, getRoleLabel } from "@/types/enums/role.enum";
import { RoleGuard } from "@/lib/guards";

interface RoleBadgeProps {
     role: Role | string;
     className?: string;
}

export function RoleBadge({ role, className = "text-white" }: RoleBadgeProps) {
     const getBadgeColor = (userRole: Role | string) => {
          if (RoleGuard.isSuperAdmin(userRole)) return "badge-error";
          if (RoleGuard.isAdmin(userRole)) return "badge-warning";
          if (RoleGuard.isMember(userRole)) return "badge-info";
          return "badge-neutral";
     };

     return <div className={`badge ${getBadgeColor(role)} ${className}`}>{getRoleLabel(role)}</div>;
}

interface RoleGuardComponentProps {
     userRole: Role | string | undefined;
     requiredRole?: Role;
     requireAdmin?: boolean;
     requireSuperAdmin?: boolean;
     children: React.ReactNode;
     fallback?: React.ReactNode;
}

export function RoleGuardComponent({
     userRole,
     requiredRole,
     requireAdmin = false,
     requireSuperAdmin = false,
     children,
     fallback = <div>Access denied</div>,
}: RoleGuardComponentProps) {
     let hasAccess = false;

     if (requireSuperAdmin) {
          hasAccess = RoleGuard.isSuperAdmin(userRole);
     } else if (requireAdmin) {
          hasAccess = RoleGuard.canAccessAdmin(userRole);
     } else if (requiredRole) {
          hasAccess = RoleGuard.hasRole(userRole, requiredRole);
     }

     return hasAccess ? <>{children}</> : <>{fallback}</>;
}
