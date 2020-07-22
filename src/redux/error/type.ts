export enum ActionTypes {
  SET_ERROR = "SET_ERROR",
}

type SetError = {
  type: ActionTypes.SET_ERROR;
  payload: {
    error: boolean;
    errorText?: string;
    errorStatus?: number;
  };
};

export type ErrorActions = SetError;
