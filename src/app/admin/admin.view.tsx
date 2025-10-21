"use client";

import Link from "next/link";
import React from "react";
import { withAdminAuth } from "@/components/hoc/withAuth";
import { useAuth } from "@/hooks/react-query/useAuth";
import { RoleBadge } from "@/components/role/role-components";

interface AdminViewProps {}

const AdminView: React.FC<AdminViewProps> = () => {
     const { user, logout } = useAuth();

     const handleLogout = () => {
          logout();
     };

     return (
          <div className="min-h-screen bg-gray-100 p-6">
               {/* Header */}
               <div className="lg:flex justify-between items-center mb-8">
                    <div>
                         <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                         {user && (
                              <div className="lg:flex items-center gap-2 mt-2">
                                   <span className="text-gray-600">Welcome, {user.email}</span>
                                   <RoleBadge role={user.role} />
                              </div>
                         )}
                    </div>
               </div>

               {/* Dashboard Cards */}
               <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 max-w-6xl">
                    <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
                         <div className="card-body">
                              <h3 className="font-bold text-lg text-gray-800">News & Events</h3>
                              <div className="text-3xl font-bold text-primary">0</div>
                              <p className="text-sm text-gray-600 mb-4">
                                   Manage news articles and events
                              </p>
                              <Link className="btn btn-primary btn-sm" href="/admin/news-event">
                                   View Details
                              </Link>
                         </div>
                    </div>

                    <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
                         <div className="card-body">
                              <h3 className="font-bold text-lg text-gray-800">Publications</h3>
                              <div className="text-3xl font-bold text-secondary">0</div>
                              <p className="text-sm text-gray-600 mb-4">
                                   Manage research publications
                              </p>
                              <Link className="btn btn-secondary btn-sm" href="/admin/publication">
                                   View Details
                              </Link>
                         </div>
                    </div>

                    <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
                         <div className="card-body">
                              <h3 className="font-bold text-lg text-gray-800">Form Submissions</h3>
                              <div className="text-3xl font-bold text-accent">0</div>
                              <p className="text-sm text-gray-600 mb-4">
                                   View contact form submissions
                              </p>
                              <Link className="btn btn-accent btn-sm" href="/admin/forms">
                                   View Details
                              </Link>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default withAdminAuth(AdminView);
