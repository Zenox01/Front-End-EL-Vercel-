import React, { lazy } from "react";
import { mainMenu, search, statutes } from "../Components/menu";

const MAIN = {
  CASES: lazy(() => import("../Pages/_cases/CasesPage")),
};
const SEARCH = {
  SEARCH_RESULT: lazy(() => import("../Pages/SearchResult")),
};
const JUDGES = {
  JUDGES: lazy(() => import("../Pages/Judges")),
};
const STATUTES = {
  STATUTES: lazy(() => import("../Pages/Statutes")),
};
const JUDGEMENT = {
  JUDGEMENT: lazy(() => import("../Pages/Judgement")),
};

const presentation = [
  /**
   * Main
   */
  {
    path: mainMenu.cases.path,
    element: <MAIN.CASES />,
    exact: true,
  },

  /** ************************************************** */
  /**
   * Search
   */
  {
    path: search.searchResult.path,
    element: <SEARCH.SEARCH_RESULT />,
    exact: true,
  },
  /** ************************************************** */
  /** ************************************************** */
  /**
   * Judges
   */
  {
    path: mainMenu.judges.path,
    element: <JUDGES.JUDGES />,
    exact: true,
  },
  /** ************************************************** */
  /** ************************************************** */
  /** ************************************************** */
  /**
   * Statutes
   */
  {
    path: statutes.path,
    element: <STATUTES.STATUTES />,
    exact: true,
  },
  /** ************************************************** */
  /** ************************************************** */
  /** ************************************************** */
  /**
   * Judgment
   */
   {
    path: "/judgement/:id",
    element: <JUDGEMENT.JUDGEMENT />,
    exact: true,
  },
  /** ************************************************** */
];
const contents = [...presentation];

export default contents;
