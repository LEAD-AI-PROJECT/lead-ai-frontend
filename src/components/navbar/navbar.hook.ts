import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { navbarItem } from "./navbar.item";

export const useNavbarHook = () => {
     const [open, setOpen] = useState(false);
     const navRef = useRef<HTMLDivElement>(null);

     const toggle = () => setOpen(v => !v);
     const close = () => setOpen(false);

     // hitung CSS vars: --navbar-h, --nav-left, --nav-right
     const syncVars = () => {
          const el = navRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const h = el.offsetHeight ?? 80;
          const left = rect.left;
          const right = window.innerWidth - rect.right;

          const root = document.documentElement;
          root.style.setProperty("--navbar-h", `${h}px`);
          root.style.setProperty("--nav-left", `${left}px`);
          root.style.setProperty("--nav-right", `${right}px`);
     };

     // set awal + update on resize/scroll
     useLayoutEffect(() => {
          syncVars();

          let raf = 0;
          const onScrollOrResize = () => {
               cancelAnimationFrame(raf);
               raf = requestAnimationFrame(syncVars);
          };

          window.addEventListener("resize", onScrollOrResize, { passive: true });
          window.addEventListener("scroll", onScrollOrResize, { passive: true });

          return () => {
               cancelAnimationFrame(raf);
               window.removeEventListener("resize", onScrollOrResize as any);
               window.removeEventListener("scroll", onScrollOrResize as any);
          };
     }, []);

     // ESC to close + lock scroll pas open
     useEffect(() => {
          const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
          window.addEventListener("keydown", onKey);

          const { style } = document.body;
          if (open) {
               style.overflow = "hidden";
               // sync ulang pas buka (jaga2 ada layout shift)
               syncVars();
          } else {
               style.overflow = "";
          }

          return () => {
               window.removeEventListener("keydown", onKey);
               style.overflow = "";
          };
     }, [open]);

     function handleAnchorClick(e: MouseEvent, href?: string) {
          if (!href?.startsWith("#")) return;
          e.preventDefault();
          const id = href.substring(1);
          const el = document.getElementById(id);
          if (el) {
               el.scrollIntoView({ behavior: "smooth", block: "start" });
               history.replaceState(null, "", `#${id}`);
          }
     }

     return {
          navbarItem,
          handleAnchorClick,
          navRef,
          open,
          toggle,
          close,
          syncVars,
     };
};
