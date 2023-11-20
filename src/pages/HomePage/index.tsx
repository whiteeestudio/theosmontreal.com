import { useNavigate } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import styles from "./HomePage.module.scss";
import { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { HomePageData } from "utils/types";
import { GET_HOME_PAGE } from "utils/queries";

interface PolicyData {
  metaobject: HomePageData;
}

const HomePage: React.FC = () => {
  const controls = useAnimationControls();
  const navigate = useNavigate();

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
      {banner && (
        <img
          src={`${banner}&width=1024`}
          alt={"home-banner"}
          className={styles["banner"]}
        />
      )}
    </motion.div>
  );
};

export default HomePage;
