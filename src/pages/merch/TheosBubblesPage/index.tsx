import { useQuery } from "@apollo/client";
import classNames from "classnames";
import Item from "components/core/Item";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { formatPrice } from "utils/money";
import {
  GET_COLLECTION_PAGE_DATA,
  GET_THEOS_BUBBLES_PAGE,
} from "utils/queries";
import { ShopPageData, TheosBubblesData } from "utils/types";

import styles from "./TheosBubblesPage.module.scss";

interface CollectionPageData {
  collection: {
    products: ShopPageData;
  };
}

const TheosBubblesPage: React.FC = () => {
  const { data: pageData, loading: isPageLoading } = useQuery<{
    metaobject: TheosBubblesData;
  }>(GET_THEOS_BUBBLES_PAGE);

  const { data: collectionData, loading: isCollectionLoading } =
    useQuery<CollectionPageData>(GET_COLLECTION_PAGE_DATA, {
      variables: { collectionHandle: "theos-bubbles" },
    });

  if (!pageData || isPageLoading || !collectionData || isCollectionLoading) {
    return <></>;
  }

  const photoshootData = pageData.metaobject.photoshootImages.references.nodes;
  const title = pageData.metaobject.title.value;
  const productData = collectionData.collection.products.edges?.[0].node;

  return (
    <div className={styles["container"]}>
      <Marquee pauseOnHover>
        {photoshootData.map((node) => (
          <div className={styles["image-container"]}>
            <img
              src={`${node.image.url}&width=10`}
              className={classNames(styles["image"], "lazyload", "lazyloaded")}
              alt="photoshoot img"
              data-sizes="auto"
              data-srcset={`${node.image.url}&width=300 300w,
        ${node.image.url}&width=600 600w,
        ${node.image.url}&width=800 800w`}
            />
          </div>
        ))}
      </Marquee>
      <h1 className={styles["title"]}>{title}</h1>
      {productData && (
        <Link
          className={styles["product"]}
          to={`/product/${productData.handle}`}
        >
          <Item
            handle={productData.handle}
            src={productData.featuredImage?.url}
            title={productData.title}
            price={formatPrice(productData.priceRange)}
            availableForSale={productData.availableForSale}
          />
        </Link>
      )}
    </div>
  );
};

// for future use
/* <video
  id="videoplayer"
  muted
  autoPlay
  playsInline
  loop
  width={videoData.width}
  height={videoData.height}
  className={styles["video"]}
>
  <source src={videoData.url} type={videoData.mimeType} />
</video> */

export default TheosBubblesPage;
