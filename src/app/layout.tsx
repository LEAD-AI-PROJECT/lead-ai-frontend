import FooterView from "@/components/footer/footer.view";
import NavbarView from "@/components/navbar/Navbar.view";
import type { Metadata } from "next";
import "./globals.scss";

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
                    <FooterView />
               </body>
          </html>
     );
}
