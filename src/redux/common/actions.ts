import { ThunkResult } from "../../types";
import { ActionTypes } from "./type";
import { getCurrentUser } from "../../api/user";

export const setDark = (isDark: boolean): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_DARK,
    payload: isDark,
  });
};

export const setAuthorized = (
  token: string,
  userName?: string
): ThunkResult<Promise<void>> => async (dispatch) => {
  dispatch({
    type: ActionTypes.SET_TOKEN,
    payload: token,
  });
  const currentUserName = userName
    ? userName
    : (await getCurrentUser(token))?.user?.username;
  if (currentUserName)
    dispatch({
      type: ActionTypes.SET_CURRENT_USER_NAME,
      payload: currentUserName,
    });
};

export const setUnauthorized = (): ThunkResult => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_TOKEN,
    payload: "",
  });
  dispatch({
    type: ActionTypes.SET_CURRENT_USER_NAME,
    payload: "",
  });
};
