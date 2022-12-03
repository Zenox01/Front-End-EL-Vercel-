import React from "react";
import { mainMenu, search } from "../Components/menu";
import Judgment from "../Pages/Validation/Cases/Judgment";
import DefaultHeader from "../Pages/_layout/_headers/DefaultHeader";
import SearchHeader from "../Pages/_layout/_headers/SearchHeader";

const headers = [
  { path: "*", element: <DefaultHeader />, exact: true },
  { path: search.searchResult.path, element: <SearchHeader />, exact: true },
  //   { path: mainMenu.departments.path, element: null, exact: true },
    // { path: mainMenu.judgement.path, element: <Judgment/>, exact: true },
];

export default headers;
