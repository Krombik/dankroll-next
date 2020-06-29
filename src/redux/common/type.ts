export enum ActionTypes {
  SET_DARK = "SET_DARK",
  SET_TOKEN = "SET_TOKEN",
  SET_CURRENT_USER_NAME = "SET_CURRENT_USER_NAME",
}

type SetDark = {
  type: ActionTypes.SET_DARK;
  payload: boolean;
};

type SetToken = {
  type: ActionTypes.SET_TOKEN;
  payload: string;
};

type SetCurrentUserName = {
  type: ActionTypes.SET_CURRENT_USER_NAME;
  payload: string;
};

export type CommonActions = SetDark | SetToken | SetCurrentUserName;
