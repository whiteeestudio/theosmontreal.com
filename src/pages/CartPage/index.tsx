import { Fragment, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import cartState from "states/cartState";
import checkoutState from "states/checkoutState";

import styles from "./CartPage.module.scss";
import Button from "components/core/Button";
import shopifyApiState from "states/shopifyApiState";
import { formatMoneyV2 } from "utils/money";

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
      <div className={styles["product-info"]}>
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
      </div>

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

  return (
    <div className={styles["container"]}>
      <h1>Shopping cart</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={styles["content-container"]}
      >
        <div className={styles["left-container"]}>
          {items.length > 0 ? (
            <>
              <div className={styles["cart"]}>
                {individualItems.map((item) => (
                  <Fragment key={item.id}>
                    <Item item={item} />
                  </Fragment>
                ))}
              </div>
            </>
          ) : (
            <>
              <p>Your cart is empty.</p>
            </>
          )}
        </div>
        <div className={styles["right-container"]}>
          {items.length > 0 ? (
            <Button
              className={styles["button"]}
              variant="primary"
              onClick={goToCheckout}
            >
              checkout
            </Button>
          ) : (
            <Button
              className={styles["button"]}
              variant="primary"
              onClick={() => navigate("/shop")}
            >
              continue shopping
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage;
