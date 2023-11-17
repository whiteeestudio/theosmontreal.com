import { atom, selector } from "recoil";

import checkoutState from "./checkoutState";
import shopifyApiState from "./shopifyApiState";

const cartState = atom({
  key: "cartState",
  default: selector({
    key: "cart/default",
    get: async ({ get }) => {
      const client = get(shopifyApiState);
      const checkoutInfo = get(checkoutState);

      const checkout = await client.checkout.fetch(checkoutInfo.id);

      return { items: checkout.lineItems, total: checkout.subtotalPrice };
    },
  }),
});

export default cartState;
