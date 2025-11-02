"use client";
import itbLogo from "@public/assets/img/home/itb-logo.svg";
import nusLogo from "@public/assets/img/home/nus-logo.svg";
import Image from "next/image";
import "../home.style.scss";
import useHomeJumbotron from "./home.jumbotron.hook";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Render markdown that may include raw HTML (e.g. <span> tags).
// We unescape backslashes inserted by the MDX editor, then parse markdown
// into HTML while allowing raw HTML nodes via rehype-raw so line breaks
// created with Enter are turned into paragraphs/<br> instead of disappearing.
const HtmlContent = ({ children }: { children: string }) => {
     // Unescape common escape sequences from MDX editor
     let unescaped = (children || "")
          .replaceAll("\\n", "\n") // Unescape newlines
          .replaceAll("\\t", "\t") // Unescape tabs
          .replaceAll("\\\\", "\\") // Unescape backslashes
          .replaceAll('\\"', '"') // Unescape quotes
          .replaceAll("\\'", "'"); // Unescape single quotes

     return (
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
               {unescaped}
          </ReactMarkdown>
     );
};
export default function HomeJumbotronView() {
     const { data, isLoading } = useHomeJumbotron();

     if (isLoading) {
          return (
               <div id="home" className="lg:p-[3rem] md:p-[2rem] sm:p-[1rem] p-[10px]">
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
                              <button className="button secondary">Request a demo</button>
                              <button className="button secondary bordered">
                                   Talk to an expert
                              </button>
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
          </div>
     );
}
