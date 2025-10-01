import "../home.style.scss";
export default function HomeWhyLeadAIView() {
     return (
          <div className="lg:p-[3rem] md:p-[2rem] sm:p-[1rem] p-[10px]">
               <div className="home-why-ai">
                    <div className="home-why-ai-header">Why Lead.AI?</div>
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
                              <div className="home-why-ai-content-title">
                                   Smarter AI, less hassle. Cut 80% of the work and still
                                   outperform.
                              </div>
                              <p className="">
                                   Behind every high-performing AI model is datasets that’s been
                                   handled with precision. At Lead AI, we believe the foundation of
                                   great AI starts long before algorithms,  it starts with clean,
                                   trusted, high-integrity data.
                              </p>
                              <p>
                                   Powered by a patented method from the National University of
                                   Singapore, our platform transforms messy, fragmented bioactivity
                                   data into formats AI can actually learn from. In a recent cancer
                                   drug discovery study case, our proprietary data cleaning pipeline
                                   boosted AI model accuracy by 21.6%.
                              </p>
                         </div>
                    </div>
                    <div className="home-why-ai-actions">
                         <button className="button-action">See how we work {`>`}</button>
                    </div>
               </div>
          </div>
     );
}
