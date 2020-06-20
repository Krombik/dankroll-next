import { ThunkResult } from "../../types";
import { ActionTypes } from "./type";

export const setArticleModalOpen = (
  isOpen: boolean,
  slug?: string
): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_OPEN,
    payload: isOpen,
  });
  if (slug)
    dispatch({
      type: ActionTypes.SET_SLUG,
      payload: slug,
    });
};
