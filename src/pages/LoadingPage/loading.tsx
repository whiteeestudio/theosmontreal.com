import styles from "./LoadingPage.module.scss";
import Loader from "components/core/Loader";

const LoadingPage: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <Loader />
    </div>
  );
};

export default LoadingPage;
