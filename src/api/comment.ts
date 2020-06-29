import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";
import fetcher from "../utils/fetcher";
import { FetchRV } from "../types";
import { CommentsObj } from "../types/comment";

export const getArticleComments = async (slug: string, token?: string) =>
  await fetcher.get<FetchRV<CommentsObj>>(
    `${SERVER_BASE_URL}/articles/${slug}/comments`,
    token
  );

const CommentAPI = {
  create: async (slug, comment) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/articles/${slug}/comments`,
        JSON.stringify({ comment })
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  delete: async (slug, commentId) => {
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/articles/${slug}/comments/${commentId}`
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  forArticle: (slug) =>
    axios.get(`${SERVER_BASE_URL}/articles/${slug}/comments`),
};
