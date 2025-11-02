import Link from "next/link";
import { useFooterHook } from "./footer.hook";
import "./footer.style.scss";
import Image from "next/image";

// Social media icon imports
import instagramIcon from "@public/assets/icon/Instagram.svg";
import whatsappIcon from "@public/assets/icon/whatsapp.svg";
import xIcon from "@public/assets/icon/x.svg";

interface SocialIconMap {
     [key: string]: string;
}

// Static icon mapping - fallback to default if icon not found
const SOCIAL_ICON_MAP: SocialIconMap = {
     instagram: instagramIcon,
     whatsapp: whatsappIcon,
     x: xIcon,
     // Fallback for other icon names to static icons
     facebook: instagramIcon,
     twitter: xIcon,
     linkedin: whatsappIcon,
};

export default function FooterView() {
     const { footerData, isLoading, isError } = useFooterHook();

     // Show loading state
     if (isLoading) {
          return (
               <div className="footerr-loading">
                    <div>Loading footer...</div>
               </div>
          );
     }

     // Show error state
     if (isError) {
          return (
               <div className="footerr-error">
                    <div>Error loading footer</div>
               </div>
          );
     }

     // If no data, show empty state but still render container
     if (!footerData) {
          return (
               <div className="footerr">
                    <div className="footerr-body">
                         <div>No footer data available</div>
                    </div>
               </div>
          );
     }

     const { columns = [], socialLinks = [], copyright } = footerData;

     return (
          <div className="footerr">
               <div className="footerr-body">
                    {/* 4-Column Grid Layout */}
                    <div className="footerr-grid">
                         {/* Left 3 columns for content */}
                         <div className="footerr-columns">
                              {columns.map(column => (
                                   <div key={`column-${column.title}`} className="footerr-column">
                                        <div className="title">{column.title}</div>
                                        <div className="items">
                                             {column.items?.map(item => (
                                                  <Link
                                                       key={`${column.title}-${item.label}`}
                                                       href={item.link}
                                                       className="item-link"
                                                  >
                                                       {item.label}
                                                  </Link>
                                             ))}
                                        </div>
                                   </div>
                              ))}
                         </div>

                         {/* Right column (Column 4) for social links */}
                         <div className="footerr-social-section">
                              <div className="title">Get In Touch</div>
                              <div className="description">
                                   You'll find your next home, in any style you prefer.
                              </div>
                              <div className="social-links">
                                   {socialLinks.map((social, idx) => {
                                        const iconSrc =
                                             SOCIAL_ICON_MAP[social.icon] || instagramIcon;
                                        return (
                                             <Link
                                                  key={`social-${social.icon}-${idx}`}
                                                  href={social.link}
                                                  className="social-icon"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                             >
                                                  <Image
                                                       src={iconSrc}
                                                       width={24}
                                                       height={24}
                                                       alt={social.icon}
                                                  />
                                             </Link>
                                        );
                                   })}
                              </div>
                         </div>
                    </div>
               </div>

               {/* Copyright section */}
               <div className="footerr-copyright">{copyright}</div>
          </div>
     );
}
