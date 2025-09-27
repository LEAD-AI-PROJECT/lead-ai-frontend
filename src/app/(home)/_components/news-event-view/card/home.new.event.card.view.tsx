import Image from "next/image";
import { HomeNewsEventItemProps } from "../home.news.event.item";

export const HomeNewsEventCardView = ({
     date,
     description,
     image,
     link,
     title,
     user,
}: HomeNewsEventItemProps) => {
     return (
          <div className="home-news-event-card">
               <div className="img-event">
                    <img src={image.src} alt={title} />
               </div>
               <div className="user-chip">{user}</div>
               <div className="title">{title}</div>
               <div className="description">{description}</div>
          </div>
     );
};
