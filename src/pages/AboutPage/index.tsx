import { motion } from "framer-motion";

import styles from "./AboutPage.module.scss";
import "lazysizes";
import { AboutPageData } from "utils/types";
import { useQuery } from "@apollo/client";
import { GET_ABOUT_PAGE } from "utils/queries";
import { RichText } from "components/core/RichText";

const AboutPage: React.FC = () => {
  const { data: aboutPageData, loading: isAboutPageLoading } =
    useQuery<{ metaobject: AboutPageData }>(GET_ABOUT_PAGE);

  if (!aboutPageData || isAboutPageLoading) {
    return <></>;
  }

  const shopImage = aboutPageData.metaobject.shopImage?.reference.image.url;
  const shopHours = aboutPageData.metaobject.shopHours?.value;
  const shopHolidayHours = aboutPageData.metaobject.shopHolidayHours?.value;
  const shopAddress = aboutPageData.metaobject.shopAddress?.value;
  const shopPhoneNumber = aboutPageData.metaobject.shopPhoneNumber?.value;

  return (
    <div className={styles["container"]}>
      <div className={styles["info-container"]}>
        <div className={styles["details-container"]}>
          <h1>© CLUB THEOS MONTREAL</h1>
          <p>{shopAddress}</p>
          <p>{shopPhoneNumber}</p>
        </div>
        <div className={styles["store-container"]}>
          <h2>STORE HOURS</h2>
          <RichText {...JSON.parse(shopHours)} />
          {shopHolidayHours && <RichText {...JSON.parse(shopHolidayHours)} />}
        </div>
      </div>
      <div className={styles["store-image"]}>
        <motion.img
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={`${shopImage}&width=1200`}
          alt={"shop-details"}
        />
      </div>
    </div>
  );
};

export default AboutPage;
