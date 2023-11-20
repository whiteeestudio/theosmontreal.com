import classNames from "classnames";
import Button from "components/core/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./Desktop.module.scss";
import { useRecoilValue } from "recoil";
import cartState from "states/cartState";

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

  const filteredLeftItems = leftItems.filter((item) => !item.hide);
  const filteredRightItems = rightItems.filter((item) => !item.hide);
  const current = leftItems.find((item) => pathname.includes(item.to));

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
        </div>
      )}
    </>
  );
};
