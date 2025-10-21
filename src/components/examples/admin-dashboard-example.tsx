/**
 * Example usage of Role Enums and Guards
 * This file shows how to use the role system in components
 */

import { useAuth } from "@/hooks/react-query/useAuth";
import { Role } from "@/types/enums/role.enum";
import { RoleGuard } from "@/lib/guards";
import { RoleBadge, RoleGuardComponent } from "@/components/role/role-components";

export function AdminDashboardExample() {
     const { user } = useAuth();

     return (
          <div className="p-6">
               <div className="mb-4">
                    <h1>Admin Dashboard</h1>
                    {user && (
                         <div className="flex items-center gap-2">
                              <span>Welcome, {user.email}</span>
                              <RoleBadge role={user.role} />
                         </div>
                    )}
               </div>

               {/* Super Admin Only Section */}
               <RoleGuardComponent
                    userRole={user?.role}
                    requireSuperAdmin={true}
                    fallback={
                         <div className="alert alert-warning">Super Admin access required</div>
                    }
               >
                    <div className="card bg-red-50 p-4 mb-4">
                         <h2>Super Admin Controls</h2>
                         <p>This section is only visible to Super Admins</p>
                         <button className="btn btn-error">Dangerous Action</button>
                    </div>
               </RoleGuardComponent>

               {/* Admin Only Section */}
               <RoleGuardComponent
                    userRole={user?.role}
                    requireAdmin={true}
                    fallback={<div className="alert alert-info">Admin access required</div>}
               >
                    <div className="card bg-yellow-50 p-4 mb-4">
                         <h2>Admin Controls</h2>
                         <p>This section is visible to Admins and Super Admins</p>
                         <button className="btn btn-warning">Admin Action</button>
                    </div>
               </RoleGuardComponent>

               {/* Specific Role Section */}
               <RoleGuardComponent
                    userRole={user?.role}
                    requiredRole={Role.MEMBER}
                    fallback={<div className="alert alert-success">Member access required</div>}
               >
                    <div className="card bg-blue-50 p-4 mb-4">
                         <h2>Member Area</h2>
                         <p>This section is only visible to Members</p>
                         <button className="btn btn-info">Member Action</button>
                    </div>
               </RoleGuardComponent>

               {/* Conditional Rendering Examples */}
               <div className="card bg-gray-50 p-4">
                    <h2>Conditional Features</h2>

                    {RoleGuard.canAccessAdmin(user?.role) && (
                         <button className="btn btn-primary mr-2">Admin Feature</button>
                    )}

                    {RoleGuard.isSuperAdmin(user?.role) && (
                         <button className="btn btn-error mr-2">Super Admin Feature</button>
                    )}

                    {RoleGuard.hasRole(user?.role, Role.MEMBER) && (
                         <button className="btn btn-info mr-2">Member Feature</button>
                    )}

                    {/* Role Level Based */}
                    {RoleGuard.hasMinimumRole(user?.role, Role.ADMIN) && (
                         <button className="btn btn-secondary">Minimum Admin Level</button>
                    )}
               </div>
          </div>
     );
}
