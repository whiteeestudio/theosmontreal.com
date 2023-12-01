import "lazysizes";

import styles from "./Shop.module.scss";
import { useQuery } from "@apollo/client";
import { GET_COLLECTION } from "utils/queries";
import { Products, ShopProduct } from "utils/types";
import classNames from "classnames";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Item from "components/core/Item";
import { formatPrice } from "utils/money";
import { useCollectionPagination } from "utils/hooks/use-collection-pagination";
import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";

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
  const { pages, isPagesFetched } = useCollectionPagination(handle);
  const [after, setAfter] = useState<string | undefined>(undefined);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = useMemo(() => searchParams.get("page"), [searchParams]);

  const { data: productsData, loading: isProductsLoading } =
    useQuery<CollectionByHandleData>(GET_COLLECTION, {
      variables: {
        collectionHandle: handle,
        after,
      },
    });

  useEffect(() => {
    document.title = "Shop";
  }, []);

  useEffect(() => {
    if (isPagesFetched) {
      const currentPageNum = Number(currentPage);

      if (
        Number.isNaN(currentPageNum) ||
        currentPageNum === 1 ||
        currentPageNum > pages.length
      ) {
        setSearchParams((params) => {
          params.delete("page");
          return params;
        });
      }
      setAfter(pages[currentPageNum - 1]);
    }
  }, [currentPage, isPagesFetched, pages, searchParams, setSearchParams]);

  const onPageChange = useCallback(
    (_, value: number) => {
      setSearchParams({ page: value.toLocaleString() });
    },
    [setSearchParams]
  );

  if (isProductsLoading || !productsData) {
    return <></>;
  }

  const products = productsData.collection.products.nodes;
  return (
    <div className={styles["container"]}>
      <ShopProducts products={products} />
      {!!products.length && pages.length > 1 && (
        <Pagination
          count={pages.length}
          size="small"
          defaultPage={1}
          page={!currentPage ? 1 : Number(currentPage)}
          onChange={onPageChange}
          hidePrevButton={!currentPage}
          hideNextButton={Number(currentPage) === pages.length}
        />
      )}
    </div>
  );
};

export default ShopPage;
