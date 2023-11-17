export type PriceRange = {
  maxVariantPrice: {
    amount: string;
    currencyCode: string;
  };
};

export type ShopProduct = {
  handle: string;
  title: string;
  featuredImage: {
    url: string;
  };
  priceRange: PriceRange;
};

export interface Products {
  nodes: ShopProduct[];
}

export interface Product {
  title: string;
  description: string;
  availableForSale: boolean;
  descriptionHtml: string;
  priceRange: PriceRange;
  images: {
    edges: {
      node: {
        url: string;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        quantityAvailable: number;
      };
    }[];
  };
  modelInfo: {
    value: string;
  } | null;
  sizeGuide: {
    value: string;
  } | null;
}
