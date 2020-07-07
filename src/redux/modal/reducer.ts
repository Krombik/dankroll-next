import { ActionTypes, ModalActions, ModalType } from "./type";

type State = {
  open: boolean;
  modal: ModalType;
  slug: string;
};

const initialState: State = {
  open: false,
  modal: "",
  slug: "",
};

export default function reducer(
  state = initialState,
  action: ModalActions
): State {
  switch (action.type) {
    case ActionTypes.SET_MODAL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
