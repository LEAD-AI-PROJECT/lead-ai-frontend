export interface NavarItemInterface {
     label: string;
     href: string;
     icon: string;
     children?: NavarItemInterface[];
}

export const navbarItem: NavarItemInterface[] = [
     { label: "Home", href: "#", icon: "home" },
     { label: "Solutions", href: "#solutions", icon: "info" },
     { label: "Services", href: "#services", icon: "phone" },
     { label: "Resources", href: "#resources", icon: "phone" },
     {
          label: "Company",
          href: "#company",
          icon: "phone",
          children: [
               {
                    label: "About Us",
                    href: "#about",
                    icon: "info",
               },
               {
                    label: "Contact Us",
                    href: "#contact",
                    icon: "phone",
               },
          ],
     },
];
