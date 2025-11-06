import React from "react";

export interface ServiceItemProps {
     class: "v1" | "v2" | "v3";
     title: React.ReactNode | string;
     description: React.ReactNode | string;
     link: string;
     variant?: "v1" | "v2" | "v3"; // Added for backend compatibility
}

export const serviceItems: ServiceItemProps[] = [
     {
          class: "v1",
          title: (
               <>
                    Data Cleansing for <br /> AI-Ready R&D
               </>
          ),
          description: (
               <>
                    Standardize and structure messy datasets for faster, more accurate AI
                    development. Our data cleansing services help you clean research data at speed
                    so your models learn from reliable, high-quality inputs
               </>
          ),
          link: "#",
     },
     {
          class: "v2",
          title: <>Custom AI for Pharma</>,
          description: (
               <>
                    Need a custom AI model? We turn pharma challenges into AI solutions fast. From
                    concept to deployment, we help you build tailored models without wasting time or
                    budget.
               </>
          ),
          link: "#",
     },
     {
          class: "v3",
          title: (
               <>
                    Full-Stack <br />
                    AI Services
               </>
          ),
          description: (
               <>
                    From annotation to deployment, we support every step of the AI journey. Whether
                    you are mining literature, labeling data, training models, or preparing for
                    launch, our experts help your teams move faster with confidence.
               </>
          ),
          link: "#",
     },
];
