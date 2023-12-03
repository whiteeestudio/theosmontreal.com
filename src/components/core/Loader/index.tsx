import { motion } from "framer-motion";
import styles from "./Loader.module.scss";
import classNames from "classnames";

interface Props {
  className?: string;
}

const Loader: React.FC<Props> = ({ className }) => {
  return (
    <motion.img
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      src={`${process.env.PUBLIC_URL}/images/theos-logo-black.png`}
      alt={"theos-flag"}
      className={classNames(styles["logo"], className)}
    />
  );
};

export default Loader;
