import { ThunkResult } from "../../types";
import { ActionTypes } from "./type";
import { TabType } from "../../types/tab";

export const setArticlesCountPerPage = (count: number): ThunkResult => (
  dispatch,
  useState
) => {
  const { articlePageNumbers } = useState().articleTabs;
  const newPageNumbers = {};
  for (const key in articlePageNumbers) newPageNumbers[key] = 0;
  dispatch({
    type: ActionTypes.SET_ARTICLES_PER_PAGE_COUNT,
    payload: {
      articlePageNumbers: newPageNumbers,
      articlesPerPageCount: count,
    },
  });
};

export const serverSetArticlesCountPerPage = (count: number): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: ActionTypes.SERVER_SET_ARTICLES_PER_PAGE_COUNT,
    payload: count,
  });
};

export const addTab = (newTab: TabType): ThunkResult => (
  dispatch,
  useState
) => {
  const key = newTab.type + "-" + newTab.value;
  if (!useState().articleTabs.tabList.some((tab) => tab.key === key)) {
    dispatch({
      type: ActionTypes.ADD_TAB,
      payload: { newTab, key, page: 0 },
    });
  }
};

export const serverAddTab = (
  newTab: TabType,
  page: number
): ThunkResult<string> => (dispatch) => {
  const key = newTab.type + "-" + newTab.value;
  dispatch({
    type: ActionTypes.ADD_TAB,
    payload: { newTab, key, page },
  });
  return key;
};

export const addTabsFromStorage = (clientOrder: string[]): ThunkResult => (
  dispatch,
  useState
) => {
  const { tabOrder } = useState().articleTabs;
  dispatch({
    type: ActionTypes.ADD_TABS,
    payload:
      tabOrder.length > 0 && clientOrder.some((item) => item === tabOrder[0])
        ? clientOrder
        : [...clientOrder, ...tabOrder],
  });
};

export const removeTab = (tab: string): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.REMOVE_TAB,
    payload: tab,
  });
};

export const setPageNumber = (key: string, page: number): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: ActionTypes.SET_PAGE_NUMBER,
    payload: { key, page },
  });
};

export const moveTab = (from: number, to: number): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: ActionTypes.MOVE_TAB,
    payload: { from, to },
  });
};
