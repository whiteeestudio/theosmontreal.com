import Blob from "components/core/Blob";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => (
  <div className={styles["container"]}>
    <div className={styles["details"]}>
      <h3 className={styles["copyright"]}>
        © {new Date().getFullYear()} Club Theos
      </h3>
    </div>
    <Blob className={styles["blob"]} />
  </div>
);

export default Footer;
