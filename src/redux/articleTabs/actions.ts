import { ThunkResult } from "@/types";
import { ActionTypes, TabPagesType } from "./type";
import { TabQuery } from "@/types/tab";
import { tabKeyDecoder } from "@/utils/tabKeyDecoder";
import { moveFromTo } from "@/utils/moveFromTo";
import Router from "next/router";
import { TabValues } from "@/utils/constant";

export const setOffset = (offset: number): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_OFFSET,
    payload: {
      tabPages: {},
      offset,
    },
  });
};

export const serverSetOffset = (offset: number): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SERVER_SET_OFFSET,
    payload: offset,
  });
};

export const addTab = (key: string): ThunkResult<TabQuery> => (
  dispatch,
  getState
) => {
  const { tabList, tabPages } = getState().articleTabs;
  if (!tabList.some((item) => item === key))
    dispatch({
      type: ActionTypes.ADD_TAB,
      payload: key,
    });
  const query: TabQuery = tabKeyDecoder(key);
  const page = tabPages[key];
  if (page) query.page = page + 1;
  return query;
};

export const removeTab = (
  tab: string,
  currTab: string,
  replace: typeof Router.replace
): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  if (tab === currTab) {
    const { tabList, tabPages } = getState().articleTabs;
    let newOrder = tabList.indexOf(currTab) + 1;
    if (newOrder === tabList.length) newOrder -= 2;
    let query: TabQuery = {};
    if (newOrder >= 0) query = tabKeyDecoder(tabList[newOrder]);
    const page = tabPages[query.value || TabValues.DEFAULT];
    if (page) query.page = page + 1;
    const url = {
      pathname: "/",
      query,
    };
    await replace(url, url, { shallow: true });
  }
  dispatch({
    type: ActionTypes.REMOVE_TAB,
    payload: tab,
  });
};

export const setPageNumber = (payload: TabPagesType): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: ActionTypes.SET_PAGE_NUMBER,
    payload,
  });
};

export const moveTab = (from: number, to: number): ThunkResult => (
  dispatch,
  getState
) => {
  const { tabList } = getState().articleTabs;
  dispatch({
    type: ActionTypes.MOVE_TAB,
    payload: moveFromTo(tabList, from, to),
  });
};
