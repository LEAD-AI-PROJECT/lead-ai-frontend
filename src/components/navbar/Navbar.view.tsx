"use client";
import logo from "@public/assets/logo colour.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Menu, X } from "lucide-react";
import { useNavbarHook } from "./navbar.hook";
import "./navbar.style.scss";

export default function NavbarView() {
     const { navbarItem, handleAnchorClick, navRef, open, toggle, close, syncVars } =
          useNavbarHook();

     return (
          <>
               <div ref={navRef} className="navbar">
                    <div className="navbar-item logo">
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

                    <div className="navbar-item link">
                         {navbarItem.map(item => (
                              <Link
                                   key={item.label}
                                   className="navbar-link"
                                   href={item.href}
                                   onClick={e => {
                                        handleAnchorClick(e.nativeEvent, String(item.href));
                                        close();
                                   }}
                              >
                                   {item.label}
                              </Link>
                         ))}
                    </div>

                    <div className="navbar-item action">
                         <Link
                              href="#login"
                              className="navbar-link"
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

               {/* Dropdown “di belakang” navbar */}
               <div className={`nav-dropdown ${open ? "active" : ""}`} role="menu">
                    {navbarItem.map(item => (
                         <Link
                              key={`dd-${item.label}`}
                              className="navbar-link"
                              href={item.href}
                              onClick={e => {
                                   handleAnchorClick(e.nativeEvent, String(item.href));
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
                              className="navbar-link"
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
