import { Tab } from "./article";
import { HYDRATE } from "next-redux-wrapper";
import { State } from ".";
export enum articleActionTypes {
  SET_ARTICLES_PER_PAGE_COUNT = "SET_ARTICLES_COUNT_PER_PAGE",
  ADD_TAB = "ADD_TAG",
  ADD_TABS = "ADD_TAGS",
  REMOVE_TAB = "REMOVE_TAG",
  SET_TAB = "SET_TAB_BY_INDEX",
  MOVE_TAB = "MVE_TAB",
  SET_PAGE_NUMBER = "SET_PAGE_NUMBERS",
}

type SetArticlesPerPageCount = {
  type: articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT;
  payload: number;
};

type AddTab = {
  type: articleActionTypes.ADD_TAB;
  payload: Tab;
};

type AddTabs = {
  type: articleActionTypes.ADD_TABS;
  payload: string[];
};

type RemoveTab = {
  type: articleActionTypes.REMOVE_TAB;
  payload: string;
};

type SetTab = {
  type: articleActionTypes.SET_TAB;
  payload: string;
};

type MoveTab = {
  type: articleActionTypes.MOVE_TAB;
  payload: { from: number; to: number };
};

type SetPageNumbers = {
  type: articleActionTypes.SET_PAGE_NUMBER;
  payload: { key: string; count: number };
};

export type ArticleActions =
  | SetArticlesPerPageCount
  | AddTab
  | AddTabs
  | RemoveTab
  | SetTab
  | MoveTab
  | SetPageNumbers;

export type Actions = ArticleActions | { type: typeof HYDRATE; payload: State };
