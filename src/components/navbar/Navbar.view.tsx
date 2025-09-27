"use client";
import logo from "@public/assets/img/lead-ai.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useNavbarHook } from "./navbar.hook";
import "./navbar.style.scss";

export default function NavbarView() {
     const { navbarItem, handleAnchorClick } = useNavbarHook();

     return (
          <div className="navbar ">
               <div className="navbar-item">
                    <Image src={logo} width={50} height={50} alt="logo" />
               </div>
               <div className="navbar-item center">
                    {navbarItem.map(item => (
                         <Link
                              key={item.label}
                              className="navbar-link"
                              href={item.href}
                              onClick={e =>
                                   handleAnchorClick(e as React.MouseEvent, String(item.href))
                              }
                         >
                              {item.label}
                         </Link>
                    ))}
               </div>
               <div className="navbar-item end">
                    <Link
                         href={"#login"}
                         className="navbar-link"
                         onClick={e => handleAnchorClick(e as React.MouseEvent, "#login")}
                    >
                         Login
                    </Link>
                    <button className="primary">Try Lead.AI</button>
               </div>
          </div>
     );
}
