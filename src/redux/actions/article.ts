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

export const addTab = (newTab: Tab): ThunkResult<string> => (
  dispatch,
  useState
) => {
  const key = newTab.type + "-" + newTab.value;
  if (!useState().article.tabList.some((tab) => tab.key === key)) {
    dispatch({
      type: articleActionTypes.ADD_TAB,
      payload: { ...newTab, key },
    });
  }
  return key;
};

export const removeTab = (tabOrderIndex: number): ThunkResult<Tab> => (
  dispatch,
  useState
) => {
  const { currTab, tabOrder, tabList } = useState().article;
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
  return (
    tabList.find(({ key }) => key === newTabKey) ?? {
      type: "default",
      value: "",
    }
  );
};

export const setTab = (tab: string): ThunkResult => (dispatch) => {
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
