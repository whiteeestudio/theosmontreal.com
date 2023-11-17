import { useNavigate } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import styles from "./HomePage.module.scss";
import { useCallback } from "react";

const HomePage: React.FC = () => {
  const controls = useAnimationControls();
  const navigate = useNavigate();

  const onClick = useCallback(async () => {
    await controls.start({ opacity: 0 });
    navigate("/shop");
  }, [controls, navigate]);

  return (
    <motion.div
      animate={controls}
      transition={{ duration: 1 }}
      onClick={onClick}
      className={styles["container"]}
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        src={`${process.env.PUBLIC_URL}/images/theos-logo.png`}
        alt={"theos-logo"}
        className={styles["logo"]}
      />
      <img
        src={`${process.env.PUBLIC_URL}/images/theos-home-banner.jpg`}
        alt={"home-banner"}
        className={styles["banner"]}
      />
    </motion.div>
  );
};

export default HomePage;
