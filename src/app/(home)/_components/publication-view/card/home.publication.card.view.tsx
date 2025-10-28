import React from "react";
import Link from "next/link";
import "../../home.style.scss";
import { HomePublicationItemProps } from "../home.publication.item";

export const HomePublicationCardView = ({
     date,
     description,
     link,
     title,
}: HomePublicationItemProps) => {
     const shortDesc = typeof description === "string" ? description.substring(0, 100) + "..." : "";

     return (
          <div className="home-publication-card">
               <div className="content">
                    <Link className="home-publication-card-title " href={link} target="_blank">
                         {title}
                    </Link>
                    <div className="home-publication-card-description">{shortDesc}</div>
               </div>
               <div className="home-publication-card-action">
                    <div className="date">{date}</div>
                    <div className="button-action">
                         <Link href={link} target="_blank">
                              SEE MORE
                         </Link>
                    </div>
               </div>
          </div>
     );
};

export default HomePublicationCardView;
