import { Camera, Dot, FormInputIcon, LayoutDashboard, Newspaper, SquareMenu } from "lucide-react";

export interface AdminSidebarItemType {
     label: string;
     href: string;
     icon?: React.ReactNode;
     children?: AdminSidebarItemType[];
}

export const AdminSidebarItem: AdminSidebarItemType[] = [
     { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={16} /> },
     { label: "News & Events", href: "/admin/news-event", icon: <Newspaper size={16} /> },
     { label: "Publication", href: "/admin/publication", icon: <Camera size={16} /> },
     {
          label: "Form Landingpage",
          href: "/admin/form-landingpage",
          icon: <FormInputIcon size={16} />,
     },
     {
          label: "Menu Management",
          href: "",
          icon: <SquareMenu size={16} />,
          children: [
               {
                    label: "Home Section",
                    href: "/admin/menu-management/home-section",
                    icon: <Dot size={14} />,
               },
          ],
     },
];
