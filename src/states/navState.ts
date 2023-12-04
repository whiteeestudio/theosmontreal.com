import { atom } from "recoil";

const searchState = atom({
  key: "isSearchOpen",
  default: false,
});

export default searchState;
