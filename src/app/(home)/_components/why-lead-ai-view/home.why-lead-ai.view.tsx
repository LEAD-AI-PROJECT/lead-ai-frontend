"use client";
import "../home.style.scss";
import useHomeWhyLeadAI from "./home.why-lead-ai.hook";
import MarkdownPreview from "@/components/markdown/markdown-preview";

export default function HomeWhyLeadAIView() {
     const { data, isLoading } = useHomeWhyLeadAI();

     if (isLoading) {
          return (
               <div className="lg:p-[3rem] md:p-[2rem] sm:p-[1rem] p-[10px]">
                    <div className="home-why-ai">
                         <div className="home-why-ai-header">
                              <div className="skeleton h-10 w-3/4 mb-4"></div>
                         </div>
                         <div className="home-why-ai-content">
                              <div className="home-why-ai-content-item">
                                   <div className="grid lg:md:grid-cols-2 gap-1 sm:gap-2 md:gap-4 lg:gap-8 h-full">
                                        <div className="grid gap-1 sm:gap-2 md:gap-4 lg:gap-8">
                                             <div className="skeleton h-32"></div>
                                             <div className="skeleton h-32"></div>
                                        </div>
                                        <div className="skeleton h-64"></div>
                                   </div>
                              </div>
                              <div className="home-why-ai-content-item">
                                   <div className="skeleton h-40 w-full"></div>
                              </div>
                         </div>
                         <div className="home-why-ai-actions">
                              <div className="skeleton h-10 w-48"></div>
                         </div>
                    </div>
               </div>
          );
     }

     return (
          <div className="lg:p-[3rem] md:p-[2rem] sm:p-[1rem] p-[10px]">
               <div className="home-why-ai">
                    <div className="home-why-ai-header">
                         <MarkdownPreview content={data?.title || ""} />
                    </div>
                    <div className="home-why-ai-content">
                         <div className="home-why-ai-content-item">
                              <div className="grid lg:md:grid-cols-2 gap-1 sm:gap-2 md:gap-4 lg:gap-8 h-full">
                                   <div className="grid gap-1 sm:gap-2 md:gap-4 lg:gap-8">
                                        <div className="home-why-ai-card-content v1">
                                             <div className="secondary-shadow"></div>
                                             <div className="text">Stronger Data Foundations</div>
                                        </div>
                                        <div className="home-why-ai-card-content v2">
                                             <div className="primary-bottom-shadow"></div>
                                             <div className="text">Evidence at Speed</div>
                                        </div>
                                   </div>
                                   <div className="home-why-ai-card-content v3">
                                        <div className="primary-shadow"></div>
                                        <div className="text">Tailored for Pharma</div>
                                   </div>
                              </div>
                         </div>
                         <div className="home-why-ai-content-item">
                              <MarkdownPreview content={data?.description || ""} />
                         </div>
                    </div>
                    <div className="home-why-ai-actions">
                         <button className="button-action">See how we work {`>`}</button>
                    </div>
               </div>
          </div>
     );
}
