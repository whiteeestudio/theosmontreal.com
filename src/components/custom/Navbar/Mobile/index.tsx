import Drawer from "@mui/material/Drawer";
import classNames from "classnames";
import Button from "components/core/Button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Mobile.module.scss";
import { useRecoilValue } from "recoil";
import cartState from "states/cartState";

interface MenuItem {
  title: string;
  to: string;
  disabled?: boolean;
}

interface Props {
  menuItems: MenuItem[];
}

export const MobileNavBar: React.FC<Props> = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartInfo = useRecoilValue(cartState);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles["header"]}>
        <Link className={styles["shop-link"]} to={"/"}>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            src={`${process.env.PUBLIC_URL}/images/theos-flag.png`}
            alt={"logo"}
            className={classNames(
              styles["menu-logo"],
              "lazyload",
              "lazyloaded"
            )}
          />
        </Link>
        <div className={styles["button-container"]}>
          <Button
            variant="secondary"
            onClick={() => setIsMenuOpen(true)}
            className={styles["menu-button"]}
          >
            menu
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/cart")}
            className={styles["menu-button"]}
          >
            cart {cartInfo.items.length > 0 && `· ${cartInfo.items.length}`}
          </Button>
        </div>
      </div>

      <Drawer
        className={styles["container"]}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(!isMenuOpen)}
        anchor="top"
      >
        <div className={styles["drawer"]}>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className={styles["link"]}
            to={"/"}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/theos-flag.png`}
              alt={"logo"}
              className={styles["logo"]}
            />
          </Link>
          {menuItems.map(
            (item) =>
              !item.disabled && (
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  className={styles["drawer--link"]}
                  to={item.to}
                  key={item.to}
                >
                  <h2 className={styles["drawer--link--text"]}>{item.title}</h2>
                </Link>
              )
          )}
        </div>
      </Drawer>
    </>
  );
};
