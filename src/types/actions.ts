export enum articleActionTypes {
  SET_ARTICLES_PER_PAGE_COUNT = "SET_ARTICLES_COUNT_PER_PAGE",
  ADD_TAG = "ADD_TAG",
  REMOVE_TAG = "REMOVE_TAG",
  SET_TAB = "SET_TAB",
}

type SetArticlesPerPageCount = {
  type: articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT;
  payload: number;
};

type AddTag = {
  type: articleActionTypes.ADD_TAG;
  payload: string;
};

type RemoveTag = {
  type: articleActionTypes.REMOVE_TAG;
  payload: string;
};

type SetTab = {
  type: articleActionTypes.SET_TAB;
  payload: string;
};

export type ArticleActions =
  | SetArticlesPerPageCount
  | AddTag
  | RemoveTag
  | SetTab;

export type Actions = ArticleActions;
