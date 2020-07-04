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
    type: ActionTypes.SET_TOKEN,
    payload: token,
  });
  dispatch({
    type: ActionTypes.SET_CURRENT_USER_NAME,
    payload: (await getCurrentUser(token))?.user?.username,
  });
};

export const setAuthorized = (token: string, userName: string): ThunkResult => (
  dispatch
) => {
  dispatch({
    type: ActionTypes.SET_TOKEN,
    payload: token,
  });
  dispatch({
    type: ActionTypes.SET_CURRENT_USER_NAME,
    payload: userName,
  });
};
