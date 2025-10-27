import Image from "next/image";
import { NewsEventResponseType } from "@/types/news-event";
import Link from "next/link";

export const HomeNewsEventCardView = ({ newsEvent }: { newsEvent: NewsEventResponseType }) => {
     const shortDesc =
          typeof newsEvent.content === "string" ? newsEvent.content.substring(0, 100) + "..." : "";
     return (
          <div className="home-news-event-card">
               <div className="img-event">
                    <Image
                         src={newsEvent.images[0].imageUrl}
                         alt={newsEvent.title}
                         width={400}
                         height={300}
                    />
               </div>
               <div className="user-chip">{newsEvent.author.name}</div>
               <div className="title">{newsEvent.title}</div>
               <div className="description">{shortDesc}</div>
               <Link href={newsEvent.link ?? "#"} target="_blank">
                    More
               </Link>
          </div>
     );
};
