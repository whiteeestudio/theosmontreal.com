import classNames from "classnames";
import { motion } from "framer-motion";

import styles from "./Divider.module.scss";

interface Props {
  className?: string;
}

const Divider: React.FC<Props> = ({ className }) => (
  <motion.div
    className={classNames(styles["divider"], className)}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  />
);

export default Divider;
