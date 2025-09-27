import { useEffect, useRef, useState } from "react";

export const useHomeNewsEventHook = () => {
     const trackRef = useRef<HTMLDivElement | null>(null);
     const titleRef = useRef<HTMLDivElement | null>(null);
     const isDragging = useRef(false);
     const startX = useRef(0);
     const scrollLeft = useRef(0);
     const [canScrollPrev, setCanScrollPrev] = useState(false);

     function updateButtons() {
          const el = trackRef.current;
          if (!el) return;
          setCanScrollPrev(el.scrollLeft > 0);
     }

     useEffect(() => {
          updateButtons();
          function updateOffset() {
               const titleEl = titleRef.current;
               const trackEl = trackRef.current;
               if (!titleEl || !trackEl) return;
               const titleRect = titleEl.getBoundingClientRect();
               const trackRect = trackEl.getBoundingClientRect();
               const offset = Math.max(0, titleRect.left - trackRect.left + trackEl.scrollLeft);
               trackEl.style.setProperty("--title-offset", `${offset}px`);
          }
          updateOffset();
          window.addEventListener("resize", updateOffset);
          return () => window.removeEventListener("resize", updateOffset);
     }, []);

     function scrollBy(amount: number) {
          const el = trackRef.current;
          if (!el) return;
          el.scrollBy({ left: amount, behavior: "smooth" });
          setTimeout(updateButtons, 250);
     }

     function onPointerDown(e: React.PointerEvent) {
          const el = trackRef.current;
          if (!el) return;
          isDragging.current = true;
          startX.current = e.clientX;
          scrollLeft.current = el.scrollLeft;
          (e.target as Element).setPointerCapture(e.pointerId);
     }

     function onPointerMove(e: React.PointerEvent) {
          if (!isDragging.current) return;
          const el = trackRef.current;
          if (!el) return;
          const x = e.clientX;
          const walk = (startX.current - x) * 1; // scroll-fast
          el.scrollLeft = scrollLeft.current + walk;
          updateButtons();
     }

     function onPointerUp(e: React.PointerEvent) {
          isDragging.current = false;
          try {
               (e.target as Element).releasePointerCapture(e.pointerId);
          } catch {}
     }

     function onWheel(e: React.WheelEvent) {
          const el = trackRef.current;
          if (!el) return;
          // If the wheel event has a horizontal component, prefer that.
          // Otherwise convert vertical wheel/trackpad deltaY into horizontal scroll.
          const delta = Math.abs(e.deltaX) > 0 ? e.deltaX : e.deltaY;
          // Prevent the page from scrolling vertically when the user is interacting with the track.
          e.preventDefault();
          // Apply the scroll. Multiply a bit to make trackpad gestures feel natural.
          el.scrollBy({ left: delta, behavior: "smooth" });
          // Update button state after scroll settles.
          setTimeout(updateButtons, 150);
     }

     return {
          trackRef,
          titleRef,
          canScrollPrev,
          scrollBy,
          onPointerDown,
          onPointerMove,
          onPointerUp,
          onWheel,
     };
};
