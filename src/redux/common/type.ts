export enum ActionTypes {
  SET_DARK = "SET_DARK",
}

type SetDark = {
  type: ActionTypes.SET_DARK;
  payload: boolean;
};

export type CommonActions = SetDark;
