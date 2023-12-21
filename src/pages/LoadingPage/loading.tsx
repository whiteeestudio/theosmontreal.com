import Loader from "components/core/Loader";

import styles from "./LoadingPage.module.scss";

const LoadingPage: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <Loader />
    </div>
  );
};

export default LoadingPage;
