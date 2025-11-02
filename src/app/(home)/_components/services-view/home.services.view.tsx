import "../home.style.scss";
import HomeServiceCard from "./card/home.service.card.view";
import { serviceItems } from "./home.services.item";

export default function HomeServicesView() {
     return (
          <div id="services" className="lg:p-[3rem] md:p-[2rem] sm:p-[1rem] p-[10px]">
               <div className="home-services">
                    <div className="home-services-header">Services Overview</div>
                    <div className="home-services-subheader">
                         From data cleansing to deployment, Lead AI delivers end-to-end AI services
                         designed for speed, accuracy, and real-world impact.
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
