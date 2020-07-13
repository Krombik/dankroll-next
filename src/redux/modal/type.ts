export enum ActionTypes {
  SET_MODAL = "SET_MODAL",
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

export type ModalActions = SetModal;
