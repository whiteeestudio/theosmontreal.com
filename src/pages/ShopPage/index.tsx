import "lazysizes";

import styles from "./Shop.module.scss";
import { useQuery } from "@apollo/client";
import { GET_COLLECTION } from "utils/queries";
import { Products, ShopProduct } from "utils/types";
import classNames from "classnames";
import { Suspense, useEffect } from "react";
import Item from "components/core/Item";
import { formatPrice } from "utils/money";

interface CollectionByHandleData {
  collection: {
    products: Products;
  };
}

interface ProductsProps {
  products: ShopProduct[];
}

const ShopProducts: React.FC<ProductsProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className={styles["no-products-container"]}>No products yet.</div>
    );
  }

  return (
    <div className={classNames(styles["products"])}>
      {products.map((node) => (
        <Suspense
          fallback={<h6 className="loading-text">loading...</h6>}
          key={node.handle}
        >
          <Item
            handle={node.handle}
            src={node.featuredImage.url}
            title={node.title}
            price={formatPrice(node.priceRange)}
            availableForSale={node.availableForSale}
          />
        </Suspense>
      ))}
    </div>
  );
};

export const ShopPage: React.FC<{ handle: string }> = ({ handle }) => {
  const { data: productsData, loading: isProductsLoading } =
    useQuery<CollectionByHandleData>(GET_COLLECTION, {
      variables: { collectionHandle: handle },
    });

  useEffect(() => {
    document.title = `Club Theos · Shop`;
  }, []);

  if (isProductsLoading || !productsData) {
    return <></>;
  }

  return (
    <div className={styles["container"]}>
      <ShopProducts products={productsData.collection.products.nodes} />
    </div>
  );
};

export default ShopPage;
