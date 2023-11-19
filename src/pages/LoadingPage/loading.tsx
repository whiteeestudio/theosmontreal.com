import { motion } from "framer-motion";
import styles from "./LoadingPage.module.scss";

const LoadingPage: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <motion.img
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        src={`${process.env.PUBLIC_URL}/images/theos-logo-black.png`}
        alt={"theos-flag"}
        className={styles["logo"]}
      />
    </div>
  );
};

export default LoadingPage;
