import classNames from "classnames";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

import "lazysizes";

import styles from "./Item.module.scss";

interface Props {
  handle: string;
  title: string;
  price: string;
  src: string;
  className?: string;
}

const Item: React.FC<Props> = ({ handle, title, price, src, className }) => {
  const ref = useRef(null);

  return (
    <Link to={`/product/${handle}`}>
      <motion.div
        className={classNames(styles["item-container"], className)}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          ref={ref}
          transition={{ duration: 1 }}
          src={`${src}&width=10`}
          className={classNames(styles["image"], "lazyload", "lazyloaded")}
          alt="sage img"
          data-sizes="auto"
          data-srcset={`${src}&width=300 300w,
          ${src}&width=600 600w,
          ${src}&width=800 800w`}
        />
        <div className={styles["info-container"]}>
          <p className={styles["title"]}>{title}</p>
          <p className={styles["price"]}>{price}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default Item;
