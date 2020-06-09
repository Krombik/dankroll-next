import { articleActionTypes, ArticleActions } from "../../types/actions";
import { AnyAction } from "redux";
import { ArticleType } from "../../types/article";

type State = {
  articles: ArticleType[];
};

const initialState: State = {
  articles: [],
};

export default function reducer(state = initialState, action: ArticleActions) {
  switch (action.type) {
    case articleActionTypes.GET_ARTICLE_LIST:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
}
