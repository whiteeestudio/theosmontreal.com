import { client } from "apollo";
import { atom, selector } from "recoil";
import { GET_COLLECTION_PAGE_DATA } from "utils/queries";
import { ShopPageData } from "utils/types";

interface CollectionPageData {
  collection: {
    products: ShopPageData;
  };
}

export const currentCollectionState = atom({
  key: "CurrentCollectionID",
  default: undefined as string | undefined,
});

export const scrollPosition = atom({
  key: "ScrollPosition",
  default: undefined as string | undefined,
});

export const shopPaginationState = selector({
  key: "shop/pagination",
  get: async ({ get }) => {
    const currentCollection = get(currentCollectionState);
    const pages = [];
    let after = undefined;
    let hasNextPage = true;
    let isFetched = false;

    if (!currentCollection) {
      return { pages: [], isPagesFetched: true };
    }

    while (hasNextPage) {
      const products = await client.query<CollectionPageData>({
        query: GET_COLLECTION_PAGE_DATA,
        variables: { collectionHandle: currentCollection, after },
      });

      const edges = products.data.collection.products.edges;
      const currentHasNextPage =
        products.data.collection.products.pageInfo.hasNextPage;

      if (currentHasNextPage) {
        const endCursor: string = edges[edges.length - 1].cursor;
        after = endCursor;
      } else {
        isFetched = true;
      }
      pages.push(edges.map((edge) => edge.node));
      hasNextPage = currentHasNextPage;
    }

    return { pages, isPagesFetched: isFetched };
  },
});
