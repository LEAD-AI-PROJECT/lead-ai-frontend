"use client";
import HomePublicationCardView from "./card/home.publication.card.view";
import { useHomePublicationHook } from "./home.publication.hook";

export default function HomePublicationView() {
     const { publications } = useHomePublicationHook();
     return (
          <div id="resources" className="home-publication">
               <div className="home-publication-title">Publication</div>
               <div className="home-publication-subtitle">
                    Explore selected papers and patents from the Lead AI team. Each publication
                    reflects our commitment to advancing AI in pharma through rigorous science,
                    validated methods, and real-world impact.
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
