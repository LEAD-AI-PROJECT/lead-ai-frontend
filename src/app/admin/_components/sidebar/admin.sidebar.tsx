"use client";
import { Grip, User } from "lucide-react";
import Link from "next/link";
import useAdminSidebarHook from "./admin.sidebar.hook";
import { AdminSidebarItem } from "./admin.sidebar.item";

export default function AdminSidebar({ children }: Readonly<{ children?: React.ReactNode }>) {
     const { router, user, handleLogout } = useAdminSidebarHook();
     return (
          <>
               <div className="drawer lg:drawer-open w-fit">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                         {/* Page content here */}
                    </div>
                    <div className="drawer-side ">
                         <label
                              htmlFor="my-drawer-2"
                              aria-label="close sidebar"
                              className="drawer-overlay"
                         ></label>
                         <ul className="menu bg-white min-h-full w-80 p-4 gap-2">
                              {/* Sidebar content here */}
                              <div className="">
                                   <div className="text-2xl font-bold mb-6 text-center">
                                        ADMIN LEAD AI
                                   </div>
                              </div>
                              {AdminSidebarItem.map(item => (
                                   <li key={item.label} className="rounded-lg ">
                                        <div className="flex items-center gap-2">
                                             <div className="font-light">{item.icon}</div>
                                             <Link href={item.href}>{item.label}</Link>
                                        </div>
                                   </li>
                              ))}
                         </ul>
                    </div>
               </div>
               <div className="w-full">
                    <div className="navbar bg-white shadow-sm">
                         <div className="flex-none">
                              <label
                                   htmlFor="my-drawer-2"
                                   className="btn btn-ghost drawer-button lg:hidden"
                              >
                                   <Grip />
                              </label>
                         </div>
                         <div className="flex-1">
                              {/* <h2 className="font-bold">ADMIN LEAD AI</h2> */}
                         </div>
                         <div className="flex gap-2">
                              <button
                                   onClick={() => router.push("/admin/profile")}
                                   className="btn btn-warning"
                              >
                                   <User />
                              </button>
                              <button onClick={handleLogout} className="btn btn-error">
                                   Logout
                              </button>
                         </div>
                    </div>
                    <div className="lg:p-4 md:p-4  p-2 w-full">{children}</div>
               </div>
          </>
     );
}
