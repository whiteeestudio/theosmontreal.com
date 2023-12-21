import moment from "moment";
import { atom, selector } from "recoil";

import shopifyApiState from "./shopifyApiState";

const checkoutState = atom({
  key: "checkoutState",
  default: selector({
    key: "checkoutState/default",
    get: async ({ get }) => {
      const client = get(shopifyApiState);
      const storedCheckoutInfo = window.localStorage.getItem("checkoutInfo");

      if (storedCheckoutInfo) {
        const parsedStoredCheckoutInfo = JSON.parse(storedCheckoutInfo);
        const storedCheckout = await client.checkout.fetch(
          parsedStoredCheckoutInfo.id,
        );
        const today = moment();

        if (
          storedCheckout &&
          !storedCheckout.completedAt &&
          moment(storedCheckout.updatedAt).isSameOrAfter(
            today.subtract(1, "weeks"),
          )
        ) {
          return parsedStoredCheckoutInfo;
        }
      }

      const checkout = await client.checkout.create();

      const checkoutInfo = JSON.stringify({
        id: checkout.id as string,
        webUrl: checkout.webUrl,
      });
      window.localStorage.setItem("checkoutInfo", checkoutInfo);
      return checkout;
    },
  }),
});

export default checkoutState;
