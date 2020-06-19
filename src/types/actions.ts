import { HYDRATE } from "next-redux-wrapper";
import { State } from ".";
import { ArticleActions } from "../redux/article/type";
import { CommonActions } from "../redux/common/type";

export type Actions =
  | ArticleActions
  | CommonActions
  | { type: typeof HYDRATE; payload: State };
