import { ThunkResult } from "../../types";
import { articleActionTypes } from "../../types/actions";
import { Tab } from "../../types/article";

export const setArticlesCountPerPage = (count: number): ThunkResult => (
  dispatch
) => {
  if (count <= 100 && count > 0)
    dispatch({
      type: articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT,
      payload: count,
    });
};

export const addTab = (newTab: Tab): ThunkResult => (dispatch, useState) => {
  const key = newTab.type + "-" + newTab.value;
  const { tabList, articlesPagesNumber } = useState().article;
  if (!tabList.some((tab) => tab.key === key)) {
    dispatch({
      type: articleActionTypes.ADD_TAB,
      payload: { ...newTab, key },
    });
    dispatch({
      type: articleActionTypes.SET_TAB,
      payload: key,
    });
    if (articlesPagesNumber[key])
      dispatch({
        type: articleActionTypes.SET_PAGE_NUMBERS,
        payload: { key, count: 0 },
      });
  }
};

export const serverAddTab = (newTab: Tab, page: number): ThunkResult => (
  dispatch
) => {
  const key = newTab.type + "-" + newTab.value;
  dispatch({
    type: articleActionTypes.ADD_TAB,
    payload: { ...newTab, key },
  });
  dispatch({
    type: articleActionTypes.SET_TAB,
    payload: key,
  });
  dispatch({
    type: articleActionTypes.SET_PAGE_NUMBERS,
    payload: { key, count: page },
  });
};

export const addTabsFromStorage = (clientOrder: string[]): ThunkResult => (
  dispatch,
  useState
) => {
  const { tabOrder } = useState().article;
  dispatch({
    type: articleActionTypes.ADD_TABS,
    payload:
      tabOrder.length > 0 && clientOrder.some((item) => item === tabOrder[0])
        ? clientOrder
        : [...clientOrder, ...tabOrder],
  });
};

export const removeTab = (tabOrderIndex: number): ThunkResult<string> => (
  dispatch,
  useState
) => {
  const { currTab, tabOrder } = useState().article;
  const currTabOrderIndex = tabOrder.indexOf(currTab);
  const newTabKey =
    currTabOrderIndex === tabOrderIndex
      ? currTabOrderIndex === tabOrder.length - 1
        ? currTabOrderIndex === 0
          ? "default-"
          : tabOrder[tabOrderIndex - 1]
        : tabOrder[tabOrderIndex + 1]
      : currTab;
  dispatch({
    type: articleActionTypes.SET_TAB,
    payload: newTabKey,
  });
  dispatch({
    type: articleActionTypes.REMOVE_TAB,
    payload: tabOrder[tabOrderIndex],
  });
  return newTabKey;
};

export const setPageNumbers = (key: string, count: number): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: articleActionTypes.SET_PAGE_NUMBERS,
    payload: { key, count },
  });
};

export const moveTab = (from: number, to: number): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: articleActionTypes.MOVE_TAB,
    payload: { from, to },
  });
};

export const setTab = (tab: string): ThunkResult => (dispatch) => {
  dispatch({
    type: articleActionTypes.SET_TAB,
    payload: tab,
  });
};
