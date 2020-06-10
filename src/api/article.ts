import axios from "axios";

import { AllArticles } from "../types/article";

import { SERVER_BASE_URL } from "../utils/constant";
import { getQuery } from "../utils/getQuery";

export const getAllArticles = (page, limit = 10) =>
  axios
    .get<AllArticles>(`${SERVER_BASE_URL}/articles?${getQuery(limit, page)}`)
    .then((res) => res.data);

export const getArticlesByAuthor = (author, page = 0, limit = 5) =>
  axios.get(
    `${SERVER_BASE_URL}/articles?author=${encodeURIComponent(
      author
    )}&${getQuery(limit, page)}`
  );

export const getArticlesByTag = (tag, page = 0, limit = 10) =>
  axios.get(
    `${SERVER_BASE_URL}/articles?tag=${encodeURIComponent(tag)}&${getQuery(
      limit,
      page
    )}`
  );

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

export const getArticle = (slug) =>
  axios.get(`${SERVER_BASE_URL}/articles/${slug}`);

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
