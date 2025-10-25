export enum Role {
     ADMIN = "ADMIN",
     MEMBER = "MEMBER",
     SUPERADMIN = "SUPERADMIN",
}

export const RoleLabels: Record<Role, string> = {
     [Role.ADMIN]: "Admin",
     [Role.MEMBER]: "Member",
     [Role.SUPERADMIN]: "Super Admin",
};

// Helper functions for role checking
export const isAdmin = (role: Role | string): boolean => {
     return role === Role.ADMIN || role === Role.SUPERADMIN;
};

export const isSuperAdmin = (role: Role | string): boolean => {
     return role === Role.SUPERADMIN;
};

export const isMember = (role: Role | string): boolean => {
     return role === Role.MEMBER;
};

export const hasAdminPrivileges = (role: Role | string): boolean => {
     return isAdmin(role) || isSuperAdmin(role);
};

export const getRoleLabel = (role: Role | string): string => {
     if (Object.values(Role).includes(role as Role)) {
          return RoleLabels[role as Role];
     }
     return role as string;
};
