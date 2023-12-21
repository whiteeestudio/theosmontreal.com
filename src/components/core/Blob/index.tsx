import classNames from "classnames";
import { motion } from "framer-motion";

import styles from "./Blob.module.scss";
import "lazysizes";

interface Props {
  className?: string;
}

const Blob: React.FC<Props> = ({ className }) => {
  return (
    <motion.a
      whileHover={{ scale: 1.1 }}
      className={classNames(styles["dot-logo"], className)}
      href="https://whiteee.space"
      target="_blank"
    />
  );
};

export default Blob;
