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
  availableForSale: boolean;
};

export interface Products {
  id: string;
  nodes: ShopProduct[];
}

export interface ShopPageData {
  edges: {
    cursor: string;
    node: ShopProduct;
  }[];
  pageInfo: {
    hasNextPage: boolean;
  };
}

export interface SearchResults {
  nodes: ShopProduct[];
}

export interface Product {
  id: string;
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
  mobileBanner: {
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

export interface FreeShippingData {
  text: {
    value: string;
  };
}

export interface AboutPageData {
  shopImage: {
    reference: {
      image: {
        url: string;
      };
    };
  };
  shopHours: {
    value: string;
  };
  shopAddress: {
    value: string;
  };
  shopPhoneNumber: {
    value: string;
  };
  shopHolidayHours: {
    value: string;
  };
}

export interface TheosBubblesData {
  title: {
    value: string;
  };
  mainVideo: {
    reference: {
      previewImage: {
        url: string;
      };
      sources: {
        url: string;
        mimeType: string;
        width: number;
        height: number;
      }[];
    };
  };
  story: {
    value: string;
  };
  photoshootImages: {
    references: {
      nodes: {
        image: {
          url: string;
        };
      }[];
    };
  };
}
