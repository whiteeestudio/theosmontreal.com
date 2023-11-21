import { useQuery } from "@apollo/client";
import styles from "./AboutPage.module.scss";
import { AboutPageData } from "utils/types";
import { GET_ABOUT_PAGE } from "utils/queries";
import classNames from "classnames";

const AboutPage: React.FC = () => {
  const { data: aboutPageData, loading: isAboutPageLoading } =
    useQuery<{ metaobject: AboutPageData }>(GET_ABOUT_PAGE);

  const shopImage = aboutPageData?.metaobject.shopImage.reference.image.url;
  return <div className={styles["container"]}>Coming soon.</div>;
};

export default AboutPage;
