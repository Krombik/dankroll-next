import { SERVER_BASE_URL } from "@/utils/constant";
import fetcher from "@/utils/fetcher";
import { FetchRV } from "@/types";
import { CommentObj } from "@/types/comment";
import { CreateCommentType } from "@/types/comment";

export const getArticleCommentsUrl = (slug: string) =>
  `${SERVER_BASE_URL}/articles/${slug}/comments`;

export const createArticleComment = (
  slug: string,
  comment: CreateCommentType,
  token: string
) =>
  fetcher.post<FetchRV<CommentObj>>(
    `${SERVER_BASE_URL}/articles/${slug}/comments`,
    { comment },
    token
  );

export const deleteArticleComment = (
  slug: string,
  commentId: number,
  token: string
) =>
  fetcher.delete(
    `${SERVER_BASE_URL}/articles/${slug}/comments/${commentId}`,
    token
  );
