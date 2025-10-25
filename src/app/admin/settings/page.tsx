"use client";

import { useAdminMiddleware } from "@/hooks/useAuthMiddleware";
import { RoleGuard } from "@/lib/guards";
import { Role } from "@/types/enums/role.enum";

export default function SuperAdminSettingsPage() {
     const { user, isLoading } = useAdminMiddleware();

     if (isLoading) {
          return (
               <div className="min-h-screen flex items-center justify-center">
                    <div className="loading loading-spinner loading-lg"></div>
               </div>
          );
     }

     return (
          <div className="min-h-screen bg-gray-100 p-6">
               <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Settings</h1>

                    {/* General Settings - All Admins */}
                    <div className="card bg-white shadow-md mb-6">
                         <div className="card-body">
                              <h2 className="text-xl font-bold mb-4">General Settings</h2>
                              <p>Settings available to all admin users.</p>
                              <button className="btn btn-primary mt-4">
                                   Save General Settings
                              </button>
                         </div>
                    </div>

                    {/* Super Admin Only Settings */}
                    {RoleGuard.isSuperAdmin(user?.role) && (
                         <div className="card bg-red-50 border-red-200 shadow-md mb-6">
                              <div className="card-body">
                                   <h2 className="text-xl font-bold mb-4 text-red-700">
                                        Super Admin Settings
                                   </h2>
                                   <p className="text-red-600 mb-4">
                                        These settings are only available to Super Administrators.
                                   </p>
                                   <div className="space-y-4">
                                        <button className="btn btn-error">Delete All Data</button>
                                        <button className="btn btn-warning">Reset System</button>
                                        <button className="btn btn-info">Export Database</button>
                                   </div>
                              </div>
                         </div>
                    )}

                    {/* Role-specific features */}
                    <div className="card bg-white shadow-md">
                         <div className="card-body">
                              <h2 className="text-xl font-bold mb-4">Role-based Features</h2>

                              {RoleGuard.hasRole(user?.role, Role.SUPERADMIN) && (
                                   <div className="alert alert-error mb-4">
                                        <span>🔴 Super Admin: Full system access</span>
                                   </div>
                              )}

                              {RoleGuard.hasRole(user?.role, Role.ADMIN) &&
                                   !RoleGuard.isSuperAdmin(user?.role) && (
                                        <div className="alert alert-warning mb-4">
                                             <span>🟡 Admin: Limited administrative access</span>
                                        </div>
                                   )}

                              {RoleGuard.hasMinimumRole(user?.role, Role.ADMIN) && (
                                   <div className="mb-4">
                                        <h3 className="font-bold">Admin Features:</h3>
                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                             <li>Manage content</li>
                                             <li>View analytics</li>
                                             <li>Moderate users</li>
                                             {RoleGuard.isSuperAdmin(user?.role) && (
                                                  <>
                                                       <li>System configuration</li>
                                                       <li>User role management</li>
                                                       <li>Data backup/restore</li>
                                                  </>
                                             )}
                                        </ul>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
          </div>
     );
}
