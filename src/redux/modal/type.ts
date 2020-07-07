export enum ActionTypes {
  SET_MODAL = "SET_MODAL",
}

export type ModalType = "new" | "edit" | "register" | "login" | "article" | "";

type SetModal = {
  type: ActionTypes.SET_MODAL;
  payload: { open: boolean; modal?: ModalType; slug?: string };
};

export type ModalActions = SetModal;
