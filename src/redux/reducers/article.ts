import { articleActionTypes, ArticleActions } from "../../types/actions";
import { Tab } from "../../types/article";
import { moveFromTo } from "../../utils/moveFromTo";

type State = {
  articlesPerPageCount: number;
  tabList: Tab[];
  currTab: string;
  currTabIndex: number;
};

const initialState: State = {
  articlesPerPageCount: 10,
  tabList: [{ value: "Last articles", type: "", removable: 0, key: "default" }],
  currTab: "default",
  currTabIndex: 0,
};

export default function reducer(state = initialState, action: ArticleActions) {
  switch (action.type) {
    case articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT:
      return {
        ...state,
        articlesPerPageCount: action.payload,
      };
    case articleActionTypes.ADD_TAB:
      return {
        ...state,
        tabList: [...state.tabList, action.payload],
      };
    case articleActionTypes.REMOVE_TAB:
      return {
        ...state,
        tabList: state.tabList.filter((tab) => tab.key !== action.payload),
      };
    case articleActionTypes.SET_TAB:
      return {
        ...state,
        currTab:
          typeof action.payload === "string"
            ? action.payload
            : state.tabList[action.payload].key,
        currTabIndex:
          typeof action.payload === "string"
            ? state.tabList.findIndex(({ key }) => key === action.payload)
            : action.payload,
      };
    case articleActionTypes.MOVE_TAB:
      return {
        ...state,
        tabList: moveFromTo(
          state.tabList,
          action.payload.from,
          action.payload.to
        ),
      };
    default:
      return state;
  }
}
