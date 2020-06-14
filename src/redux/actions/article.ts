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

export const addTab = (newTab: Tab): ThunkResult<number> => (
  dispatch,
  useState
) => {
  const { tabList } = useState().article;
  const tabIndex = tabList.findIndex(
    (tab) => tab.type === newTab.type && tab.value === newTab.value
  );
  if (tabIndex === -1) {
    dispatch({
      type: articleActionTypes.ADD_TAB,
      payload: { ...newTab, key: newTab.type + "-" + newTab.value },
    });
    return tabList.length;
  }
  return tabIndex;
};

export const removeTab = (tabOrderIndex: number): ThunkResult => (
  dispatch,
  useState
) => {
  const { currTabIndex, tabOrder } = useState().article;
  const currTabOrderIndex = tabOrder.indexOf(currTabIndex);
  const newTabIndex =
    tabOrder[
      tabOrderIndex <= currTabOrderIndex
        ? currTabOrderIndex - 1
        : currTabOrderIndex
    ];
  dispatch({
    type: articleActionTypes.SET_TAB,
    payload:
      newTabIndex >= tabOrder[tabOrderIndex] ? newTabIndex - 1 : newTabIndex,
  });
  dispatch({
    type: articleActionTypes.REMOVE_TAB,
    payload: tabOrderIndex,
  });
};

export const setTab = (tab: number): ThunkResult => (dispatch, useState) => {
  if (useState().article.currTabIndex !== tab)
    dispatch({
      type: articleActionTypes.SET_TAB,
      payload: tab,
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
