import { useNavigate } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import styles from "./HomePage.module.scss";
import { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { HomePageData } from "utils/types";
import { GET_HOME_PAGE } from "utils/queries";
import classNames from "classnames";
import { useWindowView } from "utils/hooks/use-window-view";
import "lazysizes";

interface PolicyData {
  metaobject: HomePageData;
}

const HomePage: React.FC = () => {
  const controls = useAnimationControls();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useWindowView();

  const { data: homePageData, loading: isHomePageLoading } =
    useQuery<PolicyData>(GET_HOME_PAGE);

  const onClick = useCallback(async () => {
    await controls.start({ opacity: 0 });
    navigate("/shop");
  }, [controls, navigate]);

  if (!isHomePageLoading || !homePageData) {
    <></>;
  }

  const banner = homePageData?.metaobject.banner.reference.image.url;
  const mobileBanner =
    homePageData?.metaobject.mobileBanner.reference.image.url;
  const logo = homePageData?.metaobject.logo.reference.image.url;

  return (
    <motion.div
      animate={controls}
      transition={{ duration: 1 }}
      onClick={onClick}
      className={styles["container"]}
    >
      {logo && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          src={logo}
          alt={"theos-logo"}
          className={styles["logo"]}
        />
      )}
      {isMobile || isTablet ? (
        <>
          {mobileBanner && (
            <img
              src={`${mobileBanner}&width=100`}
              alt={"home-banner"}
              className={classNames(styles["banner"], "lazyload", "lazyloaded")}
              data-sizes="auto"
              data-srcset={`${mobileBanner}&width=1024 600w, ${mobileBanner}&width=2048 800w`}
            />
          )}
        </>
      ) : (
        <>
          {banner && (
            <img
              src={`${banner}&width=100`}
              alt={"home-banner"}
              className={classNames(styles["banner"], "lazyload", "lazyloaded")}
              data-sizes="auto"
              data-srcset={`${banner}&width=1024 600w, ${banner}&width=2048 800w`}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default HomePage;
