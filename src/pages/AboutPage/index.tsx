import { motion } from "framer-motion";

import styles from "./AboutPage.module.scss";
import "lazysizes";

const AboutPage: React.FC = () => {
  // const { data: aboutPageData, loading: isAboutPageLoading } =
  //   useQuery<{ metaobject: AboutPageData }>(GET_ABOUT_PAGE);

  // if (!aboutPageData || isAboutPageLoading) {
  //   return <></>;
  // }

  // const shopImage = aboutPageData.metaobject.shopImage.reference.image.url;
  // const shopHours = aboutPageData.metaobject.shopHours.value;
  // const shopHolidayHours = aboutPageData.metaobject.shopHolidayHours?.value;
  // const shopAddress = aboutPageData.metaobject.shopAddress.value;
  // const shopPhoneNumber = aboutPageData.metaobject.shopPhoneNumber.value;

  return (
    <div className={styles["container"]}>
      {/* <div className={styles["left-container"]}>
        <h1>© CLUB THEOS</h1>
        <p>{shopAddress}</p>
        <p>{shopPhoneNumber}</p>
      </div>
      <div className={styles["right-container"]}>
        <RichText {...JSON.parse(shopHours)} />
        {shopHolidayHours && <RichText {...JSON.parse(shopHolidayHours)} />}
      </div> */}

      <div className={styles["image-container"]}>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          src={`${process.env.PUBLIC_URL}/images/about-1.png`}
          alt={"shop-details"}
          className={styles["details"]}
        />
      </div>
      <div className={styles["image-container"]}>
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          src={`${process.env.PUBLIC_URL}/images/about-2.png`}
          alt={"shop-hours"}
          className={styles["hours"]}
        />
      </div>
    </div>
  );
};

export default AboutPage;
