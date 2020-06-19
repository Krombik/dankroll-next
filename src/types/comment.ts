import { AuthorType } from "./author";

export interface CommentsObj {
  comments: CommentType[];
}

export type CommentType = {
  createdAt: string;
  id: string;
  body: string;
  slug: string;
  author: AuthorType;
  updatedAt: string;
};
