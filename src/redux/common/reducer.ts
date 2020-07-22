import { ActionTypes, CommonActions } from "./type";

type State = {
  dark: boolean;
};

const initialState: State = {
  dark: true,
};

export default function reducer(
  state = initialState,
  action: CommonActions
): State {
  switch (action.type) {
    case ActionTypes.SET_DARK:
      return {
        ...state,
        dark: action.payload,
      };
    default:
      return state;
  }
}
