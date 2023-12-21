import { useQuery } from "@apollo/client";
import Button from "components/core/Button";
import { motion } from "framer-motion";
import { Fragment, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import cartState from "states/cartState";
import checkoutState from "states/checkoutState";
import shopifyApiState from "states/shopifyApiState";
import { formatMoneyV2 } from "utils/money";
import { GET_FREE_SHIPPING } from "utils/queries";
import { FreeShippingData } from "utils/types";

import styles from "./CartPage.module.scss";

interface Props {
  item: ShopifyBuy.CheckoutLineItem;
}

const Item: React.FC<Props> = ({ item }) => {
  const client = useRecoilValue(shopifyApiState);
  const checkoutInfo = useRecoilValue(checkoutState);
  const setCartState = useSetRecoilState(cartState);

  const removeLineItem = useCallback(async () => {
    const cart = await client.checkout.updateLineItems(checkoutInfo.id, [
      { id: item.id, quantity: item.quantity - 1 },
    ]);
    setCartState({ items: cart.lineItems, total: cart.subtotalPrice });
  }, [checkoutInfo.id, client.checkout, item.id, item.quantity, setCartState]);

  return (
    <motion.div
      className={styles["item-container"]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Link
        to={`/product/${item.variant?.product.handle}`}
        className={styles["product-info"]}
      >
        {item.variant?.image ? (
          <img
            src={item.variant?.image.src}
            className="image"
            width="100"
            alt="cart-item"
          />
        ) : (
          <img
            src={item.variant?.product.featuredImage.src}
            className="image"
            width="100"
            alt="cart-item"
          />
        )}
        <div>
          <p>{item.title}</p>
          <p>{item.variant?.title}</p>
        </div>
      </Link>

      <div className={styles["price"]}>
        <p>{formatMoneyV2(item.variant?.price)}</p>
        <Button variant="link" onClick={removeLineItem}>
          remove
        </Button>
      </div>
    </motion.div>
  );
};

const CartPage = () => {
  const checkoutInfo = useRecoilValue(checkoutState);
  const { items } = useRecoilValue(cartState);
  const navigate = useNavigate();

  const { data: shippingData } = useQuery<{ metaobject: FreeShippingData }>(
    GET_FREE_SHIPPING,
  );

  const goToCheckout = useCallback(() => {
    if (checkoutInfo.webUrl) {
      window.location.href = checkoutInfo.webUrl;
    } else if (checkoutInfo.url) {
      window.location.href = checkoutInfo.url;
    }
  }, [checkoutInfo]);

  const individualItems = items
    .map((item) => new Array(item.quantity).fill(item))
    .flat();

  if (items.length === 0) {
    return (
      <div className={styles["empty-container"]}>
        <p>Your cart is empty.</p>
        <Button
          className={styles["button"]}
          variant="primary"
          onClick={() => navigate("/shop")}
        >
          continue shopping
        </Button>
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={styles["content-container"]}
      >
        <div className={styles["left-container"]}>
          <div className={styles["cart"]}>
            {individualItems.map((item) => (
              <Fragment key={item.id}>
                <Item item={item} />
              </Fragment>
            ))}
          </div>
        </div>
        <div className={styles["right-container"]}>
          <div className={styles["button-container"]}>
            <Button
              className={styles["button"]}
              variant="primary"
              onClick={goToCheckout}
            >
              checkout
            </Button>
            <p>{shippingData?.metaobject.text.value}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage;
