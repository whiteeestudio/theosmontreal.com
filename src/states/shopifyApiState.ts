import { selector } from "recoil";
import Client from "shopify-buy";

const shopifyApiState = selector({
  key: "shopifyApiState",
  get: () => {
    const client = Client.buildClient({
      domain: "theos123.myshopify.com",
      storefrontAccessToken: "7e318ce64aa9a2d44900c1b2b5036312",
      apiVersion: "2023-07",
    });

    return client;
  },
});

export default shopifyApiState;
