"use client";
import logo from "@public/assets/logo colour.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Menu, X } from "lucide-react";
import { useNavbarHook } from "./navbar.hook";
import "./navbar.style.scss";

export default function NavbarView() {
     const {
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
     } = useNavbarHook();

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

                         {logoData ? (
                              <Link href={logoData.link || "/"}>
                                   <Image
                                        src={logoData.link}
                                        width={200}
                                        height={60}
                                        alt={logoData.label || "Logo"}
                                        priority
                                   />
                              </Link>
                         ) : (
                              <Link href="/">
                                   <Image src={logo} width={200} height={60} alt="Logo" priority />
                              </Link>
                         )}
                    </div>{" "}
                    <div className="navbarr-item links">
                         {navbarItem.map(item => (
                              <Link
                                   key={item.label}
                                   className={`navbarr-link ${
                                        isMounted && currentHash === String(item.href)
                                             ? "active"
                                             : ""
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
                              href={loginButtonData?.link || "#login"}
                              className="navbarr-link"
                              onClick={e => {
                                   handleAnchorClick(
                                        e.nativeEvent,
                                        loginButtonData?.link || "#login"
                                   );
                                   close();
                              }}
                         >
                              {loginButtonData?.label || "Login"}
                         </Link>
                         <button
                              type="button"
                              className="primary"
                              onClick={() => {
                                   const link = ctaButtonData?.link || "#";
                                   if (link.startsWith("#")) {
                                        const id = link.substring(1);
                                        const el = document.getElementById(id);
                                        if (el) {
                                             el.scrollIntoView({
                                                  behavior: "smooth",
                                                  block: "start",
                                             });
                                        }
                                   } else {
                                        window.location.href = link;
                                   }
                                   close();
                              }}
                         >
                              {ctaButtonData?.label || "Try Lead.AI"}
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

               {/* Dropdown "di belakang" navbarr */}
               <div className={`nav-dropdown ${open ? "active" : ""}`} role="menu">
                    {navbarItem.map(item => (
                         <Link
                              key={`dd-${item.label}`}
                              className={`navbarr-link ${
                                   isMounted && currentHash === String(item.href) ? "active" : ""
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
                              href={loginButtonData?.link || "#login"}
                              className="navbarr-link"
                              onClick={e => {
                                   handleAnchorClick(
                                        e.nativeEvent,
                                        loginButtonData?.link || "#login"
                                   );
                                   close();
                              }}
                         >
                              {loginButtonData?.label || "Login"}
                         </Link>
                         <button
                              type="button"
                              className="primary"
                              onClick={() => {
                                   const link = ctaButtonData?.link || "#";
                                   if (link.startsWith("#")) {
                                        const id = link.substring(1);
                                        const el = document.getElementById(id);
                                        if (el) {
                                             el.scrollIntoView({
                                                  behavior: "smooth",
                                                  block: "start",
                                             });
                                        }
                                   } else {
                                        window.location.href = link;
                                   }
                                   close();
                              }}
                         >
                              {ctaButtonData?.label || "Try Lead.AI"}
                         </button>
                    </div>
               </div>
          </>
     );
}
