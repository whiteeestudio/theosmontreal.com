import classNames from "classnames";
import Button from "components/core/Button";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import styles from "./Desktop.module.scss";
import { useRecoilValue, useSetRecoilState } from "recoil";
import cartState from "states/cartState";
import Search from "components/core/Search";
import { useCallback, useEffect } from "react";
import searchState from "states/navState";

export interface MenuItem {
  title: string;
  to: string;
  items?: MenuItem[];
  hide?: boolean;
}

interface Props {
  leftItems: MenuItem[];
  rightItems: MenuItem[];
}

export const DesktopNavBar: React.FC<Props> = ({ leftItems, rightItems }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cartInfo = useRecoilValue(cartState);
  const isSearchOpen = useRecoilValue(searchState);
  const setIsSearchOpen = useSetRecoilState(searchState);

  const filteredLeftItems = leftItems.filter((item) => !item.hide);
  const filteredRightItems = rightItems.filter((item) => !item.hide);
  const current = leftItems.find((item) => pathname.includes(item.to));

  useEffect(() => {
    if (!pathname.includes("shop/search")) {
      setIsSearchOpen(false);
    }
  }, [pathname, setIsSearchOpen]);

  const onSearch = useCallback(
    (search: string) => {
      navigate({
        pathname: "/shop/search",
        search: createSearchParams({
          q: search,
        }).toString(),
      });
    },
    [navigate]
  );

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["left-items"]}>
          <Link className={styles["link"]} to={"/"}>
            <img
              src={`${process.env.PUBLIC_URL}/images/theos-logo-black.png`}
              alt={"logo"}
              className={classNames(styles["logo"], "lazyload", "lazyloaded")}
              data-sizes="auto"
            />
          </Link>
          {filteredLeftItems.map((menuItem) => (
            <Button
              variant="secondary"
              onClick={() => navigate(menuItem.to)}
              key={menuItem.title}
            >
              <div
                className={classNames(styles["menu-item"], {
                  [styles["menu-item--selected"]]: pathname.includes(
                    menuItem.to
                  ),
                })}
              >
                {menuItem.title}
              </div>
            </Button>
          ))}
        </div>
        <div className={styles["right-items"]}>
          {filteredRightItems.map((menuItem) => (
            <Button
              variant="secondary"
              onClick={() => navigate(menuItem.to)}
              key={menuItem.title}
            >
              <div
                className={classNames(styles["menu-item"], {
                  [styles["menu-item--selected"]]: pathname.includes(
                    menuItem.to
                  ),
                })}
              >
                {menuItem.title}
              </div>
            </Button>
          ))}
          <Button variant="secondary" onClick={() => navigate("cart")}>
            <div className={styles["menu-item"]}>
              cart {cartInfo.items.length > 0 && `· ${cartInfo.items.length}`}
            </div>
          </Button>
        </div>
      </div>
      {current?.items && (
        <div className={styles["sub-header"]}>
          <div className={styles["left-items"]}>
            {current.items.map((menuItem) => (
              <Button
                variant="secondary"
                onClick={() => navigate(menuItem.to)}
                key={menuItem.title}
              >
                <div
                  className={classNames(styles["menu-item"], {
                    [styles["menu-item--selected"]]: pathname === menuItem.to,
                  })}
                >
                  {menuItem.title}
                </div>
              </Button>
            ))}
          </div>
          <div className={styles["right-items"]}>
            <Search
              onSearch={onSearch}
              setShowInput={setIsSearchOpen}
              showInput={isSearchOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};
