import MainProvider from "@/components/provider/main.provider";
import type { Metadata } from "next";
import "./globals.scss";
import QueryProvider from "@/components/provider/QueryProvider";

export const metadata: Metadata = {
     title: "Data Cleaning Services for AI-driven Pharma & Biotech | Lead AI",
     description:
          "Data Cleaning Services for AI-driven Pharma & Biotech. Unlock high-quality, AI-ready data for pharmaceutical and biotech innovation. Expert data cleansing, compliance, and automation for your R&D.",
     alternates: {
          canonical: "https://aileadyou.com/",
     },
     robots: {
          index: true,
          follow: true,
     },
};

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en" data-theme="light">
               <head>
                    <link rel="canonical" href="https://aileadyou.com/" />
                    <meta name="robots" content="index, follow" />
               </head>
               <body>
                    <QueryProvider>
                         <MainProvider>
                              <div className="body-item">{children}</div>
                         </MainProvider>
                    </QueryProvider>
               </body>
          </html>
     );
}
