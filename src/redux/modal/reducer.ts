import { ActionTypes, ModalActions, ModalType } from "./type";

type State = {
  open: boolean;
  modal: ModalType;
  slug: string;
  refreshArticleList: ((...args: any) => any) | null;
};

const initialState: State = {
  open: false,
  modal: "",
  slug: "",
  refreshArticleList: null,
};

export default function reducer(
  state = initialState,
  action: ModalActions
): State {
  switch (action.type) {
    case ActionTypes.SET_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.SET_REFRESH_FUNC:
      return {
        ...state,
        refreshArticleList: action.payload,
      };
    default:
      return state;
  }
}
