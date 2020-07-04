import axios from "axios";
import { SERVER_BASE_URL } from "../utils/constant";
import { getQuery } from "../utils/getQuery";
import fetcher from "../utils/fetcher";
import { FetchRV } from "../types";
import { ArticlesObj, ArticleObj, ArticleEditorType } from "../types/article";

export const getArticlesUrl = (
  type: string,
  value: string,
  page = 0,
  limit = 20
) =>
  `${SERVER_BASE_URL}/articles?${
    type !== "default" ? `${type}=${encodeURIComponent(value)}&` : ""
  }${getQuery(limit, page)}`;

export const getArticleUrl = (slug: string) =>
  `${SERVER_BASE_URL}/articles/${slug}`;

export const deleteArticle = (slug: string, token: string) =>
  fetcher.delete(`${SERVER_BASE_URL}/articles/${slug}`, token);

export const setFavoriteArticle = (slug) =>
  axios.post(`${SERVER_BASE_URL}/articles/${slug}/favorite`);

export const getArticlesFavoritedBy = (author, page) =>
  axios.get(
    `${SERVER_BASE_URL}/articles?favorited=${encodeURIComponent(
      author
    )}&${getQuery(10, page)}`
  );

export const feed = (page, limit = 10) =>
  axios.get(`${SERVER_BASE_URL}/articles/feed?${getQuery(limit, page)}`);

export const unfavorite = (slug) =>
  axios.delete(`${SERVER_BASE_URL}/articles/${slug}/favorite`);

export const updateArticle = async (
  article: ArticleEditorType,
  slug: string,
  token: string
) => fetcher.put(`${SERVER_BASE_URL}/articles/${slug}`, { article }, token);

export const createArticle = async (
  article: ArticleEditorType,
  token: string
) =>
  fetcher.post<ArticleObj>(`${SERVER_BASE_URL}/articles`, { article }, token);
