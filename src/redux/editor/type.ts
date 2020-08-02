import {
  ArticleEditorType,
  ArticleCurrentEditorType,
} from "../../types/article";

export enum EditorActionTypes {
  SET_EDITOR = "SET_EDITOR",
  CREATE_EDITOR = "CREATE_EDITOR",
  SET_CURRENT = "SET_CURRENT",
  REMOVE_EDITOR = "REMOVE_EDITOR",
}

type SetEditor = {
  type: EditorActionTypes.SET_EDITOR;
  payload: { key: string; editor: Partial<ArticleEditorType> };
};

type CreateEditor = {
  type: EditorActionTypes.CREATE_EDITOR;
  payload: { key: string; editor: ArticleCurrentEditorType };
};

type SetCurrent = {
  type: EditorActionTypes.SET_CURRENT;
  payload: ArticleCurrentEditorType;
};

type RemoveEditor = {
  type: EditorActionTypes.REMOVE_EDITOR;
  payload: string;
};

export type EditorActions =
  | SetEditor
  | CreateEditor
  | SetCurrent
  | RemoveEditor;
