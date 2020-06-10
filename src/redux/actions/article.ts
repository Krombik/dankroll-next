import { ThunkResult } from "../../types";
import { articleActionTypes } from "../../types/actions";

export const setArticlesCountPerPage = (
  count: number
): ThunkResult<void> => async (dispatch) => {
  if (count <= 100 && count > 0)
    dispatch({
      type: articleActionTypes.SET_ARTICLES_PER_PAGE_COUNT,
      payload: count,
    });
};
