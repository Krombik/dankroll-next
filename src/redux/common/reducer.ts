import { ActionTypes, CommonActions } from "./type";

type State = {
  isDark: boolean;
};

const initialState: State = {
  isDark: true,
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
    default:
      return state;
  }
}
