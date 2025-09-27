import Link from "next/link";
import { useFooterHook } from "./footer.hook";
import "./footer.style.scss";
import instagramIcon from "@public/assets/icon/Instagram.svg";
import whatsappIcon from "@public/assets/icon/whatsapp.svg";
import xIcon from "@public/assets/icon/x.svg";
import Image from "next/image";
export default function FooterView() {
     const { footerItem } = useFooterHook();
     return (
          <div className="footer">
               <div className="footer-body">
                    {footerItem.map(item => (
                         <div key={item.label} className="footer-item">
                              <div className="title">{item.label}</div>
                              <div className="sub">
                                   {item.children?.map(child => (
                                        <Link key={child.label} href={child.href}>
                                             {child.label}
                                        </Link>
                                   ))}
                              </div>
                         </div>
                    ))}
                    <div className="footer-item">
                         <div className="title">Get In Touch</div>
                         <div className="sub">
                              You’ll find your next home, in any style you prefer.
                         </div>
                         <div className="social">
                              <Link className="icon" href={"#instagram"}>
                                   <Image
                                        src={instagramIcon}
                                        width={25}
                                        height={25}
                                        alt="instagram"
                                   />
                              </Link>
                              <Link className="icon" href={"#x"}>
                                   <Image src={xIcon} width={25} height={25} alt="x" />
                              </Link>
                              <Link className="icon" href={"#whatsapp"}>
                                   <Image
                                        src={whatsappIcon}
                                        width={25}
                                        height={25}
                                        alt="whatsapp"
                                   />
                              </Link>
                         </div>
                    </div>
               </div>
               <div className="footer-copyright">Copyright 2020, All rights reserved.</div>
          </div>
     );
}
