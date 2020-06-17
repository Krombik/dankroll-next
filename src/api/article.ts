import axios from "axios";

import { AllArticles } from "../types/article";

import { SERVER_BASE_URL } from "../utils/constant";
import { getQuery } from "../utils/getQuery";

type GetArticlesUrlProps = {
  page?: number;
  limit?: number;
  type: string;
  value: string;
};

export const getArticlesUrl = ({
  page = 0,
  limit = 10,
  type,
  value,
}: GetArticlesUrlProps) =>
  `${SERVER_BASE_URL}/articles?${
    type !== "default" ? `${type}=${encodeURIComponent(value)}&` : ""
  }${getQuery(limit, page)}`;

export const getArticleUrl = (slug: string) =>
  `${SERVER_BASE_URL}/articles/${slug}`;

export const deleteArticle = (id, token) =>
  axios.delete(`${SERVER_BASE_URL}/articles/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

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
