import "lazysizes";

import styles from "./Shop.module.scss";
import { useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS, GET_COLLECTION } from "utils/queries";
import { Products, ShopProduct } from "utils/types";
import classNames from "classnames";
import { Suspense, useEffect } from "react";
import Item from "components/core/Item";
import { formatPrice } from "utils/money";
import { useWindowView } from "utils/view";
import { SUB_ITEMS } from "components/layouts/ShopLayout";
import Button from "components/core/Button";
import { useLocation, useNavigate } from "react-router-dom";

interface CollectionByHandleData {
  collection: {
    products: Products;
  };
}

interface ProductsData {
  products: Products;
}

interface ShopProductsProps {
  products: ShopProduct[];
}

const MobileTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={classNames(styles["navigate-container"])}>
      {SUB_ITEMS.map((category) => (
        <Button
          variant="tertiary"
          className={classNames({
            [styles["navigate-button--current"]]: pathname === category.to,
          })}
          onClick={() => navigate(category.to)}
        >
          {category.title}
        </Button>
      ))}
    </div>
  );
};

const ShopProducts: React.FC<ShopProductsProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className={styles["no-products-container"]}>No products yet</div>
    );
  }

  return (
    <div className={classNames(styles["products"])}>
      {products.map((node) => (
        <Suspense
          fallback={
            <h6 className="loading-text">Loading product, please wait...</h6>
          }
          key={node.handle}
        >
          <Item
            handle={node.handle}
            src={node.featuredImage.url}
            title={node.title}
            price={formatPrice(node.priceRange)}
          />
        </Suspense>
      ))}
    </div>
  );
};

const ShopPage: React.FC = () => {
  const { isMobile, isTablet } = useWindowView();

  const { data: productsData, loading: isProductsLoading } =
    useQuery<ProductsData>(GET_ALL_PRODUCTS);

  useEffect(() => {
    document.title = `Club Theos · Shop all`;
  }, []);

  if (isProductsLoading || !productsData) {
    return (
      <div className={styles["container"]}>
        {(isMobile || isTablet) && <MobileTabs />}
      </div>
    );
  }

  const orderedProducts = [...productsData.products.nodes];
  orderedProducts.reverse();

  return (
    <div className={styles["container"]}>
      {(isMobile || isTablet) && <MobileTabs />}
      <ShopProducts products={orderedProducts} />
    </div>
  );
};

export const ShopCategoryPage: React.FC<{ handle: string }> = ({ handle }) => {
  const { isMobile, isTablet } = useWindowView();

  const { data: productsData, loading: isProductsLoading } =
    useQuery<CollectionByHandleData>(GET_COLLECTION, {
      variables: { collectionHandle: handle },
    });

  useEffect(() => {
    document.title = `Club Theos · Shop`;
  }, []);

  if (isProductsLoading || !productsData) {
    return (
      <div className={styles["container"]}>
        {(isMobile || isTablet) && <MobileTabs />}
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      {(isMobile || isTablet) && <MobileTabs />}
      <ShopProducts products={productsData.collection.products.nodes} />
    </div>
  );
};

export default ShopPage;
