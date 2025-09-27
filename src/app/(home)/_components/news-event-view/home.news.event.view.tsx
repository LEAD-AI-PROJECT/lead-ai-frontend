"use client";
import "../home.style.scss";
import { HomeNewsEventCardView } from "./card/home.new.event.card.view";
import { useHomeNewsEventHook } from "./home.news.event.hook";
import { HomeNewsEventItem } from "./home.news.event.item";

export default function HomeNewsEventView() {
     const {
          titleRef,
          canScrollPrev,
          trackRef,
          onPointerDown,
          onPointerMove,
          onPointerUp,
          onWheel,
          scrollBy,
     } = useHomeNewsEventHook();

     return (
          <div className="bg-white pb-[3rem]">
               <div className="p-[3rem] pt-[0rem] pb-[1rem]">
                    <div className="home-news-event ">
                         <div className="content">
                              <div className="home-news-event-title" ref={titleRef}>
                                   News & Events
                              </div>
                              <div className="home-news-event-action">
                                   <button
                                        className={`button-arrow ${
                                             !canScrollPrev ? "disabled" : ""
                                        }`}
                                        onClick={() => scrollBy(-400)}
                                   >
                                        <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor"
                                             className="size-6"
                                        >
                                             <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                             />
                                        </svg>
                                   </button>
                                   <button className="button-arrow" onClick={() => scrollBy(400)}>
                                        <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor"
                                             className="size-6"
                                        >
                                             <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                             />
                                        </svg>
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="grid gap-6 items-start">
                    <div
                         className="news-track overflow-hidden"
                         ref={trackRef}
                         onPointerDown={onPointerDown}
                         onPointerMove={onPointerMove}
                         onPointerUp={onPointerUp}
                         onPointerCancel={onPointerUp}
                         onWheel={onWheel}
                    >
                         <div
                              className="news-track-inner flex gap-4"
                              style={{
                                   width: "max-content",
                                   marginLeft: "var(--title-offset, 0px)",
                              }}
                         >
                              {HomeNewsEventItem?.map((item, index) => (
                                   <HomeNewsEventCardView
                                        key={String(index) + item.title}
                                        {...item}
                                   />
                              ))}
                         </div>
                    </div>
               </div>
          </div>
     );
}
