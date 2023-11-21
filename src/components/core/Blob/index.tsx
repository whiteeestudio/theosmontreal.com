import { motion } from "framer-motion";

import styles from "./Blob.module.scss";
import classNames from "classnames";
import "lazysizes";

interface Props {
  className?: string;
}

const Blob: React.FC<Props> = ({ className }) => {
  return (
    <motion.a
      className={classNames(styles["dot-logo"], className)}
      href="https://whiteee.space"
      target="_blank"
    />
  );
};

export default Blob;
