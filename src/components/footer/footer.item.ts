interface FooterItemInterface {
     label: string;
     href: string;
     icon: string;
     children?: FooterItemInterface[];
}

export const footerItem: FooterItemInterface[] = [
     {
          label: "Product",
          href: "#",
          icon: "product",
          children: [
               {
                    label: "Listing",
                    href: "#listing",
                    icon: "listing",
               },
               { label: "Property", href: "#property", icon: "property" },
               { label: "Agents", href: "#agents", icon: "agents" },
               { label: "Blog", href: "#blog", icon: "blog" },
          ],
     },
     {
          label: "Resources",
          href: "#resources",
          icon: "resources",
          children: [
               { label: "Our Homes", href: "#home", icon: "home" },
               { label: "Member Stories", href: "#stories", icon: "stories" },
               { label: "Video", href: "#video", icon: "video" },
               { label: "Free Trial", href: "#trial", icon: "trial" },
          ],
     },
     {
          label: "Company",
          href: "#company",
          icon: "company",
          children: [
               { label: "Partnership", href: "#partnership", icon: "partnership" },
               { label: "Terms of Use", href: "#terms", icon: "terms" },
               { label: "Privacy", href: "#privacy", icon: "privacy" },
               { label: "Sitemap", href: "#sitemap", icon: "sitemap" },
          ],
     },
];
