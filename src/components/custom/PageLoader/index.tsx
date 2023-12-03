import Loader from "components/core/Loader";
import styles from "./PageLoader.module.scss";

const PageLoader: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <Loader />
    </div>
  );
};

export default PageLoader;
