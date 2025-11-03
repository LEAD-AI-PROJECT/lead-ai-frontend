"use client";
import HomePublicationCardView from "./card/home.publication.card.view";
import { useHomePublicationHook } from "./home.publication.hook";
import MarkdownPreview from "@/components/markdown/markdown-preview";

export default function HomePublicationView() {
     const { publications, homeSectionData, isLoading, isPublicationsLoading } =
          useHomePublicationHook();

     if (isPublicationsLoading) {
          return (
               <div id="resources" className="home-publication">
                    <div className="home-publication-title">
                         <div className="skeleton h-10 w-2/3 mb-4"></div>
                    </div>
                    <div className="home-publication-subtitle">
                         <div className="skeleton h-20 w-full mb-8"></div>
                    </div>
                    <div className="home-publication-list mt-10">
                         <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                              {[1, 2, 3].map(index => (
                                   <div key={index} className="skeleton h-64"></div>
                              ))}
                         </div>
                    </div>
                    <div className="flex justify-center relative z-10 mt-10">
                         <div className="skeleton h-10 w-40"></div>
                    </div>
               </div>
          );
     }

     return (
          <div id="resources" className="home-publication">
               <div className="home-publication-title">
                    <MarkdownPreview content={homeSectionData?.title || ""} />
               </div>
               <div className="home-publication-subtitle">
                    <MarkdownPreview content={homeSectionData?.description || ""} />
               </div>
               <div className="home-publication-list mt-10">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                         {publications.map((item, index) => (
                              <HomePublicationCardView
                                   key={index}
                                   date={item.createdAt}
                                   title={item.title}
                                   description={item.content ?? ""}
                                   link={item.link ?? ""}
                              />
                         ))}
                    </div>
               </div>
               <div className="flex justify-center relative z-10 mt-10">
                    <button className="secondary ">
                         <div className="text-xl">More Article</div>
                    </button>
               </div>
          </div>
     );
}
