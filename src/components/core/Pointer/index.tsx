import classNames from "classnames";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

import styles from "./Pointer.module.scss";

interface Props {
  text: string;
  type: "top" | "bottom";
  className?: string;
}

const Pointer: React.FC<Props> = ({ text, type, className }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1 });
    }
  }, [controls, isInView]);

  return (
    <>
      {type === "top" ? (
        <motion.div className={classNames(styles["top-container"], className)}>
          <div className={styles["pointer-text"]}>{text}</div>
          <div className={styles["arrow"]}>
            <svg
              width="20%"
              height="100%"
              viewBox="0 0 66 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="61" cy="55" r="5" fill="black" />
              <circle cx="61" cy="55" r="3" fill="white" />
              <line x1="59.5" y1="52" x2="25" y2="0" stroke="black" />
              <line x1="25" y1="0.5" y2="0.5" stroke="black" />
            </svg>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className={classNames(styles["bottom-container"], className)}
        >
          <div className={styles["arrow"]}>
            <svg
              width="67"
              height="60"
              viewBox="0 0 67 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="5" r="5" fill="black" />
              <circle cx="5" cy="5" r="3" fill="white" />
              <line x1="7" y1="8" x2="42" y2="60" stroke="black" />
              <line x1="42" y1="59.5" x2="67" y2="59.5" stroke="black" />
            </svg>
          </div>
          <div className={styles["pointer-text"]}>{text}</div>
        </motion.div>
      )}
    </>
  );
};

export default Pointer;
