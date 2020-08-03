import { HYDRATE } from "next-redux-wrapper";
import { State } from ".";
import { ArticleActions } from "@/redux/articleTabs/type";
import { CommonActions } from "@/redux/common/type";
import { ModalActions } from "@/redux/modal/type";
import { RehydrateAction } from "redux-persist";
import { ErrorActions } from "@/redux/error/type";
import { AuthenticationActions } from "@/redux/authentication/type";
import { EditorActions } from "@/redux/editor/type";

export type Actions =
  | ArticleActions
  | CommonActions
  | ErrorActions
  | AuthenticationActions
  | ModalActions
  | EditorActions
  | { type: typeof HYDRATE; payload: State }
  | RehydrateAction;
