import Image from "next/image";
import "./navbar.style.scss";
import logo from "@public/assets/img/lead-ai.svg";
export const Navbar = () => {
     return (
          <div className="navbar ">
               <div className="navbar-item">
                    <Image src={logo} width={50} height={50} alt="logo" />
               </div>
               <div className="navbar-item">s</div>
               <div className="navbar-item">s</div>
          </div>
     );
};
