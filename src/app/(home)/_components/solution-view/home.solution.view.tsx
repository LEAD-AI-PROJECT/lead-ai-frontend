import Link from "next/link";
import gif from "@public/assets/gif/gif lead-min.gif";
import Image from "next/image";
export default function HomeSolutionView() {
     return (
          <div id="solutions" className="home-solution">
               <div className="home-solution-content">
                    <div className="home-solution-content-item">
                         <div className="home-solution-content-title">
                              Solution <br /> Overview
                         </div>
                         <div className="home-solution-content-subtitle">
                              The Lead AI Platform: <br />
                              Data Cleaning Made Effortless
                         </div>
                         <div className="home-solution-content-description">
                              Training AI starts with clean, structured data. Our platform helps you
                              transform raw research datasets into high-quality inputs ready for
                              model training. Just upload your data, no manual formatting, no
                              second-guessing. <br />
                              <br />
                              Backed by our patented technology, the platform applies pre-trained
                              rules and domain logic to help you prepare high-quality data in
                              minutes, not weeks!
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
                              Get early access and see how it worked before anyone else
                         </div>
                         <div className="home-solution-content-action">
                              <Link
                                   href={"#"}
                                   className="lg:text-4xl md:text-3xl text-2xl m-2 mt-6"
                              >
                                   Join the Waitlist {`>`}
                              </Link>
                         </div>
                    </div>
               </div>
          </div>
     );
}
