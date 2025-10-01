import "../home.style.scss";

export default function HomeDemoView() {
     return (
          <div className="lg:py-[3rem] md:py-[2rem] sm:py-[1rem] py-[10px] lg:px-[8rem] md:px-[2rem] sm:px-[1rem] px-[2rem] bg-white">
               <div className="home-demo">
                    <div className="home-demo-content">
                         <div className="content">
                              <div className="title">
                                   Want to <span>Build AI</span>
                                   <br /> Fast and Right?
                              </div>
                              <div className="description">
                                   Lead AI helps you move from raw data to high-performance models
                                   with accuracy and speed. Book a free expert consultation to
                                   explore your next breakthrough.
                              </div>
                         </div>
                         <div className="content">
                              <div className="action">
                                   <button className="secondary">
                                        <div className="text-xl">Get a Free Demo</div>
                                   </button>
                                   <button className="dark">
                                        <div className="text-xl">More Info</div>
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
