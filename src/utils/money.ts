import { MoneyV2 } from "shopify-buy";

import { PriceRange } from "./types";

export const formatMoneyV2 = (money: MoneyV2 | undefined) => {
  if (!money) {
    return "-";
  }
  return `$${money.amount.toLocaleString().split(".")[0]} ${
    money.currencyCode
  }`;
};

export const formatPrice = (priceRange: PriceRange | undefined) => {
  if (!priceRange) {
    return "-";
  }
  return `$${priceRange.maxVariantPrice.amount.split(".")[0]} ${
    priceRange.maxVariantPrice.currencyCode
  }`;
};
