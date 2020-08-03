import { ThunkResult } from "@/types";
import { ActionTypes, ModalType, SetModalPayload } from "./type";

export const setModal = (
  open: boolean,
  modal?: ModalType,
  slug?: string
): ThunkResult => (dispatch) => {
  const payload: SetModalPayload = { open };
  if (modal) payload.modal = modal;
  if (slug) payload.slug = slug;
  dispatch({
    type: ActionTypes.SET_MODAL,
    payload,
  });
};
