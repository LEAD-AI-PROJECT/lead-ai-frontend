import "../home.style.scss";
import HomeServiceCard from "./home.service.card.view";
import { serviceItems } from "./home.services.item";

export default function HomeServicesView() {
     return (
          <div className="home-services">
               <div className="home-services-header">Services Overview</div>
               <div className="home-services-subheader">
                    From data cleansing to deployment, Lead AI delivers end-to-end AI services
                    designed for speed, accuracy, and real-world impact.
               </div>
               <div className="grid gap-8 w-full">
                    {serviceItems[0] && (
                         <HomeServiceCard key={serviceItems[0].link} item={serviceItems[0]} />
                    )}
                    <div className="flex justify-between gap-8">
                         {serviceItems?.map((item, index) => {
                              if (index > 0) {
                                   return <HomeServiceCard key={item.link} item={item} />;
                              }
                         })}
                    </div>
               </div>
          </div>
     );
}
