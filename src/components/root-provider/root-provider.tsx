"use client";
import { usePathname } from "next/navigation";
import NavbarView from "../navbar/Navbar.view";
import FooterView from "../footer/footer.view";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
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
};
