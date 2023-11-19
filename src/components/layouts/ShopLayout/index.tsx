import { DesktopNavBar } from "components/custom/Navbar/Desktop";
import { MobileNavBar } from "components/custom/Navbar/Mobile";
import { useWindowView } from "utils/view";

import styles from "./ShopLayout.module.scss";
import { Outlet } from "react-router-dom";
import Footer from "components/custom/Footer";

const MENU_LEFT = [
  { title: "shop", to: "/shop" },
  { title: "events", to: "/events" },
  { title: "looks", to: "/looks" },
];

const MENU_RIGHT = [
  { title: "about us", to: "/about-us" },
  { title: "contact", to: "/contact" },
];

export const SUB_ITEMS = [
  { title: "new arrivals", to: "/shop/new-arrivals" },
  { title: "shop all", to: "/shop/shop-all" },
  { title: "tops", to: "/shop/tops" },
  { title: "bottoms", to: "/shop/bottoms" },
  { title: "shoes", to: "/shop/shoes" },
];

const ShopLayout: React.FC = () => {
  const { isMobile, isTablet } = useWindowView();

  return (
    <>
      {isTablet || isMobile ? (
        <MobileNavBar menuItems={MENU_LEFT} />
      ) : (
        <DesktopNavBar
          leftItems={MENU_LEFT}
          rightItems={MENU_RIGHT}
          subItems={SUB_ITEMS}
        />
      )}
      <div className={styles["container"]}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default ShopLayout;
