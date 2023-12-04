import styles from "./Search.module.scss";
import Button from "../Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import classNames from "classnames";

type FormValues = {
  search: string;
};

interface Props {
  isAlwaysOpen?: boolean;
  autoFocus?: boolean;
  showInput?: boolean;
  setShowInput?: (showInput: boolean) => void;
  onSearch: (search: string) => void;
  className?: string;
}

const Search: React.FC<Props> = ({
  showInput = false,
  autoFocus = true,
  setShowInput,
  onSearch,
  isAlwaysOpen,
  className,
}) => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { search: "" },
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => onSearch(data.search);
  const openSearch = useCallback(() => {
    reset();
    setShowInput?.(true);
  }, [reset, setShowInput]);

  if (!showInput && !isAlwaysOpen) {
    return (
      <Button variant="secondary" onClick={openSearch}>
        <div className={styles["search-text"]}>search</div>
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classNames(styles["content"], className)}>
        <input
          className={styles["search-input"]}
          {...register("search")}
          autoFocus={autoFocus}
          autoComplete="off"
        />
        <Button type="submit" variant="secondary">
          <div className={styles["search-text"]}>search</div>
        </Button>
      </div>
    </form>
  );
};

export default Search;
