import { articleActionTypes, ArticleActions } from "../../types/actions";

type State = {
  articlesPerPageCount: number;
};

const initialState: State = {
  articlesPerPageCount: 10,
};

export default function reducer(state = initialState, action: ArticleActions) {
  switch (action.type) {
    case articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT:
      return {
        ...state,
        articlesPerPageCount: action.payload,
      };
    default:
      return state;
  }
}
