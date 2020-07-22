export enum ActionTypes {
  SET_AUTHORIZED = "SET_AUTHORIZED",
}

type SetAuthorized = {
  type: ActionTypes.SET_AUTHORIZED;
  payload: { token: string; currentUserName: string };
};

export type AuthenticationActions = SetAuthorized;
