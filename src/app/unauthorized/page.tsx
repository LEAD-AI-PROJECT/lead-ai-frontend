"use client";

import { useAuth } from "@/hooks/react-query/useAuth";
import { RoleBadge } from "@/components/role/role-components";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
     const { user, logout } = useAuth();
     const router = useRouter();

     const handleGoBack = () => {
          router.back();
     };

     const handleGoHome = () => {
          router.push("/");
     };

     const handleLogout = () => {
          logout();
          router.push("/");
     };

     return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
               <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="mb-6">
                         <div className="text-6xl text-red-500 mb-4">🚫</div>
                         <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
                         <p className="text-gray-600">
                              You don't have permission to access this resource.
                         </p>
                    </div>

                    {user && (
                         <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600 mb-2">Current user:</p>
                              <div className="flex items-center justify-center gap-2">
                                   <span className="font-medium">{user.email}</span>
                                   <RoleBadge role={user.role} />
                              </div>
                         </div>
                    )}

                    <div className="space-y-3">
                         <button onClick={handleGoBack} className="btn btn-primary w-full">
                              Go Back
                         </button>

                         <button onClick={handleGoHome} className="btn btn-secondary w-full">
                              Go to Home
                         </button>

                         {user && (
                              <button onClick={handleLogout} className="btn btn-outline w-full">
                                   Logout
                              </button>
                         )}
                    </div>

                    <div className="mt-6 text-xs text-gray-500">
                         <p>If you believe this is an error, please contact your administrator.</p>
                    </div>
               </div>
          </div>
     );
}
