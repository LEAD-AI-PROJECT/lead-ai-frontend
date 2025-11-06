// Option Section Types for different sections
export interface JumbotronOptionSection {
     buttons?: {
          primary?: {
               text: string;
               link?: string;
          };
          secondary?: {
               text: string;
               link?: string;
          };
     };
     collaboration?: {
          title?: string;
          partners?: Array<{
               name: string;
               imageUrl: string;
               link?: string;
          }>;
     };
}

export interface WhyLeadAIOptionSection {
     cards?: Array<{
          title: string;
          variant?: "v1" | "v2" | "v3";
     }>;
     button?: {
          text: string;
          link?: string;
     };
}

export interface ServicesOptionSection {
     services?: Array<{
          title: string;
          description: string;
          link?: string;
          variant?: "v1" | "v2" | "v3";
     }>;
}

export interface SolutionOptionSection {
     subtitle?: string;
     action?: {
          text: string;
          link?: string;
     };
}

export type HomeSectionOptionSection =
     | JumbotronOptionSection
     | WhyLeadAIOptionSection
     | ServicesOptionSection
     | SolutionOptionSection
     | Record<string, any>;

export interface HomeSectionMenuResponse<T = HomeSectionOptionSection> {
     id: string;
     title: string;
     description?: string | null;
     type: string;
     optionSection?: T | null;
     createdAt: string;
     createdBy?: string | null;
     updatedAt: string;
     updatedBy?: string | null;
     deletedAt?: string | null;
     deletedBy?: string | null;
}
