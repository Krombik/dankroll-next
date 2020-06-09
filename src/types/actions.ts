import { ArticleType } from "./article";

export enum articleActionTypes {
  GET_ARTICLE_LIST = "GET_ARTICLE_LIST",
}

type GetArticleList = {
  type: articleActionTypes.GET_ARTICLE_LIST;
  payload: ArticleType[];
};

export type ArticleActions = GetArticleList;

export type Actions = ArticleActions;
