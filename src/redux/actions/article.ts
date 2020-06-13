import { ThunkResult } from "../../types";
import { articleActionTypes } from "../../types/actions";
import { Tab } from "../../types/article";
import { moveFromTo } from "../../utils/moveFromTo";

export const setArticlesCountPerPage = (count: number): ThunkResult => (
  dispatch
) => {
  if (count <= 100 && count > 0)
    dispatch({
      type: articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT,
      payload: count,
    });
};

export const addTab = (newTab: Tab): ThunkResult<string> => (
  dispatch,
  useState
) => {
  const { tabList } = useState().article;
  const trueNewTab = {
    ...newTab,
    key: newTab.type + "-" + newTab.value,
  };
  if (tabList.findIndex(({ key }) => key === trueNewTab.key) === -1) {
    dispatch({
      type: articleActionTypes.ADD_TAB,
      payload: trueNewTab,
    });
  }
  return trueNewTab.key;
};

export const removeTab = (tab: string): ThunkResult => (dispatch, useState) => {
  const { tabList, currTabIndex } = useState().article;
  if (tabList.findIndex(({ key }) => key === tab) <= currTabIndex)
    dispatch({
      type: articleActionTypes.SET_TAB,
      payload: currTabIndex - 1,
    });
  dispatch({
    type: articleActionTypes.REMOVE_TAB,
    payload: tab,
  });
};

export const setTab = (tab: string): ThunkResult => (dispatch, useState) => {
  if (useState().article.currTab !== tab)
    dispatch({
      type: articleActionTypes.SET_TAB,
      payload: tab,
    });
};

export const moveTab = (from: number, to: number): ThunkResult => (
  dispatch,
  useState
) => {
  const { currTab } = useState().article;
  dispatch({
    type: articleActionTypes.MOVE_TAB,
    payload: { from, to },
  });
  // if (
  //   (currTabIndex < from && currTabIndex < to) ||
  //   (currTabIndex > from && currTabIndex > to)
  // )
  //   return;
  dispatch({
    type: articleActionTypes.SET_TAB,
    payload: currTab,
  });
};
