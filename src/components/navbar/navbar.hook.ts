import { navbarItem } from "./navbar.item";

export const useNavbarHook = () => {
     function handleAnchorClick(e: React.MouseEvent, href?: string) {
          if (!href?.startsWith("#")) return;
          e.preventDefault();
          const id = href.substring(1);
          const el = document.getElementById(id);
          if (el) {
               el.scrollIntoView({ behavior: "smooth", block: "start" });
               // Update the history hash without jumping
               history.replaceState(null, "", `#${id}`);
          }
     }

     return {
          navbarItem,
          handleAnchorClick,
     };
};
