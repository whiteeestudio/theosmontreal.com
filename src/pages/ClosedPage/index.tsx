import TextInput from "components/core/TextInput";
import styles from "./ClosedPage.module.scss";
import Button from "components/core/Button";
import { useCallback, useState } from "react";

interface Props {
  setIsClosed: (isClosed: boolean) => void;
}
const ClosedPage: React.FC<Props> = ({ setIsClosed }) => {
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (password === process.env.REACT_APP_INSECURE_PASSWORD_FOR_NORMIES) {
        setIsInvalid(false);
        setIsClosed(false);
      }

      setIsInvalid(true);
    },
    [password, setIsClosed]
  );

  return (
    <div className={styles["container"]}>
      <form className={styles["form"]} onSubmit={onSubmit}>
        <TextInput
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles["button-container"]}>
          <Button type="submit">Enter</Button>
          {isInvalid && <p className={styles["error-text"]}>wrong password.</p>}
        </div>
      </form>
    </div>
  );
};

export default ClosedPage;
