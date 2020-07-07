import { HYDRATE } from "next-redux-wrapper";
import { State } from ".";
import { ArticleActions } from "../redux/articleTabs/type";
import { CommonActions } from "../redux/common/type";
import { ModalActions } from "../redux/modal/type";

export type Actions =
  | ArticleActions
  | CommonActions
  | ModalActions
  | { type: typeof HYDRATE; payload: State };
