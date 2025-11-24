"use client";
import "../home.style.scss";
import useHomeWhyLeadAI from "./home.why-lead-ai.hook";
import MarkdownPreview from "@/components/markdown/markdown-preview";

export default function HomeWhyLeadAIView() {
     const { data, isLoading } = useHomeWhyLeadAI();

     // Extract optionSection data
     const cards = data?.optionSection?.cards || [
          { title: "Stronger Data Foundations", variant: "v1" as const },
          { title: "Evidence at Speed", variant: "v2" as const },
          { title: "Tailored for Pharma", variant: "v3" as const },
     ];

     // Always use exactly 3 cards (no more, no less)
     const card1 = cards[0] || { title: "Stronger Data Foundations", variant: "v1" as const };
     const card2 = cards[1] || { title: "Evidence at Speed", variant: "v2" as const };
     const card3 = cards[2] || { title: "Tailored for Pharma", variant: "v3" as const };

     const buttonText = data?.optionSection?.button?.text || "See how we work >";
     const buttonLink = data?.optionSection?.button?.link || "#";

     // Get shadow class based on variant
     const getShadowClass = (variant: string) => {
          switch (variant) {
               case "v1":
                    return "secondary-shadow";
               case "v2":
                    return "primary-bottom-shadow";
               case "v3":
                    return "primary-shadow";
               default:
                    return "secondary-shadow";
          }
     };

     if (isLoading || !data) {
          return (
               <div className="lg:p-[3rem] md:p-[2rem] sm:p-[1rem] p-[10px]">
                    <div className="home-why-ai">
                         <div className="home-why-ai-header">
                              <div className="skeleton h-10 w-3/4 mb-4"></div>
                         </div>
                         <div className="home-why-ai-content">
                              <div className="home-why-ai-content-item">
                                   <div className="grid lg:md:grid-cols-2 gap-1 sm:gap-2 md:gap-4 lg:gap-8 h-full">
                                        <div className="grid gap-1 sm:gap-2 md:gap-4 lg:gap-8">
                                             <div className="skeleton h-32"></div>
                                             <div className="skeleton h-32"></div>
                                        </div>
                                        <div className="skeleton h-64"></div>
                                   </div>
                              </div>
                              <div className="home-why-ai-content-item">
                                   <div className="skeleton h-40 w-full"></div>
                              </div>
                         </div>
                         <div className="home-why-ai-actions">
                              <div className="skeleton h-10 w-48"></div>
                         </div>
                    </div>
               </div>
          );
     }

     return (
          <div className="lg:p-[3rem] md:p-[2rem] sm:p-[1rem] p-[10px]">
               <div className="home-why-ai">
                    <div className="home-why-ai-header">
                         <MarkdownPreview content={data?.title || ""} />
                    </div>
                    <div className="home-why-ai-content">
                         <div className="home-why-ai-content-item">
                              <div className="grid lg:md:grid-cols-2 gap-1 sm:gap-2 md:gap-4 lg:gap-8 h-full">
                                   {/* Left Column - 2 cards stacked */}
                                   <div className="grid gap-1 sm:gap-2 md:gap-4 lg:gap-8">
                                        {/* Card 1 - Always v1 */}
                                        <div className="home-why-ai-card-content v1">
                                             <div className="secondary-shadow" />
                                             <div className="text">{card1.title}</div>
                                        </div>

                                        {/* Card 2 - Always v2 */}
                                        <div className="home-why-ai-card-content v2">
                                             <div className="primary-bottom-shadow" />
                                             <div className="text">{card2.title}</div>
                                        </div>
                                   </div>

                                   {/* Right Column - Card 3 */}
                                   <div className="home-why-ai-card-content v3">
                                        <div className="primary-shadow" />
                                        <div className="text">{card3.title}</div>
                                   </div>
                              </div>
                         </div>
                         <div className="home-why-ai-content-item">
                              <MarkdownPreview content={data?.description || ""} />
                         </div>
                    </div>
                    <div className="home-why-ai-actions">
                         <button
                              className="button-action"
                              onClick={() => {
                                   if (buttonLink.startsWith("#")) {
                                        document
                                             .querySelector(buttonLink)
                                             ?.scrollIntoView({ behavior: "smooth" });
                                   } else {
                                        globalThis.location.href = buttonLink;
                                   }
                              }}
                         >
                              {buttonText}
                         </button>
                    </div>
               </div>
          </div>
     );
}
