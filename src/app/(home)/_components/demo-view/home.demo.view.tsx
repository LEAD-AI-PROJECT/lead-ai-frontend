"use client";
import HomeFormSectionView from "../form-view/form/home.form.section.view";
import MarkdownPreview from "@/components/markdown/markdown-preview";
import "../home.style.scss";
import useHomeDemo from "./home.demo.hook";

export default function HomeDemoView() {
     const { data, isLoading } = useHomeDemo();

     if (isLoading || !data) {
          return (
               <div className="lg:py-[3rem] md:py-[2rem] sm:py-[1rem] py-[10px] lg:px-[8rem] md:px-[2rem] sm:px-[1rem] px-[10px] bg-white">
                    <div className="home-demo">
                         <div className="home-demo-content">
                              <div className="content">
                                   <div className="skeleton h-10 w-2/3 mb-4"></div>
                                   <div className="skeleton h-20 w-full"></div>
                              </div>
                              <div className="content">
                                   <div className="skeleton h-40 w-full"></div>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }

     return (
          <div className="lg:py-[3rem] md:py-[2rem] sm:py-[1rem] py-[10px] lg:px-[8rem] md:px-[2rem] sm:px-[1rem] px-[10px] bg-white">
               <div className="home-demo">
                    <div className="home-demo-content">
                         <div className="content">
                              <div className="title">
                                   <MarkdownPreview
                                        content={data?.title || ""}
                                        textColor="text-white"
                                        headingColor="text-white"
                                   />
                              </div>
                              <div className="description">
                                   <MarkdownPreview
                                        content={data?.description || ""}
                                        textColor="text-white"
                                        headingColor="text-white"
                                   />
                              </div>
                         </div>
                         <div className="content">
                              {/* <div className="action">
                                   <button className="secondary">
                                        <div className="text-xl">Get a Free Demo</div>
                                   </button>
                                   <button className="dark">
                                        <div className="text-xl">More Info</div>
                                   </button>
                              </div> */}
                              <HomeFormSectionView />
                         </div>
                    </div>
               </div>
          </div>
     );
}
