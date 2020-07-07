import { ThunkResult } from "../../types";
import { ActionTypes } from "./type";
import { getCurrentUser } from "../../api/user";

export const setDark = (isDark: boolean): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_DARK,
    payload: isDark,
  });
};

export const serverSetAuthorized = (
  token: string
): ThunkResult<Promise<void>> => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_AUTHORIZED,
    payload: {
      token,
      currentUserName: (await getCurrentUser(token))?.user?.username || "",
    },
  });
};

export const setAuthorized = (
  token: string,
  currentUserName: string
): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_AUTHORIZED,
    payload: { token, currentUserName },
  });
};
