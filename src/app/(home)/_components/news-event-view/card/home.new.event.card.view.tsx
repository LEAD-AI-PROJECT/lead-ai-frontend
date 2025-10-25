import Image from "next/image";
import { HomeNewsEventItemProps } from "../home.news.event.item";

interface HomeNewsEventCardProps {
     newsEvent: HomeNewsEventItemProps;
}

export const HomeNewsEventCardView = ({ newsEvent }: HomeNewsEventCardProps) => {
     return (
          <div className="home-news-event-card">
               <div className="img-event">
                    <Image src={newsEvent.image} alt={newsEvent.title} width={400} height={300} />
               </div>
               <div className="user-chip">{newsEvent.user}</div>
               <div className="title">{newsEvent.title}</div>
               <div className="description">{newsEvent.description}</div>
          </div>
     );
};
