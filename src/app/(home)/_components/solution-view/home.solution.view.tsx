"use client";
import Link from "next/link";
import gif from "@public/assets/gif/gif lead-min.gif";
import Image from "next/image";
import useHomeSolution from "./home.solution.hook";
import MarkdownPreview from "@/components/markdown/markdown-preview";

export default function HomeSolutionView() {
     const { data, isLoading } = useHomeSolution();

     if (isLoading) {
          return (
               <div id="solutions" className="home-solution">
                    <div className="home-solution-content">
                         <div className="home-solution-content-item">
                              <div className="skeleton h-12 w-3/4 mb-4"></div>
                              <div className="skeleton h-32 w-full"></div>
                         </div>
                         <div className="home-solution-content-item">
                              <div className="lg:md:flex lg:md:justify-end lg:pt-[8rem]">
                                   <div className="skeleton w-full lg:w-[90%] md:w-[95%] h-96"></div>
                              </div>
                              <div className="skeleton h-10 w-full mt-6"></div>
                         </div>
                    </div>
               </div>
          );
     }

     return (
          <div id="solutions" className="home-solution">
               <div className="home-solution-content">
                    <div className="home-solution-content-item">
                         <div className="home-solution-content-title">
                              <MarkdownPreview
                                   content={data?.title || ""}
                                   textColor="text-white"
                                   headingColor="text-white"
                              />
                         </div>
                         {/* <div className="home-solution-content-subtitle">
                              The Lead AI Platform: <br />
                              Data Cleaning Made Effortless
                         </div> */}
                         <div className="home-solution-content-description">
                              <MarkdownPreview
                                   content={data?.description || ""}
                                   textColor="text-white"
                              />
                         </div>
                    </div>
                    <div className="home-solution-content-item">
                         <div className="lg:md:flex lg:md:justify-end lg:pt-[8rem]">
                              <Image
                                   unoptimized // <-- penting biar GIF tetap animasi
                                   priority
                                   src={gif}
                                   alt="gif"
                                   className="w-full lg:w-[90%] md:w-[95%] h-auto rounded-lg shadow-lg"
                              />
                         </div>
                         <div className="home-solution-content-subtitle">
                              <MarkdownPreview
                                   content={
                                        data?.optionSection?.subtitle ||
                                        "Get early access and see how it worked before anyone else"
                                   }
                                   textColor="text-white"
                              />
                         </div>
                         <div className="home-solution-content-action">
                              <Link
                                   href={data?.optionSection?.action?.link || "#"}
                                   className="lg:text-4xl md:text-3xl text-2xl m-2 mt-6"
                              >
                                   {data?.optionSection?.action?.text || "Join the Waitlist"} {`>`}
                              </Link>
                         </div>
                    </div>
               </div>
          </div>
     );
}
