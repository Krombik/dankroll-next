import { ThunkResult } from "../../types";
import { articleActionTypes } from "../../types/actions";

export const setArticlesCountPerPage = (count: number): ThunkResult<void> => (
  dispatch
) => {
  if (count <= 100 && count > 0)
    dispatch({
      type: articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT,
      payload: count,
    });
};

export const addTag = (tag: string): ThunkResult<void> => (
  dispatch,
  useState
) => {
  if (useState().article.tagList.indexOf(tag) === -1)
    dispatch({
      type: articleActionTypes.ADD_TAG,
      payload: tag,
    });
};

export const removeTag = (tag: string): ThunkResult<void> => (
  dispatch,
  useState
) => {
  const { tagList } = useState().article;
  const tagIndex = tagList.indexOf(tag);
  const tab = tagIndex === 0 ? "default" : tagList[tagIndex - 1];
  console.log(tab);
  dispatch({
    type: articleActionTypes.SET_TAB,
    payload: tab,
  });
  dispatch({
    type: articleActionTypes.REMOVE_TAG,
    payload: tag,
  });
};

export const setTab = (tab: string): ThunkResult<void> => (dispatch) => {
  dispatch({
    type: articleActionTypes.SET_TAB,
    payload: tab,
  });
};
