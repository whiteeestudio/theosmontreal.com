import classNames from "classnames";
import Button from "components/core/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./Desktop.module.scss";
import { useRecoilValue } from "recoil";
import cartState from "states/cartState";

interface MenuItem {
  title: string;
  to: string;
  disabled?: boolean;
}

interface Props {
  leftItems: MenuItem[];
  rightItems: MenuItem[];
  subItems: MenuItem[];
}

export const DesktopNavBar: React.FC<Props> = ({
  leftItems,
  rightItems,
  subItems,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cartInfo = useRecoilValue(cartState);

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["left-items"]}>
          <Link to={"/"}>
            <img
              src={`${process.env.PUBLIC_URL}/images/theos-flag.png`}
              alt={"logo"}
              className={classNames(styles["logo"], "lazyload", "lazyloaded")}
              data-sizes="auto"
            />
          </Link>
          {leftItems.map((menuItem) => (
            <Button
              variant="secondary"
              onClick={() => navigate(menuItem.to)}
              key={menuItem.title}
              disabled={menuItem.disabled}
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
          {rightItems.map((menuItem) => (
            <Button
              variant="secondary"
              onClick={() => navigate(menuItem.to)}
              key={menuItem.title}
              disabled={menuItem.disabled}
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
      <div className={styles["sub-header"]}>
        <div className={styles["left-items"]}>
          {subItems.map((menuItem) => (
            <Button
              variant="secondary"
              onClick={() => navigate(menuItem.to)}
              key={menuItem.title}
              disabled={menuItem.disabled}
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
    </>
  );
};
