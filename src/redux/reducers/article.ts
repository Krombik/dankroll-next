import { articleActionTypes, ArticleActions } from "../../types/actions";

type State = {
  articlesPerPageCount: number;
  tagList: string[];
  tab: string;
};

const initialState: State = {
  articlesPerPageCount: 10,
  tagList: [],
  tab: "default",
};

export default function reducer(state = initialState, action: ArticleActions) {
  switch (action.type) {
    case articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT:
      return {
        ...state,
        articlesPerPageCount: action.payload,
      };
    case articleActionTypes.ADD_TAG:
      return {
        ...state,
        tagList: [...state.tagList, action.payload],
      };
    case articleActionTypes.REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter((tag) => tag !== action.payload),
      };
    case articleActionTypes.SET_TAB:
      return {
        ...state,
        tab: action.payload,
      };
    default:
      return state;
  }
}
