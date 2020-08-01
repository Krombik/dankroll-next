export enum ActionTypes {
  SET_ERROR = "SET_ERROR",
}

export type SetErrorPayloadType = {
  show: boolean;
  text?: string;
  status?: number;
};

type SetError = {
  type: ActionTypes.SET_ERROR;
  payload: SetErrorPayloadType;
};

export type ErrorActions = SetError;
