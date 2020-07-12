import { UserType } from "./user";

export interface CommentsObj {
  comments: CommentType[];
}

export interface CommentObj {
  comment: CommentType;
}

export type CommentType = {
  createdAt: string;
  id: number;
  body: string;
  slug: string;
  author: UserType;
  updatedAt: string;
};

export type CreateCommentType = {
  body: string;
};
