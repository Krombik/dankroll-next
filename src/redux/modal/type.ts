export enum ActionTypes {
  SET_MODAL = "SET_MODAL",
  SET_REFRESH_FUNC = "SET_REFRESH_FUNC",
}

export type ModalType =
  | "new"
  | "edit"
  | "register"
  | "login"
  | "article"
  | "settings"
  | "";

export type SetModalPayload = {
  open: boolean;
  modal?: ModalType;
  slug?: string;
};

type SetModal = {
  type: ActionTypes.SET_MODAL;
  payload: SetModalPayload;
};

type SetRefreshFunc = {
  type: ActionTypes.SET_REFRESH_FUNC;
  payload: (...args: any) => any;
};

export type ModalActions = SetModal | SetRefreshFunc;
