import Image from "next/image";
import "./navbar.style.scss";
import logo from "@public/assets/img/lead-ai.svg";
import { useNavbarHook } from "./navbar.hook";
import Link from "next/link";
export default function NavbarView() {
     const { navbarItem } = useNavbarHook();
     return (
          <div className="navbar ">
               <div className="navbar-item">
                    <Image src={logo} width={50} height={50} alt="logo" />
               </div>
               <div className="navbar-item">
                    {navbarItem.map(item => (
                         <Link key={item.label} className="navbar-link" href={item.href}>
                              {item.label}
                         </Link>
                    ))}
               </div>
               <div className="navbar-item">
                    <Link href={"#login"} className="navbar-link">
                         Login
                    </Link>
                    <button className="primary">Try Lead.AI</button>
               </div>
          </div>
     );
}
