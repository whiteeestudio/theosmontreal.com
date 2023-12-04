import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Search.module.scss";
import { ShopProducts } from "pages/ShopPage";
import { useQuery } from "@apollo/client";
import { SearchResults } from "utils/types";
import { GET_SEARCH_RESULTS } from "utils/queries";

interface SearchData {
  search: SearchResults;
}

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = useMemo(() => searchParams.get("q") || "", [searchParams]);

  const { data: searchData } = useQuery<SearchData>(GET_SEARCH_RESULTS, {
    variables: { query },
  });

  useEffect(() => {
    document.title = `theos shop · search`;
  }, []);

  const products = searchData?.search.nodes;

  if (!products || !products.length) {
    return <>no results...</>;
  }

  return (
    <div className={styles["container"]}>
      <ShopProducts products={products} />
    </div>
  );
};

export default SearchPage;
