export enum ActionTypes {
  SET_DARK = "SET_DARK",
  SET_AUTHORIZED = "SET_CURRENT_USER_NAME",
}

type SetDark = {
  type: ActionTypes.SET_DARK;
  payload: boolean;
};

type SetAuthorized = {
  type: ActionTypes.SET_AUTHORIZED;
  payload: { token: string; currentUserName: string };
};

export type CommonActions = SetDark | SetAuthorized;
