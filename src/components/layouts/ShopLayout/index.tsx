import { DesktopNavBar } from "components/custom/Navbar/Desktop";
import { MobileNavBar } from "components/custom/Navbar/Mobile";
import { useWindowView } from "utils/view";

import styles from "./ShopLayout.module.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "components/custom/Footer";
import classNames from "classnames";
import Button from "components/core/Button";

export const MENU_LEFT = [
  {
    title: "shop",
    to: "/shop",
    items: [
      { title: "new arrivals", to: "/shop/new-arrivals" },
      { title: "shop all", to: "/shop/shop-all" },
      { title: "tops", to: "/shop/tops" },
      { title: "bottoms", to: "/shop/bottoms" },
      { title: "shoes", to: "/shop/shoes" },
    ],
  },
  { title: "events", to: "/events", hide: true },
  { title: "looks", to: "/looks", hide: true },
  {
    title: "policies",
    to: "/policies",
    items: [
      { title: "shipping", to: "/policies/shipping" },
      { title: "returns & exchanges", to: "/policies/returns-and-exchanges" },
      { title: "terms & conditions", to: "/policies/terms-and-conditions" },
      { title: "privacy", to: "/policies/privacy" },
    ],
  },
];

export const MENU_RIGHT = [
  { title: "about us", to: "/about-us" },
  { title: "contact", to: "/contact", hide: true },
];

const MobileTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const current = MENU_LEFT.find((item) => pathname.includes(item.to));

  if (!current?.items) {
    return <></>;
  }

  return (
    <div className={classNames(styles["navigate-container"])}>
      {current.items.map((category) => (
        <Button
          variant="tertiary"
          className={classNames({
            [styles["navigate-button--current"]]: pathname === category.to,
          })}
          onClick={() => navigate(category.to)}
        >
          {category.title}
        </Button>
      ))}
    </div>
  );
};

const ShopLayout: React.FC = () => {
  const { isMobile, isTablet } = useWindowView();
  const { pathname } = useLocation();
  const current = MENU_LEFT.find((item) => pathname.includes(item.to));

  return (
    <>
      {isTablet || isMobile ? (
        <MobileNavBar menuItems={MENU_LEFT} />
      ) : (
        <DesktopNavBar leftItems={MENU_LEFT} rightItems={MENU_RIGHT} />
      )}
      <div
        className={classNames(styles["container"], {
          [styles["container--no-sub"]]: !current,
        })}
      >
        {(isTablet || isMobile) && <MobileTabs />}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default ShopLayout;
