import Link from "next/link";
import { ServiceItemProps } from "./home.services.item";
import arrowRight from "@public/assets/icon/arrow-right.svg";
import Image from "next/image";

export default function HomeServiceCard({ item }: { item: ServiceItemProps }) {
     return (
          <div className={`home-service-card ${item.class}`}>
               <div className="content">
                    <div className="title">{item.title}</div>
                    <div className="description">{item.description}</div>
               </div>
               <div className="action">
                    <Link href={item.link} className="flex items-center gap-2">
                         Explore More <Image src={arrowRight} alt="arrow-right" />
                    </Link>
               </div>
          </div>
     );
}
