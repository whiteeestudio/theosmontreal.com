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

export interface PolicySection {
  title: {
    value: string;
  };
  body: {
    value: string;
  };
}

export interface PolicyQuestion {
  question: {
    value: string;
  };
  answer: {
    value: string;
  };
}

export interface Policy {
  title: {
    value: string;
  };
  description: {
    value?: string;
  };
  sections?: {
    references: {
      nodes: PolicySection[];
    };
  };
  questions?: {
    references: {
      nodes: PolicyQuestion[];
    };
  };
}

export interface HomePageData {
  banner: {
    reference: {
      image: {
        url: string;
      };
    };
  };
  logo: {
    reference: {
      image: {
        url: string;
      };
    };
  };
}
