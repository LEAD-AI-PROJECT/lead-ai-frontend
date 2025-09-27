import React from "react";

export interface HomePublicationItemProps {
     title: React.ReactNode;
     description: React.ReactNode;
     date: string;
     link: string;
}

export const homePublicationItems: HomePublicationItemProps[] = [
     {
          title: (
               <>
                    <span>Network Pharmacology and Experimental: </span>Validation Identify
                    Paeoniflorin as a Novel SRC-Targeted Therapy for Castration-Resistant Prostate
                    Cancer.
               </>
          ),
          description: <>Xu MY, Zhang JB, Peng YZ, Liu MC, Ma SY, Zhou </>,
          date: "04 June 2025",
          link: "#",
     },
     {
          title: (
               <span>
                    Investigating the neuroprotective role of Synta-66 in type-2 diabetes
                    mellitus-induced dementia in rats
               </span>
          ),
          description: <>Ashi Mannan, Maneesh Mohan, Shareen Singh</>,
          date: "04 July 2025",
          link: "#",
     },
     {
          title: (
               <span>
                    Thymol suppressed tumor growth in vitro and in vivo through inducing calcium
                    overload in colorectal cancerGe
               </span>
          ),
          description: <>Hao Lin, Zongjun Chen, Weizhong Yang, Xianwei Wang</>,
          date: "04 June 2025",
          link: "#",
     },
];
