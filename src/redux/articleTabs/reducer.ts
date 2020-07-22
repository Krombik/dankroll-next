import { ActionTypes, ArticleActions, TabPagesType } from "./type";

type State = {
  offset: number;
  tabList: string[];
  tabPages: TabPagesType;
};

const initialState: State = {
  offset: 20,
  tabList: [],
  tabPages: {},
};

export default function reducer(
  state = initialState,
  action: ArticleActions
): State {
  switch (action.type) {
    case ActionTypes.SET_OFFSET:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.SERVER_SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };
    case ActionTypes.ADD_TAB:
      return {
        ...state,
        tabList: [...state.tabList, action.payload],
        tabPages: { ...state.tabPages, [action.payload]: 0 },
      };
    case ActionTypes.SERVER_ADD_TAB:
      return {
        ...state,
        tabList: [...state.tabList, action.payload.key],
        tabPages: {
          ...state.tabPages,
          [action.payload.key]: action.payload.page,
        },
      };
    case ActionTypes.REMOVE_TAB:
      return {
        ...state,
        tabList: state.tabList.filter((item) => item !== action.payload),
        tabPages: (({ [action.payload]: _, ...rest }) => rest)(state.tabPages),
      };
    case ActionTypes.MOVE_TAB:
      return {
        ...state,
        tabList: action.payload,
      };
    case ActionTypes.SET_PAGE_NUMBER:
      return {
        ...state,
        tabPages: { ...state.tabPages, ...action.payload },
      };
    case ActionTypes.SERVER_SET_PAGE_NUMBERS:
      return {
        ...state,
        tabPages: { ...state.tabPages, ...action.payload },
      };
    default:
      return state;
  }
}
