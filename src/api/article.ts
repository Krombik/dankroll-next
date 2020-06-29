import axios from "axios";
import { SERVER_BASE_URL } from "../utils/constant";
import { getQuery } from "../utils/getQuery";
import fetcher from "../utils/fetcher";
import { FetchRV } from "../types";
import { ArticlesObj, ArticleObj } from "../types/article";

export const getArticles = async (
  type: string,
  value: string,
  page = 0,
  limit = 20,
  token?: string
) =>
  await fetcher.get<FetchRV<ArticlesObj>>(
    `${SERVER_BASE_URL}/articles?${
      type !== "default" ? `${type}=${encodeURIComponent(value)}&` : ""
    }${getQuery(limit, page)}`,
    token
  );

export const getArticle = async (slug: string, token?: string) =>
  await fetcher.get<FetchRV<ArticleObj>>(
    `${SERVER_BASE_URL}/articles/${slug}`,
    token
  );

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

export const updateArticle = async (article, token) => {
  const { data, status } = await axios.put(
    `${SERVER_BASE_URL}/articles/${article.slug}`,
    JSON.stringify({ article }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
    }
  );
  return {
    data,
    status,
  };
};

export const createArticle = async (article, token) => {
  const { data, status } = await axios.post(
    `${SERVER_BASE_URL}/articles`,
    JSON.stringify({ article }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
    }
  );
  return {
    data,
    status,
  };
};
