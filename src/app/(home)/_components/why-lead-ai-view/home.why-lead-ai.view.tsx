import "../home.style.scss";
export default function HomeWhyLeadAIView() {
     return (
          <div className="home-why-ai">
               <div className="home-why-ai-header">Why Lead.AI?</div>
               <div className="home-why-ai-content">
                    <div className="home-why-ai-content-item">
                         <div className="grid grid-cols-2 gap-8 h-full">
                              <div className="grid gap-8">
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
                         <p>Start with the question no one asks:</p>
                         <div className="home-why-ai-content-title">
                              What if your <span>AI model isn’t the problem?</span> What if it’s{" "}
                              <span>your data?</span>
                         </div>
                         <p className="">
                              At Lead.AI, we believe the foundation of great AI starts long before
                              algorithms,  it starts with clean, trusted, high-integrity data.
                         </p>
                         <p>
                              Backed by a patented method developed at National University of
                              Singapore, our technology helps pharma and biotech teams clean messy,
                              fragmented datasets into AI-ready formats that models can actually
                              learn from. In a recent cancer AI case, our cleaned datasets improved
                              model accuracy by 17 percent, without touching the model code.
                         </p>
                    </div>
               </div>
               <div className="home-why-ai-actions">
                    <button className="button-action">See how we work {`>`}</button>
               </div>
          </div>
     );
}
