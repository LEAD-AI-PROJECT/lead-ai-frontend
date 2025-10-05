"use client";
import { usePathname } from "next/navigation";
import AdminSidebar from "./_components/sidebar/admin.sidebar";

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     const pathname = usePathname();

     if (pathname == "/admin/login" || pathname == "/admin/register") {
          return <>{children}</>;
     } else {
          return (
               <div className="flex w-full ">
                    <AdminSidebar>
                         <div className="flex flex-col">{children}</div>
                    </AdminSidebar>
               </div>
          );
     }
}
