import "../home.style.scss";
import nusLogo from "@public/assets/img/home/nus-logo.svg";
import itbLogo from "@public/assets/img/home/itb-logo.svg";
import Image from "next/image";
export default function HomeJumbotronView() {
     return (
          <div className="home-jumbotron">
               <div className="home-jumbotron-content">
                    <div className="home-jumbotron-content-title">
                         Data Cleaning Services Built for <span>AI Accuracy</span>
                    </div>
                    <div className="home-jumbotron-content-description">
                         AI doesn't fail because of the model. It fails because of the data. Our{" "}
                         <span>data cleaning services</span> solve what others ignore, helping
                         pharma and biotech teams build more accurate AI with data they can trust.
                    </div>
               </div>
               <div className="home-jumbotron-actions">
                    <div className="flex gap-4">
                         <button className="button secondary">Request a demo</button>
                         <button className="button secondary bordered">Talk to an expert</button>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                         <div className="text-sm">In Collaboration With:</div>
                         <div className="flex gap-4">
                              <Image src={nusLogo} alt="logo" />
                              <Image src={itbLogo} alt="logo" />
                         </div>
                    </div>
               </div>
          </div>
     );
}
