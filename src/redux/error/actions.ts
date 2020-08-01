import { ThunkResult } from "../../types";
import { ActionTypes, SetErrorPayloadType } from "./type";
import { FetcherFailError } from "../../types/error";

export const setError = (
  show: boolean,
  data?: FetcherFailError
): ThunkResult => (dispatch) => {
  let payload: SetErrorPayloadType;
  if (show && data) {
    const { status, errors } = data;
    payload = {
      show,
      status,
      text: errors
        ? Object.keys(errors)
            .map((key) => `${key} ${errors[key].join(", ")}`)
            .join(", ")
        : status === 401
        ? "Unauthorized"
        : status === 404
        ? "Not Found"
        : status === 500
        ? "Internal Server Error"
        : "Something going wrong",
    };
  } else payload = { show };
  dispatch({
    type: ActionTypes.SET_ERROR,
    payload,
  });
};
