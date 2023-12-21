import { selectorFamily } from "recoil";
import { client } from "utils/apollo";
import { GET_COLLECTION_PAGE_DATA } from "utils/queries";
import { ShopPageData } from "utils/types";

interface CollectionPageData {
  collection: {
    products: ShopPageData;
  };
}

export const shopPaginationState = selectorFamily({
  key: "shop/pagination",
  get: (collectionHandle) => async () => {
    const pages = [];
    let after = undefined;
    let hasNextPage = true;

    if (!collectionHandle) {
      return { pages: [], isPagesFetched: true };
    }

    while (hasNextPage) {
      const products = await client.query<CollectionPageData>({
        query: GET_COLLECTION_PAGE_DATA,
        variables: { collectionHandle: collectionHandle, after },
      });

      const edges = products.data.collection.products.edges;
      const currentHasNextPage =
        products.data.collection.products.pageInfo.hasNextPage;

      if (currentHasNextPage) {
        const endCursor: string = edges[edges.length - 1].cursor;
        after = endCursor;
      }
      pages.push(edges.map((edge) => edge.node));
      hasNextPage = currentHasNextPage;
    }

    return { pages };
  },
});
