import AdminSidebar from "./_components/sidebar/admin.sidebar";

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <>
               <AdminSidebar />
               {children}
          </>
     );
}
