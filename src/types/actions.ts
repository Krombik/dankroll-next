export enum articleActionTypes {
  SET_ARTICLES_PER_PAGE_COUNT = "SET_ARTICLES_COUNT_PER_PAGE",
}

type SetArticlesPerPageCount = {
  type: articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT;
  payload: number;
};

export type ArticleActions = SetArticlesPerPageCount;

export type Actions = ArticleActions;
