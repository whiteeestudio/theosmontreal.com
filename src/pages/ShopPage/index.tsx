import "lazysizes";

import styles from "./Shop.module.scss";
import { useQuery } from "@apollo/client";
import { GET_COLLECTION } from "utils/queries";
import { Products, ShopProduct } from "utils/types";
import classNames from "classnames";
import { Suspense, useCallback, useEffect, useMemo } from "react";
import Item from "components/core/Item";
import { formatPrice } from "utils/money";
import { Pagination } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentCollectionState, shopPaginationState } from "states/shopState";

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
            src={node?.featuredImage?.url}
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
  const { pages, isPagesFetched } = useRecoilValue(shopPaginationState);
  const setCurrentCollection = useSetRecoilState(currentCollectionState);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const currentPage = useMemo(
    () => searchParams.get("page") || "1",
    [searchParams]
  );

  const { data: productsData, loading: isProductsLoading } =
    useQuery<CollectionByHandleData>(GET_COLLECTION, {
      variables: {
        collectionHandle: handle,
        after: pages?.length && pages[Number(currentPage)],
      },
    });

  useEffect(() => {
    document.title = `Shop · ${handle.split("-").join(" ")}`;
    setCurrentCollection(handle);
  }, [handle, setCurrentCollection]);

  useEffect(() => {
    const currentPageNum = Number(currentPage);
    if (currentPageNum === 1 || currentPageNum > pages.length) {
      navigate(`/shop/${handle}`);
    }
  }, [currentPage, handle, navigate, pages]);

  const onPageChange = useCallback(
    (_, value: number) => {
      navigate(`/shop/${handle}${value === 1 ? "" : `?page=${value}`}`);
    },
    [handle, navigate]
  );

  if (!isPagesFetched || isProductsLoading || !productsData) {
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
          page={Number(currentPage)}
          onChange={onPageChange}
          hidePrevButton={Number(currentPage) === 1}
          hideNextButton={Number(currentPage) === pages.length}
        />
      )}
    </div>
  );
};

export default ShopPage;
