import { useQuery } from "@apollo/client";
import styles from "./AboutPage.module.scss";
import { AboutPageData } from "utils/types";
import { GET_ABOUT_PAGE } from "utils/queries";
import { RichText } from "components/core/RichText";

const AboutPage: React.FC = () => {
  const { data: aboutPageData, loading: isAboutPageLoading } =
    useQuery<{ metaobject: AboutPageData }>(GET_ABOUT_PAGE);

  if (!aboutPageData) {
    return <></>;
  }

  const shopImage = aboutPageData.metaobject.shopImage.reference.image.url;
  const shopHours = aboutPageData.metaobject.shopHours.value;
  const shopHolidayHours = aboutPageData.metaobject.shopHolidayHours?.value;
  const shopAddress = aboutPageData.metaobject.shopAddress.value;
  const shopPhoneNumber = aboutPageData.metaobject.shopPhoneNumber.value;

  console.log(JSON.parse(shopHours));
  return (
    <div className={styles["container"]}>
      <h1> © CLUB THEOS</h1>
      <RichText {...JSON.parse(shopHours)} />
      {shopHolidayHours && <RichText {...JSON.parse(shopHolidayHours)} />}
      <p>{shopAddress}</p>
      <p>{shopPhoneNumber}</p>
    </div>
  );
};

export default AboutPage;
