export interface GlobalSectionColumn {
     title: string;
     items: Array<{
          label: string;
          link: string;
     }>;
}

export interface GlobalSectionSocialLink {
     icon: string;
     link: string;
}

export interface LogoContent {
     label: string;
     link: string; // ImageKit CDN URL from upload
}

export interface FooterContent {
     columns: GlobalSectionColumn[];
     copyright: string;
     socialLinks: GlobalSectionSocialLink[];
}

export interface HeaderContent {
     logo: LogoContent;
     navItems: Array<{
          label: string;
          link: string;
     }>;
     loginButton: {
          label: string;
          link: string;
     };
     cta: {
          label: string;
          link: string;
     };
}

export interface GlobalSectionMenuResponse {
     id: string;
     type: string;
     content: FooterContent | HeaderContent | Record<string, any>;
     createdAt: string;
     createdBy?: string | null;
     updatedAt: string;
     updatedBy?: string | null;
     deletedAt?: string | null;
     deletedBy?: string | null;
}
