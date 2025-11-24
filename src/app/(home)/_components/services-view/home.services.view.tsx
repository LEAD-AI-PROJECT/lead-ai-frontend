"use client";
import "../home.style.scss";
import HomeServiceCard from "./card/home.service.card.view";
import useHomeServices from "./home.services.hook";
import { serviceItems } from "./home.services.item";
import MarkdownPreview from "@/components/markdown/markdown-preview";

export default function HomeServicesView() {
     const { data, isLoading } = useHomeServices();

     // Get services from optionSection or use default static data
     const services = data?.optionSection?.services || serviceItems;

     // First service (large card on top)
     const firstService = services[0];
     // Remaining services (smaller cards in row below)
     const remainingServices = services.slice(1);

     if (isLoading || !data) {
          return (
               <div id="services" className="lg:p-[3rem] md:p-[2rem] sm:p-[1rem] p-[10px]">
                    <div className="home-services">
                         <div className="home-services-header">
                              <div className="skeleton h-10 w-2/3 mb-4"></div>
                         </div>
                         <div className="home-services-subheader">
                              <div className="skeleton h-20 w-full mb-8"></div>
                         </div>
                         <div className="grid gap-2 sm:gap-2 md:gap-4 lg:gap-8 w-full">
                              <div className="skeleton h-48"></div>
                              <div className="grid lg:md:flex justify-between gap-2 sm:gap-2 md:gap-4 lg:gap-8">
                                   <div className="skeleton h-40 flex-1"></div>
                                   <div className="skeleton h-40 flex-1"></div>
                                   <div className="skeleton h-40 flex-1"></div>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }

     return (
          <div id="services" className="lg:p-[3rem] md:p-[2rem] sm:p-[1rem] p-[10px]">
               <div className="home-services">
                    <div className="home-services-header">
                         <MarkdownPreview content={data?.title || ""} className="!prose-invert" />
                    </div>
                    <div className="home-services-subheader">
                         <MarkdownPreview
                              content={data?.description || ""}
                              className="!prose-invert"
                         />
                    </div>
                    <div className="grid gap-2 sm:gap-2 md:gap-4 lg:gap-8 w-full">
                         {/* First Service - Large Card */}
                         {firstService && (
                              <HomeServiceCard
                                   key={firstService.link || "service-0"}
                                   item={{
                                        class: ((firstService as any).class ||
                                             firstService.variant ||
                                             "v1") as "v1" | "v2" | "v3",
                                        title: firstService.title,
                                        description: firstService.description,
                                        link: firstService.link || "#",
                                   }}
                              />
                         )}

                         {/* Remaining Services - Smaller Cards in Row */}
                         {remainingServices.length > 0 && (
                              <div className="grid lg:md:flex lg:md:flex-wrap lg:md:items-stretch gap-2 sm:gap-2 md:gap-4 lg:gap-8">
                                   {remainingServices.map((item, index) => {
                                        // Determine flex size based on variant
                                        const isOrange =
                                             ((item as any).class || item.variant) === "v3";
                                        const flexClass = isOrange
                                             ? "lg:md:flex-[0.6]" // Smaller (orange card)
                                             : "lg:md:flex-1"; // Medium (purple-orange card)

                                        return (
                                             <div
                                                  key={item.link || `service-${index + 1}`}
                                                  className={`${flexClass} flex`}
                                             >
                                                  <HomeServiceCard
                                                       item={{
                                                            class: ((item as any).class ||
                                                                 item.variant ||
                                                                 "v2") as "v1" | "v2" | "v3",
                                                            title: item.title,
                                                            description: item.description,
                                                            link: item.link || "#",
                                                       }}
                                                  />
                                             </div>
                                        );
                                   })}
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
}
