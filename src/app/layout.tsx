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
                    {/* Google Site Verification */}
                    <meta
                         name="google-site-verification"
                         content="2S6PysNiyxVMmLiI6mGByftMpDqgjwzbaKkBxOg62Nk"
                    />
                    {/* Google Tag Manager */}
                    <script
                         dangerouslySetInnerHTML={{
                              __html: `
                         (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                         new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                         j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                         'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                         })(window,document,'script','dataLayer','GTM-MQNJTHNR');
                    `,
                         }}
                    />
               </head>
               <body>
                    {/* Google Tag Manager (noscript) */}
                    <noscript>
                         <iframe
                              src="https://www.googletagmanager.com/ns.html?id=GTM-MQNJTHNR"
                              height="0"
                              width="0"
                              style={{ display: "none", visibility: "hidden" }}
                         ></iframe>
                    </noscript>
                    <QueryProvider>
                         <MainProvider>
                              <div className="body-item">{children}</div>
                         </MainProvider>
                    </QueryProvider>
               </body>
          </html>
     );
}
