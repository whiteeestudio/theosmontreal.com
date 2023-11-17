import classNames from "classnames";
import styles from "./TextInput.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const TextInput: React.FC<Props> = ({ label, className, ...props }) => (
  <div className={classNames(styles["container"], className)}>
    <label className={styles["label"]}>{label}</label>
    <input className={styles["input-text"]} {...props} />
  </div>
);

export default TextInput;
