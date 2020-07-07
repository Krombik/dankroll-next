import { TabType } from "../../types/tab";

export enum ActionTypes {
  SET_ARTICLES_PER_PAGE_COUNT = "SET_ARTICLES_COUNT_PER_PAGE",
  ADD_TAB = "ADD_TAG",
  ADD_TABS = "ADD_TAGS",
  REMOVE_TAB = "REMOVE_TAG",
  SET_TAB = "SET_TAB_BY_INDEX",
  MOVE_TAB = "MVE_TAB",
  SET_PAGE_NUMBER = "SET_PAGE_NUMBERS",
}

type SetArticlesPerPageCount = {
  type: ActionTypes.SET_ARTICLES_PER_PAGE_COUNT;
  payload: number;
};

type AddTab = {
  type: ActionTypes.ADD_TAB;
  payload: { newTab: TabType; key: string; page: number };
};

type AddTabs = {
  type: ActionTypes.ADD_TABS;
  payload: string[];
};

type RemoveTab = {
  type: ActionTypes.REMOVE_TAB;
  payload: string;
};

type SetTab = {
  type: ActionTypes.SET_TAB;
  payload: string;
};

type MoveTab = {
  type: ActionTypes.MOVE_TAB;
  payload: { from: number; to: number };
};

type SetPageNumbers = {
  type: ActionTypes.SET_PAGE_NUMBER;
  payload: { key: string; page: number };
};

export type ArticleActions =
  | SetArticlesPerPageCount
  | AddTab
  | AddTabs
  | RemoveTab
  | SetTab
  | MoveTab
  | SetPageNumbers;
