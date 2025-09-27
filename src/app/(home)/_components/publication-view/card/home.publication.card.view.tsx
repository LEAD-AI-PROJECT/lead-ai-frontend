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
     return (
          <div className="home-publication-card">
               <div className="content">
                    <div className="home-publication-card-title">{title}</div>
                    <div className="home-publication-card-description">{description}</div>
               </div>
               <div className="home-publication-card-action">
                    <div className="date">{date}</div>
                    <div className="button-action">
                         <Link href={link}>SEE MORE</Link>
                    </div>
               </div>
          </div>
     );
};

export default HomePublicationCardView;
