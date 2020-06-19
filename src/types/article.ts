import { AuthorType } from "./author";

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
  author: AuthorType;
  description: string;
  title: string;
  body: string;
  slug: string;
  updatedAt: string;
  favoritesCount: number;
  favorited: boolean;
};
