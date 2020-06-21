import { HYDRATE } from "next-redux-wrapper";
import { State } from ".";
import { ArticleActions } from "../redux/articleTabs/type";
import { CommonActions } from "../redux/common/type";
import { ArticleModalActions } from "../redux/articleModal/type";

export type Actions =
  | ArticleActions
  | CommonActions
  | ArticleModalActions
  | { type: typeof HYDRATE; payload: State };
