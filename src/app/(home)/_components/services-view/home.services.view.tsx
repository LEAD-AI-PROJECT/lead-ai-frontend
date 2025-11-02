"use client";
import "../home.style.scss";
import HomeServiceCard from "./card/home.service.card.view";
import useHomeServices from "./home.services.hook";
import { serviceItems } from "./home.services.item";
import MarkdownPreview from "@/components/markdown/markdown-preview";

export default function HomeServicesView() {
     const { data, isLoading } = useHomeServices();

     if (isLoading) {
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
                         {serviceItems[0] && (
                              <HomeServiceCard key={serviceItems[0].link} item={serviceItems[0]} />
                         )}
                         <div className="grid lg:md:flex justify-between gap-2 sm:gap-2 md:gap-4 lg:gap-8">
                              {serviceItems?.map((item, index) => {
                                   if (index > 0) {
                                        return (
                                             <HomeServiceCard key={item.link + index} item={item} />
                                        );
                                   }
                              })}
                         </div>
                    </div>
               </div>
          </div>
     );
}
