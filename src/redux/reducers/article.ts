import { articleActionTypes, ArticleActions } from "../../types/actions";
import { Tab } from "../../types/article";
import { moveFromTo } from "../../utils/moveFromTo";
import { tabKeyDecoder } from "../../utils/tabKeyDecoder";

type State = {
  articlesPerPageCount: number;
  currTab: string;
  tabList: Tab[];
  tabOrder: string[];
  articlesPagesNumber: { [key: string]: number };
};

const initialState: State = {
  articlesPerPageCount: 10,
  tabList: [],
  tabOrder: [],
  currTab: "default-",
  articlesPagesNumber: { "default-": 0 },
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
        articlesPagesNumber: {
          ...Object.fromEntries(action.payload.map((key) => [key, 0])),
          ...state.articlesPagesNumber,
        },
      };
    case articleActionTypes.REMOVE_TAB:
      return {
        ...state,
        tabList: state.tabList.filter((item) => item.key !== action.payload),
        tabOrder: state.tabOrder.filter((item) => item !== action.payload),
        articlesPagesNumber: {
          ...state.articlesPagesNumber,
          [action.payload]: undefined,
        },
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
    case articleActionTypes.SET_PAGE_NUMBERS:
      return {
        ...state,
        articlesPagesNumber: {
          ...state.articlesPagesNumber,
          [action.payload.key]: action.payload.count,
        },
      };
    default:
      return state;
  }
}
