import { ActionTypes, ArticleModalActions } from "./type";

type State = {
  isOpen: boolean;
  slug: string;
};

const initialState: State = {
  isOpen: false,
  slug: "",
};

export default function reducer(
  state = initialState,
  action: ArticleModalActions
): State {
  switch (action.type) {
    case ActionTypes.SET_OPEN:
      return {
        ...state,
        isOpen: action.payload,
      };
    case ActionTypes.SET_SLUG:
      return {
        ...state,
        slug: action.payload,
      };
    default:
      return state;
  }
}
