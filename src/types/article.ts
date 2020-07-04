import { UserType } from "./user";

export interface ArticlesObj {
  articles: ArticleType[];
  articlesCount: number;
}

export interface ArticleObj {
  article: ArticleType;
}

export type ArticleType = {
  tagList: string[];
  createdAt: string;
  author: UserType;
  description: string;
  title: string;
  body: string;
  slug: string;
  updatedAt: string;
  favoritesCount: number;
  favorited: boolean;
};

export type ArticleEditorType = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};
