"use client";
import itbLogo from "@public/assets/img/home/itb-logo.svg";
import nusLogo from "@public/assets/img/home/nus-logo.svg";
import Image from "next/image";
import "../home.style.scss";
import useHomeJumbotron from "./home.jumbotron.hook";
import { HtmlContent } from "@/components/html/html-content";
export default function HomeJumbotronView() {
     const { data, isLoading } = useHomeJumbotron();

     if (isLoading || !data) {
          return (
               <div id="home" className="lg:p-[3rem] md:p-[2rem] sm:p-[1rem] p-[10px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta amet harum in
                    aliquam consectetur fugit quis aspernatur cupiditate fuga officia, eaque culpa
                    quam sint? Impedit obcaecati id consectetur mollitia? Sapiente!
                    <div className="home-jumbotron">
                         <div className="home-jumbotron-content">
                              <div className="home-jumbotron-content-title">
                                   <div className="skeleton h-12 w-full mb-4"></div>
                                   <div className="skeleton h-12 w-3/4"></div>
                              </div>
                              <div className="home-jumbotron-content-description">
                                   <div className="skeleton h-6 w-full mb-3"></div>
                                   <div className="skeleton h-6 w-full mb-3"></div>
                                   <div className="skeleton h-6 w-2/3"></div>
                              </div>
                         </div>
                         <div className="home-jumbotron-actions">
                              <div className="flex gap-4">
                                   <div className="skeleton h-10 w-40"></div>
                                   <div className="skeleton h-10 w-40"></div>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }

     // Extract button data from optionSection with proper typing
     const optionSection = data?.optionSection;
     const primaryButton = optionSection?.buttons?.primary;
     const secondaryButton = optionSection?.buttons?.secondary;
     const collaboration = optionSection?.collaboration;

     const primaryButtonText = primaryButton?.text || "Request a demo";
     const primaryButtonLink = primaryButton?.link || "#demo";
     const secondaryButtonText = secondaryButton?.text || "Talk to an expert";
     const secondaryButtonLink = secondaryButton?.link || "#contact";

     // Collaboration data
     const collaborationTitle = collaboration?.title || "In Collaboration With:";
     const partners = collaboration?.partners || [];

     // Fallback to static logos if no partners from backend
     const hasPartners = partners && partners.length > 0;

     return (
          <div id="home" className="lg:p-[3rem] md:p-[2rem] sm:p-[1rem] p-[10px]">
               <div className="home-jumbotron">
                    <div className="home-jumbotron-content">
                         <div className="home-jumbotron-content-title">
                              <HtmlContent>{data?.title || ""}</HtmlContent>
                         </div>
                         <div className="home-jumbotron-content-description">
                              <HtmlContent>{data?.description || ""}</HtmlContent>
                         </div>
                    </div>
                    <div className="home-jumbotron-actions">
                         <div className="flex gap-4">
                              <button
                                   className="button secondary"
                                   onClick={() => {
                                        if (primaryButtonLink.startsWith("#")) {
                                             document
                                                  .getElementById(primaryButtonLink.substring(1))
                                                  ?.scrollIntoView({ behavior: "smooth" });
                                        } else {
                                             window.location.href = primaryButtonLink;
                                        }
                                   }}
                              >
                                   {primaryButtonText}
                              </button>
                              <button
                                   className="button secondary bordered"
                                   onClick={() => {
                                        if (secondaryButtonLink.startsWith("#")) {
                                             document
                                                  .getElementById(secondaryButtonLink.substring(1))
                                                  ?.scrollIntoView({ behavior: "smooth" });
                                        } else {
                                             window.location.href = secondaryButtonLink;
                                        }
                                   }}
                              >
                                   {secondaryButtonText}
                              </button>
                         </div>
                         <div className="flex flex-col items-center gap-2">
                              <div className="text-sm">{collaborationTitle}</div>
                              <div className="flex gap-4">
                                   {hasPartners ? (
                                        // Render partners from backend
                                        partners.map((partner, index) => (
                                             <div key={index}>
                                                  {partner.link ? (
                                                       <a
                                                            href={partner.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            title={partner.name}
                                                       >
                                                            <Image
                                                                 src={partner.imageUrl}
                                                                 alt={partner.name}
                                                                 width={80}
                                                                 height={80}
                                                                 className="object-contain"
                                                            />
                                                       </a>
                                                  ) : (
                                                       <Image
                                                            src={partner.imageUrl}
                                                            alt={partner.name}
                                                            width={80}
                                                            height={80}
                                                            className="object-contain"
                                                       />
                                                  )}
                                             </div>
                                        ))
                                   ) : (
                                        // Fallback to static logos
                                        <>
                                             <Image src={nusLogo} alt="NUS logo" />
                                             <Image src={itbLogo} alt="ITB logo" />
                                        </>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
