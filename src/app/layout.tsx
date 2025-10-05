import MainProvider from "@/components/provider/main.provider";
import type { Metadata } from "next";
import "./globals.scss";
import QueryProvider from "@/components/provider/QueryProvider";

export const metadata: Metadata = {
     title: "Lead AI",
     description: "Build AI Fast and Right",
};

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en" data-theme="light">
               <body>
                    <MainProvider>
                         <QueryProvider>
                              <div className="body-item">{children}</div>
                         </QueryProvider>
                    </MainProvider>
               </body>
          </html>
     );
}
