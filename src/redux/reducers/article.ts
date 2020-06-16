import { articleActionTypes, ArticleActions } from "../../types/actions";
import { Tab } from "../../types/article";
import { moveFromTo } from "../../utils/moveFromTo";
import { HYDRATE } from "next-redux-wrapper";
import { tabKeyDecoder } from "../../utils/tabKeyDecoder";

type State = {
  articlesPerPageCount: number;
  tabList: Tab[];
  tabOrder: string[];
  currTab: string;
};

const initialState: State = {
  articlesPerPageCount: 10,
  tabList: [],
  tabOrder: [],
  currTab: "default-",
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
        tabOrder: [...state.tabOrder, action.payload.key],
        tabList: [...state.tabList, action.payload],
      };
    case articleActionTypes.ADD_TABS:
      return {
        ...state,
        tabOrder: action.payload,
        tabList: action.payload.map((key) => ({ ...tabKeyDecoder(key), key })),
      };
    case articleActionTypes.REMOVE_TAB:
      return {
        ...state,
        tabList: state.tabList.filter((item) => item.key !== action.payload),
        tabOrder: state.tabOrder.filter((item) => item !== action.payload),
      };
    case articleActionTypes.SET_TAB:
      return {
        ...state,
        currTab: action.payload,
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
