import classNames from "classnames";

import styles from "./Option.module.scss";

interface Props {
  id: string;
  value: string;
  label: string;
  onChange?: () => void;
  isChecked?: boolean;
  hasError?: boolean;
  disabled?: boolean;
}

const Option: React.FC<Props> = ({ id, value, label, onChange, isChecked, hasError, disabled }) => (
  <div className={styles["container"]}>
    <input
      type="radio"
      id={id}
      value={value}
      checked={isChecked}
      onChange={onChange}
      disabled={disabled}
    />
    <label
      htmlFor={id}
      className={classNames(styles["option"], {
        [styles["option--disabled"]]: disabled,
        [styles["option--error"]]: hasError,
      })}
    >
      {label}
    </label>
  </div>
);

export default Option;
