import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_COLLECTION_PAGE_DATA } from "utils/queries";
import { ShopPageData } from "utils/types";

interface CollectionPageData {
  collection: {
    products: ShopPageData;
  };
}

export const useCollectionPagination = (handle: string) => {
  const [pages, setPages] = useState<(string | undefined)[]>([undefined]);
  const [after, setAfter] = useState<string | undefined>(undefined);
  const [isFetched, setIsFetched] = useState(false);

  const { data: pageData, loading: isLoading } = useQuery<CollectionPageData>(
    GET_COLLECTION_PAGE_DATA,
    {
      variables: { collectionHandle: handle, after },
    }
  );

  useEffect(() => {
    setPages([undefined]);
    setAfter(undefined);
    setIsFetched(false);
  }, [handle]);

  useEffect(() => {
    if (!isLoading && pageData) {
      const edges = pageData.collection.products.edges;

      if (pageData.collection.products.pageInfo.hasNextPage) {
        const endCursor = edges[edges.length - 1].cursor;
        setPages((curr) => [...curr, endCursor]);
        setAfter(endCursor);
      } else {
        setIsFetched(true);
      }
    }
  }, [isLoading, pageData]);

  return {
    pages,
    isPagesFetched: isFetched,
  };
};
