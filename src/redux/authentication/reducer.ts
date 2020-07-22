import { ActionTypes, AuthenticationActions } from "./type";

type State = {
  token: string;
  currentUserName: string;
};

const initialState: State = {
  token: "",
  currentUserName: "",
};

export default function reducer(
  state = initialState,
  action: AuthenticationActions
): State {
  switch (action.type) {
    case ActionTypes.SET_AUTHORIZED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
