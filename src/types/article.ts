import { UserType } from "./user";

export interface ArticlesObj {
  articles: ArticleType[];
  articlesCount: number;
}

export interface ArticleObj {
  article: ArticleType;
}

export type ArticleType = ArticleEditorType & ArticleAdditionalInfoType;
export type ArticleCurrentEditorType = ArticleEditorType &
  Partial<ArticleAdditionalInfoType>;

export type ArticleEditorType = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

type ArticleAdditionalInfoType = {
  createdAt: string;
  author: UserType;
  slug: string;
  updatedAt: string;
  favoritesCount: number;
  favorited: boolean;
};
