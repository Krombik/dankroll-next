import { articleActionTypes, ArticleActions } from "../../types/actions";
import { Tab } from "../../types/article";
import { moveFromTo } from "../../utils/moveFromTo";

type State = {
  articlesPerPageCount: number;
  tabList: Tab[];
  tabOrder: number[];
  currTab: string;
  currTabIndex: number;
};

const initialState: State = {
  articlesPerPageCount: 10,
  tabList: [{ value: "", type: "default", key: "default" }],
  tabOrder: [0],
  currTab: "default",
  currTabIndex: 0,
};

export default function reducer(
  state = initialState,
  action: ArticleActions
): State {
  switch (action.type) {
    case articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT:
      return {
        ...state,
        articlesPerPageCount: action.payload,
      };
    case articleActionTypes.ADD_TAB:
      return {
        ...state,
        tabOrder: [...state.tabOrder, state.tabList.length],
        tabList: [...state.tabList, action.payload],
      };
    case articleActionTypes.REMOVE_TAB:
      return {
        ...state,
        tabList: state.tabList.filter(
          (_, index) => index !== state.tabOrder[action.payload]
        ),
        tabOrder: state.tabOrder
          .filter((_, index) => index !== action.payload)
          .map((item) =>
            item >= state.tabOrder[action.payload] ? item - 1 : item
          ),
      };
    case articleActionTypes.SET_TAB:
      return {
        ...state,
        currTabIndex: action.payload,
      };
    case articleActionTypes.MOVE_TAB:
      return {
        ...state,
        tabOrder: moveFromTo(
          state.tabOrder,
          action.payload.from,
          action.payload.to
        ),
      };
    default:
      return state;
  }
}
