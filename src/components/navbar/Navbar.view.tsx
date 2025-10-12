"use client";
import logo from "@public/assets/logo colour.png";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavbarHook } from "./navbar.hook";
import "./navbar.style.scss";

export default function NavbarView() {
     const { navbarItem, handleAnchorClick, navRef, open, toggle, close, syncVars } =
          useNavbarHook();

     // track current hash so we can mark active links (e.g. #home)
     const [currentHash, setCurrentHash] = useState<string>(() => {
          if (typeof window === "undefined") return "";
          return window.location.hash || "";
     });

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

     return (
          <>
               <div ref={navRef} className="navbarr">
                    <div className="navbarr-item logo">
                         <button
                              type="button"
                              aria-label="Toggle menu"
                              aria-expanded={open}
                              onClick={() => {
                                   toggle();
                                   syncVars();
                              }}
                         >
                              {open ? <X size={20} /> : <Menu size={20} />}
                         </button>
                         <Image src={logo} width={200} alt="logo" />
                    </div>

                    <div className="navbarr-item links">
                         {navbarItem.map(item => (
                              <Link
                                   key={item.label}
                                   className={`navbarr-link ${
                                        currentHash === String(item.href) ? "active" : ""
                                   }`}
                                   href={item.href}
                                   onClick={e => {
                                        handleAnchorClick(e.nativeEvent, String(item.href));
                                        // update hash immediately for visual feedback in SPA nav
                                        setCurrentHash(String(item.href));
                                        close();
                                   }}
                              >
                                   {item.label}
                              </Link>
                         ))}
                    </div>

                    <div className="navbarr-item action">
                         <Link
                              href="#login"
                              className="navbarr-link"
                              onClick={e => {
                                   handleAnchorClick(e.nativeEvent, "#login");
                                   close();
                              }}
                         >
                              Login
                         </Link>
                         <button className="primary" onClick={close}>
                              Try Lead.AI
                         </button>
                    </div>
               </div>

               {/* Overlay full-bleed */}
               <button
                    type="button"
                    className={`nav-overlay ${open ? "active" : ""}`}
                    onClick={close}
                    aria-hidden={!open}
                    aria-label="Close navigation overlay"
               />

               {/* Dropdown “di belakang” navbarr */}
               <div className={`nav-dropdown ${open ? "active" : ""}`} role="menu">
                    {navbarItem.map(item => (
                         <Link
                              key={`dd-${item.label}`}
                              className={`navbarr-link ${
                                   currentHash === String(item.href) ? "active" : ""
                              }`}
                              href={item.href}
                              onClick={e => {
                                   handleAnchorClick(e.nativeEvent, String(item.href));
                                   setCurrentHash(String(item.href));
                                   close();
                              }}
                              role="menuitem"
                         >
                              {item.label}
                         </Link>
                    ))}

                    {/* muncul hanya di Mobile L via CSS */}
                    <div className="dropdown-actions">
                         <Link
                              href="#login"
                              className="navbarr-link"
                              onClick={e => {
                                   handleAnchorClick(e.nativeEvent, "#login");
                                   close();
                              }}
                         >
                              Login
                         </Link>
                         <button className="primary" onClick={close}>
                              Try Lead.AI
                         </button>
                    </div>
               </div>
          </>
     );
}
