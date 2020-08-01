import { ActionTypes, ErrorActions } from "./type";

type State = {
  show: boolean;
  text: string;
  status: number;
};

const initialState: State = {
  show: false,
  text: "",
  status: 0,
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
