export enum ActionTypes {
  SET_DARK = "SET_DARK",
  SET_AUTHORIZED = "SET_CURRENT_USER_NAME",
  SET_ERROR = "SET_ERROR",
}

type SetDark = {
  type: ActionTypes.SET_DARK;
  payload: boolean;
};

type SetAuthorized = {
  type: ActionTypes.SET_AUTHORIZED;
  payload: { token: string; currentUserName: string };
};

type SetError = {
  type: ActionTypes.SET_ERROR;
  payload: {
    error: boolean;
    errorText?: string;
    errorStatus?: number;
  };
};

export type CommonActions = SetDark | SetAuthorized | SetError;
