import HomePublicationCardView from "./card/home.publication.card.view";
import { homePublicationItems } from "./home.publication.item";

export default function HomePublicationView() {
     return (
          <div id="resources" className="home-publication">
               <div className="home-publication-title">Publication</div>
               <div className="home-publication-subtitle">
                    Explore selected papers and patents from the Lead AI team. Each publication
                    reflects our commitment to advancing AI in pharma through rigorous science,
                    validated methods, and real-world impact.
               </div>
               <div className="home-publication-list mt-10">
                    {homePublicationItems.map((item, index) => (
                         <HomePublicationCardView key={item.link + index} {...item} />
                    ))}
               </div>
               <div className="flex justify-center relative z-10 mt-10">
                    <button className="secondary ">
                         <div className="text-xl">More Article</div>
                    </button>
               </div>
          </div>
     );
}
