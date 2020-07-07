import { ActionTypes, CommonActions } from "./type";

type State = {
  isDark: boolean;
  token: string;
  currentUserName: string;
};

const initialState: State = {
  isDark: true,
  token: "",
  currentUserName: "",
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
    default:
      return state;
  }
}
