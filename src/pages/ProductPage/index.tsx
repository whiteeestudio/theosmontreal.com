import { useQuery } from "@apollo/client";
import classNames from "classnames";
import Button from "components/core/Button";
import { motion } from "framer-motion";
import { Check } from "phosphor-react";

import { Fragment, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import cartState from "states/cartState";
import checkoutState from "states/checkoutState";
import shopifyApiState from "states/shopifyApiState";

import { GET_FREE_SHIPPING, GET_PRODUCT } from "utils/queries";
import { FreeShippingData, Product } from "utils/types";

import "lazysizes";

import styles from "./Product.module.scss";
import Accordions from "components/core/Accordion";
import SingleSelect from "components/core/Select";
import { useWindowView } from "utils/hooks/use-window-view";
import { formatPrice } from "utils/money";

interface ProductData {
  product: Product;
}

interface ProductVars {
  handle: string;
}

const ProductPage: React.FC = () => {
  const { productHandle } = useParams();
  const client = useRecoilValue(shopifyApiState);
  const checkoutInfo = useRecoilValue(checkoutState);
  const cartInfo = useRecoilValue(cartState);
  const setCartState = useSetRecoilState(cartState);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();
  const { isMobile, isTablet } = useWindowView();

  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("add to cart");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { data: productData, loading: isProductLoading } = useQuery<
    ProductData,
    ProductVars
  >(GET_PRODUCT, {
    variables: { handle: productHandle! },
  });

  const { data: shippingData } =
    useQuery<{ metaobject: FreeShippingData }>(GET_FREE_SHIPPING);

  const variants = useMemo(
    () =>
      productData?.product.variants.edges?.map((edge) => ({
        label: edge.node.title,
        value: edge.node.id,
        disabled: !edge.node.quantityAvailable,
        quantityAvailable: edge.node.quantityAvailable,
      })),
    [productData?.product.variants.edges]
  );

  const defaultValue = useMemo(
    () =>
      variants?.filter((variant) => !variant.disabled).length === 1
        ? variants?.filter((variant) => !variant.disabled)[0].value
        : undefined,
    [variants]
  );

  useEffect(() => {
    if (productData) {
      document.title = productData.product.title;
      if (productData?.product.variants.edges.length === 1) {
        setSelectedVariant(defaultValue);
      }
      if (!productData.product.availableForSale) {
        setButtonText("sold out");
      }
    }
  }, [defaultValue, productData]);

  if (isProductLoading) {
    return (
      <div className={styles["container"]} style={{ minHeight: "100vh" }} />
    );
  }

  const handleClick = async () => {
    setIsLoading(true);

    if (!selectedVariant) {
      return;
    }

    const lineItems = [
      {
        variantId: selectedVariant,
        quantity: 1,
      },
    ];

    const variantQuantity = variants?.find(
      (variant) => variant.value === selectedVariant
    )?.quantityAvailable;

    const currentQuantity = cartInfo.items.find(
      (item) => item.variant?.id === selectedVariant
    )?.quantity;

    if (
      !variantQuantity ||
      (currentQuantity && variantQuantity <= currentQuantity)
    ) {
      setButtonText("none left");
      return;
    }

    const cart = await client.checkout.addLineItems(checkoutInfo.id, lineItems);

    if (cart) {
      setCartState((curr) => {
        if (curr.items.length !== cart.lineItems.length) {
          setButtonText("added");
        }
        return {
          items: cart.lineItems,
          total: cart.subtotalPrice,
        };
      });
    }

    setIsLoading(false);
  };

  const displayImages = productData!.product.images.edges;

  const ProductInfo = () => (
    <div className={styles["product-info"]}>
      <h1 className={styles["title"]}>{productData!.product.title}</h1>
      <p className={styles["price"]}>
        {formatPrice(productData?.product.priceRange)}
      </p>
    </div>
  );

  return (
    <div className={styles["container"]}>
      <motion.div
        initial={isTablet || isMobile ? { opacity: 0 } : undefined}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={styles["left-container"]}
      >
        {!isMobile && !isTablet && <ProductInfo />}
        <Accordions
          accordions={[
            {
              summary: "Product details",
              details: (
                <div
                  className={styles["description"]}
                  dangerouslySetInnerHTML={{
                    __html: productData!.product.descriptionHtml,
                  }}
                />
              ),
            },
            {
              summary: "Size guide",
              details: (
                <div className={styles["description"]}>
                  {productData?.product.sizeGuide?.value
                    .trim()
                    .split("\n")
                    .map((text, id) => (
                      <Fragment key={`text-${id}`}>
                        {text}
                        <br />
                      </Fragment>
                    ))}
                </div>
              ),
            },
          ]}
        />
        {(isMobile || isTablet) && (
          <p className={styles["free-shipping"]}>
            {shippingData?.metaobject.text.value}
          </p>
        )}
      </motion.div>
      <motion.div
        className={styles["images-container"]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {displayImages.map((edge) => (
          <img
            key={edge.node.url}
            className={classNames(styles["image"], "lazyload", "lazyloaded")}
            src={`${edge.node.url}&width=50`}
            alt="product"
            data-sizes="auto"
            data-srcset={`${edge.node.url}&width=300 300w,
            ${edge.node.url}&width=600 600w,
            ${edge.node.url} 800w`}
          />
        ))}
      </motion.div>
      <motion.div className={styles["right-container"]}>
        {(isMobile || isTablet) && <ProductInfo />}
        <div className={styles["action-container"]}>
          <SingleSelect
            disabled={!productData?.product.availableForSale}
            options={variants ?? []}
            value={selectedVariant ?? ""}
            setValue={setSelectedVariant}
            defaultValue={defaultValue}
          />
          <div className={styles["button-container"]}>
            <Button
              onClick={handleClick}
              className={styles["button"]}
              disabled={isLoading || !productData?.product.availableForSale}
            >
              {buttonText === "added" ? (
                <div className={styles["added"]}>
                  <Check size={18} /> added to cart
                </div>
              ) : (
                buttonText
              )}
            </Button>
            {!(isMobile || isTablet) && (
              <p className={styles["free-shipping"]}>
                {shippingData?.metaobject.text.value}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPage;
