import { ActionTypes, CommonActions } from "./type";

type State = {
  isDark: boolean;
  token: string;
  currentUserName: string;
  error: boolean;
  errorText: string;
  errorStatus: number;
};

const initialState: State = {
  isDark: true,
  token: "",
  currentUserName: "",
  error: false,
  errorText: "",
  errorStatus: 0,
};

export default function reducer(
  state = initialState,
  action: CommonActions
): State {
  switch (action.type) {
    case ActionTypes.SET_DARK:
      return {
        ...state,
        isDark: action.payload,
      };
    case ActionTypes.SET_AUTHORIZED:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
