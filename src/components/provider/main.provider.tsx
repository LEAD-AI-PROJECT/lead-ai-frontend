"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import FooterView from "../footer/footer.view";
import NavbarView from "../navbar/Navbar.view";

export default function MainProvider({ children }: Readonly<{ children: ReactNode }>) {
     const pathname = usePathname();

     if (pathname.startsWith("/admin")) {
          return <>{children}</>;
     } else {
          return (
               <>
                    <NavbarView />
                    {children}
                    <FooterView />
               </>
          );
     }
}
