export enum HomeSectionMenuEnum {
     TRON,
     WHYLEADAI,
     SERVICES,
     SOLUTION,
     PUBLICATION,
     FORM,
     // FAQ,
}

export const HomeSectionMenuEnumLabels: Record<HomeSectionMenuEnum, string> = {
     [HomeSectionMenuEnum.TRON]: "Tron",
     [HomeSectionMenuEnum.WHYLEADAI]: "Why Lead AI",
     [HomeSectionMenuEnum.SERVICES]: "Services",
     [HomeSectionMenuEnum.SOLUTION]: "Solution",
     [HomeSectionMenuEnum.PUBLICATION]: "Publication",
     [HomeSectionMenuEnum.FORM]: "Form",
     // [HomeSectionMenuEnum.FAQ]: "FAQ",
};

// Helper function to get enum key by its label
export const getHomeSectionMenuEnumByLabel = (label: string): HomeSectionMenuEnum | null => {
     const entry = Object.entries(HomeSectionMenuEnumLabels).find(([, value]) => value === label);
     return entry ? (Number(entry[0]) as HomeSectionMenuEnum) : null;
};

export enum GlobalSectionMenuEnum {
     HEADER,
     FOOTER,
}

export const GlobalSectionMenuEnumLabels: Record<GlobalSectionMenuEnum, string> = {
     [GlobalSectionMenuEnum.HEADER]: "Header",
     [GlobalSectionMenuEnum.FOOTER]: "Footer",
};

// Helper function to get global section enum key by its label
export const getGlobalSectionMenuEnumByLabel = (label: string): GlobalSectionMenuEnum | null => {
     const entry = Object.entries(GlobalSectionMenuEnumLabels).find(([, value]) => value === label);
     return entry ? (Number(entry[0]) as GlobalSectionMenuEnum) : null;
};
