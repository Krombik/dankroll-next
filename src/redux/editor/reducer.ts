import { EditorActionTypes, EditorActions } from "./type";
import { ArticleEditorType, ArticleCurrentEditorType } from "@/types/article";

type State = {
  editors: { [key: string]: Partial<ArticleEditorType> };
  current: ArticleCurrentEditorType | null;
};

const initialState: State = {
  editors: {},
  current: null,
};

export default function reducer(
  state = initialState,
  action: EditorActions
): State {
  switch (action.type) {
    case EditorActionTypes.SET_EDITOR:
      return {
        ...state,
        editors: {
          ...state.editors,
          [action.payload.key]: {
            ...state.editors[action.payload.key],
            ...action.payload.editor,
          },
        },
      };
    case EditorActionTypes.CREATE_EDITOR:
      return {
        ...state,
        editors: {
          ...state.editors,
          [action.payload.key]: {},
        },
        current: action.payload.editor,
      };
    case EditorActionTypes.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case EditorActionTypes.REMOVE_EDITOR:
      return {
        ...state,
        editors: (({ [action.payload]: _, ...rest }) => rest)(state.editors),
        current: null,
      };
    case EditorActionTypes.RESET_EDITOR:
      return {
        ...state,
        editors: (({ [action.payload]: _, ...rest }) => rest)(state.editors),
      };
    default:
      return state;
  }
}
