import { UserType } from "./user";

export interface CommentsObj {
  comments: CommentType[];
}

export type CommentType = {
  createdAt: string;
  id: string;
  body: string;
  slug: string;
  author: UserType;
  updatedAt: string;
};
