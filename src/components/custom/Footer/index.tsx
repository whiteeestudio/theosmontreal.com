import styles from "./Footer.module.scss";

interface Props {
  isMobile: boolean;
}

const Footer: React.FC<Props> = ({ isMobile }) => (
  <div className={styles["container"]}>
    <div className={styles["details"]}>
      <div>
        <h3 className={styles["copyright"]}>
          © {new Date().getFullYear()} Theos montreal
        </h3>
      </div>
      <a
        href="https://www.instagram.com/theosmontreal/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className={styles["link"]}>instagram</p>
      </a>
    </div>
  </div>
);

export default Footer;
