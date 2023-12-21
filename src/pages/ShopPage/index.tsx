import "lazysizes";

import { Pagination } from "@mui/material";
import classNames from "classnames";
import Item from "components/core/Item";
import { useCallback, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { shopPaginationState } from "states/shopState";
import { formatPrice } from "utils/money";
import { ShopProduct } from "utils/types";

import styles from "./Shop.module.scss";

interface ProductsProps {
  products: ShopProduct[];
}

export const ShopProducts: React.FC<ProductsProps> = ({ products }) => {
  if (!products || products?.length === 0) {
    return (
      <div className={styles["no-products-container"]}>No products yet.</div>
    );
  }

  return (
    <>
      <Helmet>
        <script
          async
          type="text/javascript"
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=RwmzgQ"
        ></script>
      </Helmet>
      <div className={classNames(styles["products"])}>
        {products.map((node) => (
          <Link to={`/product/${node.handle}`} key={node.handle}>
            <Item
              handle={node.handle}
              src={node?.featuredImage?.url}
              title={node.title}
              price={formatPrice(node.priceRange)}
              availableForSale={node.availableForSale}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export const ShopPage: React.FC<{ handle: string }> = ({ handle }) => {
  const { pages } = useRecoilValue(shopPaginationState(handle));
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const currentPage = useMemo(
    () => Number(searchParams.get("page") || "1"),
    [searchParams],
  );

  useEffect(() => {
    document.title = `theos shop · ${handle.split("-").join(" ")}`;
  }, [handle]);

  const onPageChange = useCallback(
    (_, value: number) => {
      navigate(`/shop/${handle}${value === 1 ? "" : `?page=${value}`}`);
      window.scrollTo(0, 0);
    },
    [handle, navigate],
  );

  const products = pages?.[currentPage - 1] ?? [];

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
