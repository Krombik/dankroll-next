import { ThunkResult } from "@/types";
import { ActionTypes, ModalType, SetModalPayload } from "./type";

export const setArticleListRefreshFunc = (
  refresh: (...args: any) => any
): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_REFRESH_FUNC,
    payload: refresh,
  });
};

export const setModal = (
  open: boolean,
  modal?: ModalType,
  slug?: string
): ThunkResult => (dispatch, getState) => {
  const payload: SetModalPayload = { open };
  if (!open) {
    const { refreshArticleList, modal } = getState().modal;
    if (refreshArticleList && modal === "article") refreshArticleList();
  }
  if (modal) payload.modal = modal;
  if (slug) payload.slug = slug;
  dispatch({
    type: ActionTypes.SET_MODAL,
    payload,
  });
};
