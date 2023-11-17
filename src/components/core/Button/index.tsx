import classNames from "classnames";

import styles from "./Button.module.scss";

interface Props {
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "link";
  disabled?: boolean;
  className?: string;
  active?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  onClick,
  disabled,
  className,
  variant = "primary",
  active,
  children,
  type = "button",
  ...props
}) => (
  <button
    className={classNames(
      styles["button"],
      styles[`button--${variant}`],
      { [styles["active"]]: active },
      className
    )}
    type={type}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
