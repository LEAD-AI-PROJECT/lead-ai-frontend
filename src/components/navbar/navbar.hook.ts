"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useQueryApiRequest from "@/hooks/react-query/useQueryApiRequest";
import { GlobalApiResponse } from "@/hooks/react-query/GlobalApiResponse";
import { HeaderContent, GlobalSectionMenuResponse } from "@/types/menu-management/global-section";
import { navbarItem as defaultNavbarItem } from "./navbar.item";

export const useNavbarHook = () => {
     const [open, setOpen] = useState(false);
     const navRef = useRef<HTMLDivElement>(null);
     const [currentHash, setCurrentHash] = useState<string>("");
     const [isMounted, setIsMounted] = useState(false);

     // Fetch header data from backend
     const {
          data: response,
          isLoading,
          isError,
     } = useQueryApiRequest<GlobalApiResponse<GlobalSectionMenuResponse>>({
          key: "GlobalSection_FindByType",
          params: {
               type: "HEADER",
          },
     });

     const headerData = (response?.data?.content as HeaderContent) || undefined;

     // Convert header navItems to navbar format
     const navbarItem =
          headerData?.navItems?.map(item => ({
               label: item.label,
               href: item.link,
               icon: "",
          })) || defaultNavbarItem;

     // Extract button and logo data
     const logoData = headerData?.logo;
     const loginButtonData = headerData?.loginButton;
     const ctaButtonData = headerData?.cta;

     const toggle = () => setOpen(v => !v);
     const close = () => setOpen(false);

     // Initialize hash on mount to prevent hydration mismatch
     useEffect(() => {
          setCurrentHash(window.location.hash || "");
          setIsMounted(true);
     }, []);

     // Listen to hash changes
     useEffect(() => {
          const onHash = () => setCurrentHash(window.location.hash || "");
          window.addEventListener("hashchange", onHash);
          return () => window.removeEventListener("hashchange", onHash);
     }, []);

     // observe sections on the page and set active link when a section is in view
     useEffect(() => {
          if (typeof window === "undefined") return;

          const ids = navbarItem
               .map(i =>
                    i.href && String(i.href).startsWith("#") ? String(i.href).substring(1) : null
               )
               .filter(Boolean) as string[];

          const observed: Element[] = [];

          const observer = new IntersectionObserver(
               entries => {
                    // pick the entry with the largest intersectionRatio that isIntersecting
                    const visible = entries
                         .filter(e => e.isIntersecting)
                         .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                    if (visible) {
                         const id = visible.target.id;
                         const hash = `#${id}`;
                         if (hash !== currentHash) {
                              // update visual active state
                              setCurrentHash(hash);
                              // update URL hash without adding a new history entry
                              try {
                                   history.replaceState(null, "", hash);
                              } catch (e) {
                                   /* ignore if unavailable */
                              }
                         }
                    }
               },
               {
                    // consider section visible when 50% of it is in viewport
                    threshold: [0.5],
               }
          );

          ids.forEach(id => {
               const el = document.getElementById(id);
               if (el) {
                    observer.observe(el);
                    observed.push(el);
               }
          });

          return () => {
               observed.forEach(el => observer.unobserve(el));
               observer.disconnect();
          };
     }, [navbarItem, currentHash]);

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
          logoData,
          loginButtonData,
          ctaButtonData,
          currentHash,
          setCurrentHash,
          isMounted,
          headerData,
          isLoading,
          isError,
     };
};
