import FooterView from "@/components/footer/footer.view";
import NavbarView from "@/components/navbar/Navbar.view";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

// const inter = Inter({
//      variable: "--font-inter",
//      // subsets: ["latin"],
//      // weight: ["100"],
//      display: "swap",
// });

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
          <html lang="en">
               <body>
                    <NavbarView />
                    <div className="body-item">{children}</div>
                    {/* <FooterView /> */}
               </body>
          </html>
     );
}
