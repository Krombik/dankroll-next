import { ActionTypes, ErrorActions } from "./type";

type State = {
  error: boolean;
  errorText: string;
  errorStatus: number;
};

const initialState: State = {
  error: false,
  errorText: "",
  errorStatus: 0,
};

export default function reducer(
  state = initialState,
  action: ErrorActions
): State {
  switch (action.type) {
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
