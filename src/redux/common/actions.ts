import { ThunkResult, ErrorsType } from "../../types";
import { ActionTypes, SetErrorPayload } from "./type";
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

export const setError = (
  error: boolean,
  errorStatus = 0,
  errorInfo?: string | ErrorsType
): ThunkResult => (dispatch) => {
  let errorText = "";
  if (typeof errorInfo === "object") {
    const errorHandler = [];
    for (const key in errorInfo)
      errorHandler.push(`${key} ${errorInfo[key].join(", ")}`);
    errorText = errorHandler.join(", ");
  } else if (typeof errorInfo === "string") errorText = errorInfo;
  dispatch({
    type: ActionTypes.SET_ERROR,
    payload: error ? { error, errorStatus, errorText } : { error },
  });
};
