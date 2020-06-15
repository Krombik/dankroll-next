export interface AllArticles {
  articles: ArticleType[];
  articlesCount: number;
}

export interface Article {
  article: ArticleType;
}

export type ArticleType = {
  tagList: string[];
  createdAt: number;
  author: Author;
  description: string;
  title: string;
  body: string;
  slug: string;
  updatedAt: number;
  favoritesCount: number;
  favorited: boolean;
};

export type Author = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type Tab = {
  value: string;
  type: string;
  key?: string;
};
