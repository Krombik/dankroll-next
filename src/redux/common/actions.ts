import { ThunkResult } from "@/types";
import { ActionTypes } from "./type";

export const setDark = (isDark: boolean): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_DARK,
    payload: isDark,
  });
};
