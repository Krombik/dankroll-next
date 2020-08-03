import { SERVER_BASE_URL, TabValues } from "@/utils/constant";
import fetcher from "@/utils/fetcher";
import { ArticleObj, ArticleEditorType } from "@/types/article";
import { getQuery } from "@/utils/getQuery";

export const getArticlesUrl = (
  type: string,
  value: string | undefined,
  page: number,
  limit: number
) =>
  `${SERVER_BASE_URL}/articles${
    type !== TabValues.FEED
      ? `?${
          type !== TabValues.DEFAULT && value
            ? `${type}=${encodeURIComponent(value)}&`
            : ""
        }`
      : "/feed?"
  }${getQuery(limit, page)}`;

export const getArticleUrl = (slug: string) =>
  `${SERVER_BASE_URL}/articles/${slug}`;

export const likeArticle = (like: boolean, slug: string, token: string) => {
  const url = `${SERVER_BASE_URL}/articles/${slug}/favorite`;
  if (like) return fetcher.post<ArticleObj>(url, null, token);
  return fetcher.delete<ArticleObj>(url, token);
};

export const deleteArticle = (slug: string, token: string) =>
  fetcher.delete(`${SERVER_BASE_URL}/articles/${slug}`, token);

export const updateArticle = (
  article: Partial<ArticleEditorType>,
  slug: string,
  token: string
) =>
  fetcher.put<ArticleObj>(
    `${SERVER_BASE_URL}/articles/${slug}`,
    { article },
    token
  );

export const createArticle = (article: ArticleEditorType, token: string) =>
  fetcher.post<ArticleObj>(`${SERVER_BASE_URL}/articles`, { article }, token);
