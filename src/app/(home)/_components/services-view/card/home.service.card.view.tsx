import Link from "next/link";
import arrowRight from "@public/assets/icon/arrow-right.svg";
import Image from "next/image";
import { ServiceItemProps } from "../home.services.item";
import MarkdownPreview from "@/components/markdown/markdown-preview";

export default function HomeServiceCard({ item }: Readonly<{ item: ServiceItemProps }>) {
     // Check if title/description are strings (from backend) or ReactNode (static)
     const isStringTitle = typeof item.title === "string";
     const isStringDescription = typeof item.description === "string";

     return (
          <div className={`home-service-card ${item.class}`}>
               <div className="content">
                    <div className="title">
                         {isStringTitle ? (
                              <MarkdownPreview
                                   content={item.title as string}
                                   className="!prose-invert"
                                   textColor="text-white"
                              />
                         ) : (
                              item.title
                         )}
                    </div>
                    <div className="description">
                         {isStringDescription ? (
                              <MarkdownPreview
                                   content={item.description as string}
                                   className="!prose-invert"
                                   textColor="text-white"
                              />
                         ) : (
                              item.description
                         )}
                    </div>
               </div>
               <div className="action">
                    <Link href={item.link} className="flex items-center gap-2">
                         Explore More <Image src={arrowRight} alt="arrow-right" />
                    </Link>
               </div>
          </div>
     );
}
