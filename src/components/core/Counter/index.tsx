import classNames from "classnames";
import Button from "components/core/Button";

import styles from "./Counter.module.scss";

interface Props {
  count: number;
  setCount: (count: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const Counter: React.FC<Props> = ({ count, setCount, min, max, className }) => {
  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <div className={classNames(styles["container"], className)}>
      <Button
        variant="secondary"
        className={styles["button"]}
        onClick={decrease}
        disabled={count === min}
      >
        -
      </Button>
      <span className={styles["count"]}>{count}</span>
      <Button
        variant="secondary"
        className={styles["button"]}
        onClick={increase}
        disabled={count === max}
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
