import { Camera, FormInputIcon, LayoutDashboard, Newspaper } from "lucide-react";

export const AdminSidebarItem: { label: string; href: string; icon?: React.ReactNode }[] = [
     { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={16} /> },
     { label: "News & Events", href: "/admin/news-event", icon: <Newspaper size={16} /> },
     { label: "Publication", href: "/admin/publication", icon: <Camera size={16} /> },
     {
          label: "Form Landingpage",
          href: "/admin/form-landingpage",
          icon: <FormInputIcon size={16} />,
     },
];
