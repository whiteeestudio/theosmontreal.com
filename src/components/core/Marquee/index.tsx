import { motion } from "framer-motion";

import styles from "./Marquee.module.scss";

interface Props {
  texts: string[];
  duration: number;
  length: number;
  className?: string;
}

const Marquee: React.FC<Props> = ({ texts, duration, length, className }) => {
  const marqueeVariants = {
    animate: {
      x: [0, -length],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className={className}>
      <div className={styles["marquee"]}>
        <motion.div className={styles["track"]} variants={marqueeVariants} animate="animate">
          {texts.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;
