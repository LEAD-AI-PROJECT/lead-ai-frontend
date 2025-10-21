import { Role, hasAdminPrivileges, isSuperAdmin, isAdmin, isMember } from "@/types/enums/role.enum";

/**
 * Type alias for user role
 */
type UserRole = Role | string | undefined;

/**
 * Role guard utility functions
 */
export class RoleGuard {
     /**
      * Check if user has required role
      */
     static hasRole(userRole: UserRole, requiredRole: Role): boolean {
          if (!userRole) return false;
          return userRole === requiredRole;
     }

     /**
      * Check if user has any of the required roles
      */
     static hasAnyRole(userRole: UserRole, requiredRoles: Role[]): boolean {
          if (!userRole) return false;
          return requiredRoles.includes(userRole as Role);
     }

     /**
      * Check if user has admin privileges (ADMIN or SUPERADMIN)
      */
     static canAccessAdmin(userRole: UserRole): boolean {
          if (!userRole) return false;
          return hasAdminPrivileges(userRole);
     }

     /**
      * Check if user is super admin
      */
     static isSuperAdmin(userRole: UserRole): boolean {
          if (!userRole) return false;
          return isSuperAdmin(userRole);
     }

     /**
      * Check if user is admin (not super admin)
      */
     static isAdmin(userRole: UserRole): boolean {
          if (!userRole) return false;
          return isAdmin(userRole);
     }

     /**
      * Check if user is member
      */
     static isMember(userRole: UserRole): boolean {
          if (!userRole) return false;
          return isMember(userRole);
     }

     /**
      * Get minimum role level (lower number = higher privilege)
      */
     static getRoleLevel(role: UserRole): number {
          switch (role) {
               case Role.SUPERADMIN:
                    return 1;
               case Role.ADMIN:
                    return 2;
               case Role.MEMBER:
                    return 3;
               default:
                    return 999;
          }
     }

     /**
      * Check if user has minimum role level
      */
     static hasMinimumRole(userRole: UserRole, minimumRole: Role): boolean {
          if (!userRole) return false;
          return this.getRoleLevel(userRole) <= this.getRoleLevel(minimumRole);
     }
}
