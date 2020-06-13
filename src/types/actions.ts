import { Tab } from "./article";
export enum articleActionTypes {
  SET_ARTICLES_PER_PAGE_COUNT = "SET_ARTICLES_COUNT_PER_PAGE",
  ADD_TAB = "ADD_TAG",
  REMOVE_TAB = "REMOVE_TAG",
  SET_TAB = "SET_TAB",
  MOVE_TAB = "MVE_TAB",
}

type SetArticlesPerPageCount = {
  type: articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT;
  payload: number;
};

type AddTab = {
  type: articleActionTypes.ADD_TAB;
  payload: Tab;
};

type RemoveTab = {
  type: articleActionTypes.REMOVE_TAB;
  payload: string;
};

type SetTab = {
  type: articleActionTypes.SET_TAB;
  payload: string | number;
};

type MoveTab = {
  type: articleActionTypes.MOVE_TAB;
  payload: { from: number; to: number };
};

export type ArticleActions =
  | SetArticlesPerPageCount
  | AddTab
  | RemoveTab
  | SetTab
  | MoveTab;

export type Actions = ArticleActions;
