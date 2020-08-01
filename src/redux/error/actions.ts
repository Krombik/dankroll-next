import { ThunkResult, ErrorsType } from "../../types";
import { ActionTypes } from "./type";

export const setError = (
  error: boolean,
  errorStatus = 0,
  errorInfo?: string | ErrorsType
): ThunkResult => (dispatch) => {
  let errorText = "";
  if (typeof errorInfo === "object") {
    const errorHandler: string[] = [];
    for (const key in errorInfo)
      errorHandler.push(`${key} ${errorInfo[key].join(", ")}`);
    errorText = errorHandler.join(", ");
  } else if (typeof errorInfo === "string") errorText = errorInfo;
  dispatch({
    type: ActionTypes.SET_ERROR,
    payload: error ? { error, errorStatus, errorText } : { error },
  });
};
