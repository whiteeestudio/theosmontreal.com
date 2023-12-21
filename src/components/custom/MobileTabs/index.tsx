import classNames from "classnames";
import Button from "components/core/Button";
import Search from "components/core/Search";
import { MENU_LEFT } from "components/layouts/ShopLayout";
import { useCallback, useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import searchState from "states/navState";

import styles from "./MobileTabs.module.scss";

const MobileTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const current = MENU_LEFT.find((item) => pathname.includes(item.to));

  const isSearchOpen = useRecoilValue(searchState);
  const setIsSearchOpen = useSetRecoilState(searchState);

  useEffect(() => {
    if (!pathname.includes("shop/search")) {
      setIsSearchOpen(false);
    }
  }, [pathname, setIsSearchOpen]);

  const onSearch = useCallback(
    (search: string) => {
      navigate({
        pathname: "/shop/search",
        search: createSearchParams({
          q: search,
        }).toString(),
      });
    },
    [navigate],
  );

  if (!current?.items) {
    return <></>;
  }

  return (
    <div className={styles["container"]}>
      {pathname.includes("shop") && (
        <Search
          onSearch={onSearch}
          setShowInput={setIsSearchOpen}
          showInput={isSearchOpen}
          isAlwaysOpen
          autoFocus={false}
          placeHolder="Search products..."
          className={styles["search-bar"]}
        />
      )}
      <div className={classNames(styles["navigate-container"])}>
        {current.items.map((category) => (
          <Button
            key={category.title}
            variant="tertiary"
            className={classNames({
              [styles["navigate-button--current"]]: pathname === category.to,
            })}
            onClick={() => navigate(category.to)}
          >
            {category.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileTabs;
